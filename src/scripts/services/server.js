export default class Server {
    constructor() {
        this.baseUrl = `${process.env.ROOT_APP_DIR}api`;
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

    async getList(id, params = {}) {
        try {
            return this.get(`lists/${id}`, params);
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

    deleteTask(taskId) {
        return this.delete(`tasks/${taskId}`);
    }

    deleteList(listId) {
        return this.delete(`lists/${listId}`);
    }

    throwError(message = 'An unexpected error ocurred', error = null) {
        const err = new Error(error || message);
        err.formattedMessage = message;
        throw err;
    }

    /**
     * Performs a GET request
     * @param {String} url the RELATIVE path
     * @param {Object} queryParameters key/value pair of queryParameters
     */
    get(url, queryParameters = {}) {
        let params = new URLSearchParams(queryParameters);
        params = params.toString() ? `?${params}` : '';
        return this.fetch(`${this.baseUrl}/${url}${params}`);
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
            if(response.status === 401) {
                window.location = process.env.ROOT_APP_DIR;
            }
            const message = (await response.json()).error;
            this.throwError(message);
        }
        return await response.json();
    }
}
