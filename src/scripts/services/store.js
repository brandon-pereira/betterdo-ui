import { observable } from 'mobx';
import Server from './server';
import ServiceWorkerRegistrar from './sw-registrar';
import { COLORS } from '../constants';
import Router from './router';
class Store {
    @observable
    lists = [];

    @observable
    currentList = {
        title: '',
        color: COLORS.defaultList,
        tasks: [],
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
        listsView: false
    };

    @observable
    appUpdateAvailable = false;

    @observable
    addToHomeScreenAvailable = false;

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

        ServiceWorkerRegistrar.onAddToHomeScreenAvailable(bool => {
            if (bool) {
                console.log('Add to homescreen available');
            } else {
                console.log('Added to homescreen :)');
            }
            this.addToHomeScreenAvailable = bool;
        });

        // Fetch data from server
        try {
            const response = await this.server.init(Router.getCurrentRoute());
            this.lists = response.lists;
            this.currentList = response.currentList;
            this.currentTask = this.currentList.tasks[0];
            this.user = response.user;
        } catch (err) {
            console.error('Failed to initialize', err);
        }
        this.loading = false;
    }

    async switchLists(listId) {
        // Load cached list till server loads
        const _cachedList = this.lists.find(_list => _list._id === listId);
        if (_cachedList) {
            // don't load cached tasks, usually just the ids
            _cachedList.tasks = [];
            this.currentList = _cachedList;
        }
        this.loading = true;
        this.modalVisibility.listsView = false;
        this.currentList = await this.server.getList(listId);
        Router.setCurrentRoute(
            this.currentList.type === 'default'
                ? this.currentList._id
                : this.currentList.type
        );
        this.loading = false;
    }

    async updateTask(taskId, updatedProps) {
        this.loading = true;
        const updatedTask = await this.server.updateTask(taskId, updatedProps);
        if (updatedProps.list && updatedProps.list !== this.currentList._id) {
            this.switchLists(updatedProps.list);
        } else {
            this.currentList.tasks = this.currentList.tasks.map(_task =>
                taskId === _task._id ? updatedTask : _task
            );
        }
        this.loading = false;
    }

    async createTask(taskName) {
        this.loading = true;
        const task = await this.server.createTask(
            taskName,
            this.currentList._id
        );
        this.currentList.tasks.push(task);
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
        this.currentList = updatedList;
        this.lists = this.lists.map(_list =>
            listId === _list._id ? updatedList : _list
        );
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
        const removedIndex = this.currentList.tasks.findIndex(
            curr => curr._id === taskId
        );
        this.currentList.tasks.splice(removedIndex, 1);
        this.loading = false;
    }

    applyAppUpdate() {
        ServiceWorkerRegistrar.applyUpdates();
    }

    addToHomeScreen() {
        ServiceWorkerRegistrar.requestAddToHomeScreenPrompt();
    }
}

export default Store;
