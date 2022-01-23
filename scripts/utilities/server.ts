import Task from '@customTypes/task';
import List, { ServerList } from '@customTypes/list';
import User, { _UpdateUserPayload } from '@customTypes/user';
import { SERVER_URL } from '@utilities/env';

const baseUrl = `${SERVER_URL}/api`;

export const createTask = (listId: string, title: string): Promise<Task> => {
    return _put(`tasks`, {
        title,
        listId
    });
};

export const createList = (list: {
    title: string;
    color: string;
}): Promise<List> => {
    return _put<List>(`lists`, list);
};

export const updateTask = (
    taskId: string,
    updatedProps: Partial<Task>
): Promise<Task> => {
    return _post<Task>(`tasks/${taskId}`, updatedProps);
};

export const updateList = (
    listId: string,
    updatedProps: ServerList
): Promise<List> => {
    return _post<List>(`lists/${listId}`, updatedProps);
};

export const deleteTask = (taskId: string): Promise<void> => {
    return _delete(`tasks/${taskId}`);
};

export const deleteList = (listId: string): Promise<void> => {
    return _delete(`lists/${listId}`);
};

export const updateUser = (updatedProps: _UpdateUserPayload): Promise<User> => {
    return _post<User>(`users`, updatedProps);
};

export const getUserByEmail = (email: string): Promise<User> => {
    return _get<User>(`users/${email}`);
};

export class ServerError extends Error {
    code: number;
    formattedMessage: string;
    originalError: unknown;

    constructor(
        formattedMessage = 'An unexpected error ocurred',
        originalError?: unknown,
        code = 500
    ) {
        super(formattedMessage);
        this.name = 'ServerError';
        this.code = code;
        this.originalError = originalError;
        this.formattedMessage = formattedMessage || ServerError.defaultError;
    }

    static defaultError = 'An unexpected error ocurred';
}

/**
 * Performs a GET request
 * @param {String} url the RELATIVE path
 * @param {Object} queryParameters key/value pair of queryParameters
 */
function _get<response>(
    url: string,
    queryParameters: { [key: string]: string } = {}
): Promise<response> {
    const parsedParams = new URLSearchParams(queryParameters);
    const stringifyParams = parsedParams.toString() ? `?${parsedParams}` : '';
    return _fetch<response>(`${baseUrl}/${url}${stringifyParams}`);
}

function _delete(url: string): Promise<void> {
    return _fetch(`${baseUrl}/${url}`, {
        method: 'DELETE'
    });
}

function _post<response, args = object>(
    url: string,
    data: args
): Promise<response> {
    return _fetch(`${baseUrl}/${url}`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
}

function _put<response, args = object>(
    url: string,
    data: args
): Promise<response> {
    return _fetch(`${baseUrl}/${url}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

async function _fetch<T>(url: string, data?: RequestInit): Promise<T> {
    let response: Response;
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
        // We don't really know what happened, show a generic "Something went wrong" message
        throw new ServerError(undefined, err);
    }
    if (!response.ok) {
        if (response.status === 401) {
            window.location.href = SERVER_URL;
        }
        const message = (await response.json()).error;
        throw new ServerError(message, undefined, response.status);
    }
    return await response.json();
}
