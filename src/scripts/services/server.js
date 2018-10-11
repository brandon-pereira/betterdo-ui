export default class Server {
    constructor() {
        this.baseUrl = '/api';
    }

    async getLists() {
        const lists = await this.get('lists');
        return lists.lists;
    }

    async getInbox() {
        const inbox = await this.get('lists/inbox');
        console.log(inbox);
        return inbox;
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
            referrer: 'no-referrer',
            body: JSON.stringify(data)
        });
        return await response.json();
    }
}
