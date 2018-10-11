import { observable } from 'mobx';
import Server from './server';

class Store {
    @observable
    lists = [];

    @observable
    currentList = {
        title: 'Lorem Ipsum'
    };

    constructor() {
        this.server = new Server();
        this.server.getLists().then(response => {
            this.lists = response;
            this.ready = true;
        });

        this.server.getInbox().then(response => {
            this.currentList = response;
        });
    }
}

export default Store;
