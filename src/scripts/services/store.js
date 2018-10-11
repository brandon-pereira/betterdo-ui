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
    loading = true;

    constructor() {
        this.server = new Server();
        const lists = this.server
            .getLists()
            .then(response => {
                this.lists = response;
                this.ready = true;
            })
            .catch(err => {
                console.error('Failed to fetch lists', err);
            });

        const currentList = this.server
            .getInbox()
            .then(response => {
                this.currentList = response;
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
        this.currentList = this.lists.find(_list => _list._id === list._id);
        this.loading = true;
        this.currentList = await this.server.getList(list._id);
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
}

export default Store;
