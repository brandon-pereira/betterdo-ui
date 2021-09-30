import.meta.hot;

export const getListsUrl = () => `${__SNOWPACK_ENV__.SERVER_URL}/api/lists`;
export const getListDetailUrls = listId => [
    getListDetailUrl(listId),
    getListDetailUrl(listId, true)
];

export const getListDetailUrl = (listId, includeCompleted) =>
    `${__SNOWPACK_ENV__.SERVER_URL}/api/lists/${listId}${
        includeCompleted ? `?includeCompleted=true` : ''
    }`;

export const getTaskDetailUrl = taskId =>
    `${__SNOWPACK_ENV__.SERVER_URL}/api/tasks/${taskId}`;

export const getProfileUrl = () => `${__SNOWPACK_ENV__.SERVER_URL}/api/user`;
