import { SERVER_URL } from '@utilities/env';

export const getListsUrl = () => `${SERVER_URL}/api/lists`;
export const getListDetailUrls = (listId: string) => [
    getListDetailUrl(listId),
    getListDetailUrl(listId, true)
];

export const getListDetailUrl = (listId: string, includeCompleted?: boolean) =>
    `${SERVER_URL}/api/lists/${listId}${
        includeCompleted ? `?includeCompleted=true` : ''
    }`;

export const getTaskDetailUrl = (taskId: string) =>
    `${SERVER_URL}/api/tasks/${taskId}`;

export const getProfileUrl = () => `${SERVER_URL}/api/user`;
