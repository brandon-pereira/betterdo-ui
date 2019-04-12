import { observable } from 'mobx';
import Server from './server';
import ServiceWorkerRegistrar from './sw-registrar';
import { COLORS } from '../constants';
import Router from './router';
import { setThemeColor } from './helmet';

class Store {
    @observable
    lists = [];

    @observable
    currentList = {
        title: '',
        color: COLORS.defaultList,
        tasks: [],
        completedTasks: [],
        type: 'loading'
    };

    @observable
    currentTask = null;

    @observable
    loading = true;

    @observable
    user = null;

    @observable
    modalVisibility = {
        newList: false,
        editList: false,
        listsView: false,
        userSettings: false
    };

    @observable
    hasServerError = false;

    @observable
    appUpdateAvailable = false;

    @observable
    addToHomeScreenAvailable = false;

    @observable
    notificationStatus = 'DISABLED';

    config = {};

    constructor() {
        this.server = new Server();
        this.init();
    }

    async init() {
        // Listen for update events
        ServiceWorkerRegistrar.onUpdateAvailable(() => {
            console.log('Update Available');
            this.appUpdateAvailable = true;
        });

        ServiceWorkerRegistrar.subscribeToNotificationUpdates(status => {
            this.notificationStatus = status;
        });

        ServiceWorkerRegistrar.onAddToHomeScreenAvailable(bool => {
            if (bool) {
                console.log('Add to homescreen available');
            } else {
                console.log('Added to homescreen :)');
            }
            this.addToHomeScreenAvailable = bool;
        });

        await this.reload();
        this._onListChange();
    }

    async reload() {
        this.loading = true;
        try {
            const response = await this.server.init(Router.getCurrentRoute());
            this.lists = response.lists;
            this.currentList = response.currentList;
            this._updateListInCache(this.currentList._id, this.currentList);
            this.user = response.user;
            this.config = response.config;
        } catch (err) {
            this.hasServerError = true;
            console.error('Init call failed from server', err);
        }
        this.loading = false;
    }

    async switchLists(listId) {
        // Load cached list till server loads
        const _cachedList = this.lists.find(_list => _list._id === listId);
        if (_cachedList) {
            this.currentList = _cachedList;
        }
        this.loading = true;
        this.modalVisibility.listsView = false;
        this.currentList = await this.server.getList(listId);
        this._updateListInCache(this.currentList._id, this.currentList);
        this.loading = false;
        this._onListChange();
    }

    async requestNotificationAccess() {
        const subscription = await ServiceWorkerRegistrar.requestNotificationAccess(
            this.config.vapidKey
        );
        await this.updateUser({
            pushSubscription: subscription
        });
    }

    async loadCompletedTasks(listId) {
        const list = await this.server.getList(listId, {
            includeCompleted: true
        });
        this.currentList.completedTasks = list.completedTasks;
        this.currentList.additionalTasks = list.additionalTasks;
    }

    async updateTask(taskId, updatedProps) {
        this.loading = true;
        const modifiedComplete = typeof updatedProps.isCompleted === 'boolean';
        this._updateTask(taskId, updatedProps, { merge: true });
        const updatedTask = await this.server.updateTask(taskId, updatedProps);
        if (updatedProps.list && updatedProps.list !== this.currentList._id) {
            // Switch to new list
            this.switchLists(updatedProps.list);
        } else if (modifiedComplete && updatedProps.isCompleted === true) {
            // Remove from arrays
            this._removeTask(taskId);
            // Add new task
            this.currentList.completedTasks.unshift(updatedTask);
            // Update the UI to reference the strings, forcing them hidden
            this.currentList.completedTasks = this.currentList.completedTasks.map(
                task => task._id || task
            );
            // Count new additional tasks
            this.currentList.additionalTasks = this.currentList.completedTasks.length;
        } else if (modifiedComplete && updatedProps.isCompleted === false) {
            // Remove from arrays
            this._removeTask(taskId);
            // Add new task
            this.currentList.tasks.unshift(updatedTask);
        } else {
            // Simply update task in list
            this._updateTask(taskId, updatedTask);
        }
        this.loading = false;
    }

