export default class Server {
    constructor() {
        this.baseUrl = '/api';
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

    async get(url) {
        const response = await fetch(`${this.baseUrl}/${url}`);
        return await response.json();
    }

    async post(url, data = {}) {
        const response = await fetch(`${this.baseUrl}/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    async put(url, data = {}) {
        const response = await fetch(`${this.baseUrl}/${url}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }
}
