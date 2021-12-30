interface User {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    lists: string[];
    isPushEnabled: boolean;
    pushSubscriptions: Array<string>;
    timeZone: string;
    customLists: {
        highPriority?: boolean;
        today?: boolean;
        tomorrow?: boolean;
        overdue?: boolean;
        week?: boolean;
    };
    pushSubscription?: string;
    profilePicture: string;
    isBeta: boolean;
    lastLogin: Date;
    creationDate: Date;
    google_id: string;
}

export default User;
