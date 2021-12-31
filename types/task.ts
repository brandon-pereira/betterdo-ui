interface Subtask {
    title: string;
    isComplete: boolean;
}

interface Task {
    _id: string;
    title: string;
    list: string;
    isCompleted: boolean;
    createdBy: string;
    notes: string;
    subtasks: Subtask[];
    dueDate: string;
    creationDate: string;
    priority: 'low' | 'normal' | 'high';
    isLoading?: boolean;
    isTemporaryTask?: boolean;
}

export default Task;
