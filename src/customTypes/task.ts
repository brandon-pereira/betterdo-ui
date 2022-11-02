import User from './user';

export interface Subtask {
    // Id is temporary because it could be a temp task
    _id?: string;
    title: string;
    isComplete: boolean;
}

interface Task {
    _id: string;
    title: string;
    list: string;
    isCompleted: boolean;
    createdBy: User;
    notes: string;
    subtasks: Subtask[];
    dueDate: string;
    creationDate: string;
    priority: 'low' | 'normal' | 'high';
    isLoading?: boolean;
    isTemporaryTask?: boolean;
}

export default Task;