    async createTask(taskName) {
        this.loading = true;
        const tempId = Math.floor(Math.random() * 1000);
        // FIXME: Unshift wasn't working with tempId stuff, so doing this instead
        this.currentList.tasks = [
            {
                _id: tempId,
                title: taskName,
                priority: 'normal',
                isLoading: true
            },
            ...this.currentList.tasks
        ];
        const task = await this.server.createTask(
            taskName,
            this.currentList._id
        );
        this._updateTask(tempId, task);
        this.loading = false;
    }

    async createList(title, color) {
        this.loading = true;
        const list = await this.server.createList({ title, color });
        this.lists.push(list);
        this.currentList = list;
        this.loading = false;
    }

    async updateList(listId, updatedProps) {
        this.loading = true;
        const updatedList = await this.server.updateList(listId, updatedProps);
        // Use current completed lists, this will either be empty or full depending on state
        updatedList.completedTasks = this.currentList.completedTasks;
        Object.assign(this.currentList, updatedList);
        this.lists = this.lists.map(_list =>
            listId === _list._id ? updatedList : _list
        );
        this.loading = false;
        this._onListChange();
        return updatedList;
    }

    async updateUser(updatedProps) {
        this.loading = true;
        await this.server.updateUser(updatedProps);
        await this.reload();
        this.loading = false;
    }

    async deleteList(listId) {
        this.loading = true;
        await this.server.deleteList(listId);
        const removedIndex = this.lists.findIndex(curr => curr._id === listId);
        this.lists.splice(removedIndex, 1);
        if (this.currentList._id === listId) {
            await this.switchLists('inbox');
        }
        this.loading = false;
    }

    async deleteTask(taskId) {
        this.loading = true;
        await this.server.deleteTask(taskId);
        const findById = curr => curr._id === taskId;
        let removedIndex = this.currentList.tasks.findIndex(findById);
        if (removedIndex !== -1) {
            this.currentList.tasks.splice(removedIndex, 1);
        } else {
            removedIndex = this.currentList.completedTasks.findIndex(findById);
            this.currentList.completedTasks.splice(removedIndex, 1);
        }
        this.currentTask = null;
        this.loading = false;
    }

    getUser(email) {
        return this.server.getUserByEmail(email);
    }

    _onListChange() {
        setThemeColor(this.currentList.color);
        Router.setCurrentRoute(
            this.currentList.type === 'default'
                ? this.currentList._id
                : this.currentList.type
        );
    }

    _updateListInCache(listId, newList) {
        const index = this.lists.findIndex(list => list._id === listId);
        if (index !== -1) {
            this.lists.splice(index, 1, newList);
        }
    }

    _updateTask(taskId, newTask, { merge } = {}) {
        const mapFn = _task => {
            const isCorrectTask = taskId === _task._id;
            if (isCorrectTask && merge) {
                return Object.assign(_task, newTask);
            } else if (isCorrectTask) {
                return newTask;
            } else {
                return _task;
            }
        };
        // Update completed tasks
        this.currentList.completedTasks = this.currentList.completedTasks.map(
            mapFn
        );
        // Update
        this.currentList.tasks = this.currentList.tasks.map(mapFn);
    }

    _removeTask(taskId) {
        this.currentList.completedTasks = this.currentList.completedTasks.filter(
            _task => taskId !== _task._id
        );

        this.currentList.tasks = this.currentList.tasks.filter(
            _task => taskId !== _task._id
        );
    }

    applyAppUpdate() {
        ServiceWorkerRegistrar.applyUpdates();
    }

    addToHomeScreen() {
        ServiceWorkerRegistrar.requestAddToHomeScreenPrompt();
    }
}

export default Store;
