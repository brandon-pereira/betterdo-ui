export const getListsUrl = () => `${process.env.SERVER_URL}/api/lists`;
export const getListDetailUrls = listId => [
    getListDetailUrl(listId),
    getListDetailUrl(listId, true)
];
export const getListDetailUrl = (listId, includeCompleted) =>
    `${process.env.SERVER_URL}/api/lists/${listId}${
        includeCompleted ? `?includeCompleted=true` : ''
    }`;
