import User from './user';

export interface Subtask {
    _id: string;
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
    priority: string;
    isLoading?: boolean;
    isTemporaryTask?: boolean;
}

export default Task;
