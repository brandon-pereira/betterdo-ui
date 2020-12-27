const baseUrl = `${process.env.SERVER_URL}/api`;

export const createTask = (taskName, listId) => {
    return _put(`tasks`, {
        title: taskName,
        listId
    });
};
// createList(list) {
//     return this.put(`lists`, list);
// }

export const updateTask = (taskId, props) => {
    return _post(`tasks/${taskId}`, props);
};

export const updateList = (listId, props) => {
    return _post(`lists/${listId}`, props);
};

// deleteTask(taskId) {
//     return this.delete(`tasks/${taskId}`);
// }

// deleteList(listId) {
//     return this.delete(`lists/${listId}`);
// }

// updateUser(props) {
//     return this.post(`users`, props);
// }

// getUserByEmail(email) {
//     return this.get(`users/${email}`);
// }

function _throwError(message = 'An unexpected error ocurred', error = null) {
    const err = new Error(error || message);
    err.formattedMessage = message;
    throw err;
}

/**
 * Performs a GET request
 * @param {String} url the RELATIVE path
 * @param {Object} queryParameters key/value pair of queryParameters
 */
function _get(url, queryParameters = {}) {
    let params = new URLSearchParams(queryParameters);
    params = params.toString() ? `?${params}` : '';
    return this.fetch(`${this.baseUrl}/${url}${params}`);
}

function _delete(url) {
    return this.fetch(`${this.baseUrl}/${url}`, {
        method: 'DELETE'
    });
}

function _post(url, data = {}) {
    return _fetch(`${baseUrl}/${url}`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
}

function _put(url, data = {}) {
    return _fetch(`${baseUrl}/${url}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

async function _fetch(url, data) {
    let response;
    try {
        response = await fetch(url, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            ...data
        });
    } catch (err) {
        await _throwError(undefined, err);
    }
    if (!response.ok) {
        if (response.status === 401) {
            window.location = process.env.ROOT_APP_DIR;
        }
        const message = (await response.json()).error;
        _throwError(message);
    }
    return await response.json();
}
