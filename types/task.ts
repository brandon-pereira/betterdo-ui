interface Subtask {
    title: string;
    isComplete: boolean;
}

interface Task {
    _id: string;
    title: string;
    listId: string;
    isCompleted: boolean;
    createdBy: string;
    notes: string;
    subtasks: Subtask[];
    dueDate: Date;
    creationDate: Date;
    priority: 'low' | 'normal' | 'high';
    isLoading?: boolean;
    isTemporaryTask?: boolean;
}

export default Task;
