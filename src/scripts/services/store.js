import { observable } from 'mobx';

class Store {
    @observable
    lists = [
        { title: 'testq1', color: 'red' },
        { title: 'test2', color: 'red', selected: true }
    ];

    @observable
    currentList = {
        title: 'Lorem Ipsum'
    };
}

export default Store;
