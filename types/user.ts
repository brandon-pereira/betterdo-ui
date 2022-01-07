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
    // lists: string[];
    // google_id: string;
    // pushSubscriptions?: Array<string>;
}

export default User;
