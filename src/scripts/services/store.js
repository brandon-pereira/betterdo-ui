import { observable } from 'mobx';
import Server from './server';

class Store {
    @observable
    lists = [];

    @observable
    currentList = {
        title: 'Lorem Ipsum'
    };

    @observable
    loading = true;

    constructor() {
        this.server = new Server();
        const lists = this.server.getLists().then(response => {
            this.lists = response;
            this.ready = true;
        });

        const currentList = this.server.getInbox().then(response => {
            this.currentList = response;
        });

        Promise.all([lists, currentList]).then(() => {
            this.lists[0].selected = true;
            this.loading = false;
        });
    }

    switchLists(list) {
        this.currentList = this.lists.find(_list => _list._id === list._id);
    }
}

export default Store;
