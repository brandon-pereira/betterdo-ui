import { useState } from 'react';

import createSharedHook from './internal/createSharedHook';

function useCompletedTasksOnce() {
    return useState(false);
}

const {
    Provider: CompletedTasksProvider,
    Context: CompletedTasksContext,
    useConsumer: useCompletedTasks
} = createSharedHook(useCompletedTasksOnce);

export { CompletedTasksContext, CompletedTasksProvider };
export default useCompletedTasks;
