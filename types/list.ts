import Task from './task';
import User from './user';

interface List {
    _id: string;
    title: string;
    tasks: Task[];
    completedTasks: Array<string>;
    members: User[];
    owner: User[];
    type:
        | 'inbox'
        | 'today'
        | 'tomorrow'
        | 'highPriority'
        | 'week'
        | 'overdue'
        | 'default';
    additionalTasks?: number;
    color: string;
}

export default List;
