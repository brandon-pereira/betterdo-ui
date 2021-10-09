import { SERVER_URL } from '@utilities/env';

export const getListsUrl = () => `${SERVER_URL}/api/lists`;
export const getListDetailUrls = listId => [
    getListDetailUrl(listId),
    getListDetailUrl(listId, true)
];

export const getListDetailUrl = (listId, includeCompleted) =>
    `${SERVER_URL}/api/lists/${listId}${
        includeCompleted ? `?includeCompleted=true` : ''
    }`;

export const getTaskDetailUrl = taskId => `${SERVER_URL}/api/tasks/${taskId}`;

export const getProfileUrl = () => `${SERVER_URL}/api/user`;
