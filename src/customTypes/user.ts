import List from './list';

interface User {
    _id: string;
    firstName: string;
    lastName?: string;
    email: string;
    profilePicture: string;
    customLists: {
        highPriority?: boolean;
        today?: boolean;
        tomorrow?: boolean;
        overdue?: boolean;
        week?: boolean;
    };
    isBeta: boolean;
    isPushEnabled: boolean;
    lastLogin: Date;
    creationDate: Date;
    timeZone: string;
    config: {
        vapidKey: string;
    };
}

// This is what should be sent to modifyProfile function
export interface UpdateUserObject extends Partial<User> {
    lists?: List[];
    pushSubscription?: string;
}

// modifyProfile function should format UpdateUserObject to match this schema
export interface _UpdateUserPayload extends Partial<User> {
    lists?: string[];
    pushSubscription?: string;
}

export default User;
