import Task from './task';
import User from './user';

interface List {
    _id: string;
    title: string;
    tasks: Task[];
    completedTasks: Array<string>;
    members: User[];
    owner: string;
    type:
        | 'inbox'
        | 'today'
        | 'tomorrow'
        | 'highPriority'
        | 'week'
        | 'overdue'
        | 'default'
        | 'newList';
    additionalTasks?: number;
    color: string;
}

export interface ServerList extends Omit<List, 'tasks'> {
    tasks: string[];
}

export default List;
