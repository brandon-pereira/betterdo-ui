import { startOfToday, startOfTomorrow } from 'date-fns';

import Bookmarks from '@components/Icon/svgs/bookmarks.svg';
import Alarm from '@components/Icon/svgs/alarm.svg';
import Calendar from '@components/Icon/svgs/calendar.svg';
import Quill from '@components/Icon/svgs/quill.svg';
import Drawer from '@components/Icon/svgs/drawer.svg';
import SvgIcon from '@components/Icon';
import { DateIcon } from '@components/ListItem/ListItem.styles';

const ListItemIcon = ({
    icon
}: {
    icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}): React.ReactNode => <SvgIcon icon={icon} color="#fff" />;

export interface CustomList {
    id: string;
    title: string;
    icon: React.ReactNode;
    required: boolean;
    disableTaskCreation?: boolean;
}

const lists: CustomList[] = [
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
        icon: ListItemIcon({ icon: Bookmarks }),
        required: false
    },
    {
        id: 'today',
        title: 'Today',
        icon: <DateIcon>{getCurrentDay()}</DateIcon>,
        required: false
    },
    {
        id: 'tomorrow',
        title: 'Tomorrow',
        icon: <DateIcon>{getTomorrowDay()}</DateIcon>,
        required: false
    },
    {
        id: 'overdue',
        title: 'Overdue',
        icon: ListItemIcon({ icon: Alarm }),
        required: false,
        disableTaskCreation: true
    },
    {
        id: 'week',
        title: 'This Week',
        icon: ListItemIcon({ icon: Calendar }),
        required: false,
        disableTaskCreation: true
    }
];

export default lists;

export function getCurrentDay() {
    return startOfToday().getDate();
}

export function getTomorrowDay() {
    return startOfTomorrow().getDate();
}
