import { useState } from 'react';

import createSharedHook from './internal/createSharedHook';

function useTaskOnce() {
    const [currentTask, setCurrentTask] = useState(null);

    return [currentTask, setCurrentTask];
}

const { Provider, Context, useConsumer: useTask } = createSharedHook(
    useTaskOnce
);

export { Provider as TaskProvider, Context as TaskContext };
export default useTask;
