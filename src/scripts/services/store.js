import { observable } from 'mobx';
import Server from './server';

class Store {
    @observable
    lists = [];

    @observable
    currentList = {
        title: '',
        tasks: []
    };

    @observable
    currentTask = null;

    @observable
    loading = true;

    @observable
    modalVisibility = {
        newList: false,
        editList: false
    };

    constructor() {
        this.server = new Server();
        const lists = this.server
            .getLists()
            .then(response => {
                this.lists = response;
            })
            .catch(err => {
                console.error('Failed to fetch lists', err);
            });

        const currentList = this.server
            .getInbox()
            .then(response => {
                this.currentList = response;
                // this.currentTask = response[0].tasks[0];
            })
            .catch(err => {
                console.error('Failed to fetch current list', err);
            });

        Promise.all([lists, currentList])
            .then(() => {
                this.loading = false;
            })
            .catch(err => {
                console.error('Failed to initialize', err);
            });
    }

    async switchLists(list) {
        // Load cached list till server loads
        const _cachedList = this.lists.find(_list => _list._id === list._id);
        if (_cachedList) {
            // don't load cached tasks, usually just the ids
            _cachedList.tasks = [];
            this.currentList = _cachedList;
        }
        this.loading = true;
        this.currentList = await this.server.getList(list._id);
        this.loading = false;
    }

    async updateTask(task) {
        this.loading = true;
        const updatedTask = await this.server.updateTask(task._id, task);
        this.currentList.tasks.map(
            _task => (task._id === _task._id ? updatedTask : _task)
        );
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
        this.lists = this.lists.map(
            _list => (listId === _list._id ? updatedList : _list)
        );
        this.loading = false;
    }

    async deleteList(listId) {
        this.loading = true;
        await this.server.deleteList(listId);
        const removedIndex = this.lists.findIndex(curr => curr._id === listId);
        this.lists.splice(removedIndex, 1);
        if (this.currentList._id === listId) {
            this.currentList = this.switchLists({ _id: 'inbox' });
        }
        this.loading = false;
    }
}

export default Store;
