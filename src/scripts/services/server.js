export default class Server {
    constructor() {
        this.baseUrl = '/api';
    }

    async init(listId) {
        const response = await this.get('init' + (listId ? `/${listId}` : ''));
        return response;
    }

    async getLists() {
        const lists = await this.get('lists');
        return lists.lists || [];
    }

    async getInbox() {
        const inbox = await this.getList('inbox');
        return inbox;
    }

    async getList(id) {
        try {
            return this.get(`lists/${id}`);
        } catch (err) {
            console.error('Failed to fetch list', id, err);
            return {
                title: '',
                tasks: [],
                _id: null,
                color: 'red',
                isError: true
            };
        }
    }

    createTask(taskName, listId) {
        return this.put(`tasks`, {
            title: taskName,
            listId
        });
    }
    createList(list) {
        return this.put(`lists`, list);
    }

    updateTask(taskId, props) {
        return this.post(`tasks/${taskId}`, props);
    }

    updateList(listId, props) {
        return this.post(`lists/${listId}`, props);
    }

    deleteList(listId) {
        return this.delete(`lists/${listId}`);
    }

    throwError(message = 'An unexpected error ocurred', error = null) {
        const err = new Error(error || message);
        err.formattedMessage = message;
        throw err;
    }

    get(url) {
        return this.fetch(`${this.baseUrl}/${url}`);
    }

    delete(url) {
        return this.fetch(`${this.baseUrl}/${url}`, {
            method: 'DELETE'
        });
    }

    post(url, data = {}) {
        return this.fetch(`${this.baseUrl}/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        });
    }

    put(url, data = {}) {
        return this.fetch(`${this.baseUrl}/${url}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    async fetch(url, data) {
        let response;
        try {
            response = await fetch(url, data);
        } catch (err) {
            await this.throwError(undefined, err);
        }
        if (!response.ok) {
            const message = (await response.json()).error;
            this.throwError(message);
        }
        return await response.json();
    }
}
