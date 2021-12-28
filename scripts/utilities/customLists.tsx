import React from 'react';
import { startOfToday, startOfTomorrow } from 'date-fns';

import Bookmarks from '@components/Icon/svgs/bookmarks.svg';
import Alarm from '@components/Icon/svgs/alarm.svg';
import Calendar from '@components/Icon/svgs/calendar.svg';
import Quill from '@components/Icon/svgs/quill.svg';
import Drawer from '@components/Icon/svgs/drawer.svg';
import SvgIcon from '@components/Icon';
import { DateIcon } from '@components/ListItem/ListItem.styles.js';

const ListItemIcon = ({
    icon
}: {
    icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}): React.ReactNode => <SvgIcon icon={icon} color="#fff" />;

export default [
    {
        id: 'inbox',
        title: 'Inbox',
        icon: ListItemIcon({ icon: Drawer }),
        required: true
    },
    {
        id: 'newList',
        title: 'New List',
        icon: ListItemIcon({ icon: Quill }),
        required: true
    },
    {
        id: 'highPriority',
        title: 'High Priority',
        icon: ListItemIcon({ icon: Bookmarks })
    },
    {
        id: 'today',
        title: 'Today',
        icon: <DateIcon>{getCurrentDay()}</DateIcon>
    },
    {
        id: 'tomorrow',
        title: 'Tomorrow',
        icon: <DateIcon>{getTomorrowDay()}</DateIcon>
    },
    {
        id: 'overdue',
        title: 'Overdue',
        icon: ListItemIcon({ icon: Alarm }),
        disableTaskCreation: true
    },
    {
        id: 'week',
        title: 'This Week',
        icon: ListItemIcon({ icon: Calendar }),
        disableTaskCreation: true
    }
];

export function getCurrentDay() {
    return startOfToday().getDate();
}

export function getTomorrowDay() {
    return startOfTomorrow().getDate();
}
