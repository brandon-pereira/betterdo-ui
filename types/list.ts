import Task from './task';
import User from './user';

interface List {
    _id: string;
    title: string;
    tasks: Task[];
    completedTasks?: Task[];
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

export interface ServerList extends Omit<Omit<List, 'tasks'>, 'members'> {
    tasks: string[];
    members: string[];
}

export default List;
