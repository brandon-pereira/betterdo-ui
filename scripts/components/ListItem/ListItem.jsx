import React from 'react';
import SvgIcon from '../Icon/Icon';

import { Container, DotIcon, Title, IconHolder } from './ListItem.styles.js';
import useSwitchList from '@hooks/useSwitchList';
import useCurrentListId from '@hooks/useCurrentListId';
import useNewListModal from '@hooks/useNewListModal';

import Quill from '@components/Icon/svgs/quill.svg';
import Drawer from '@components/Icon/svgs/drawer.svg';
import Alarm from '@components/Icon/svgs/alarm.svg';
import Calendar from '@components/Icon/svgs/calendar.svg';
import Bookmarks from '@components/Icon/svgs/bookmarks.svg';

const ListItemIcon = ({ icon }) => <SvgIcon icon={icon} color="#fff" />;

const ListItem = React.forwardRef(
    ({ containerProps, touchEvents, list }, ref) => {
        const switchList = useSwitchList();
        const currentListId = useCurrentListId();
        const { openModal: openNewListModal } = useNewListModal();
        let Icon;
        let { type, color, title, _id } = list;
        const selected = _id === currentListId;

        switch (type) {
            case 'newList':
                title = 'New List';
                Icon = <ListItemIcon icon={Quill} />;
                break;
            case 'inbox':
                title = 'Inbox';
                Icon = <ListItemIcon icon={Drawer} />;
                break;
            case 'today':
                title = 'Today';
                Icon = <ListItemIcon icon={Alarm} />;
                break;
            case 'tomorrow':
                title = 'Tomorrow';
                Icon = <ListItemIcon icon={Calendar} />;
                break;
            case 'highPriority':
                title = 'High Priority';
                Icon = <ListItemIcon icon={Bookmarks} />;
                break;
            default:
                Icon = <DotIcon color={color} />;
        }
        return (
            <Container
                {...containerProps}
                ref={ref}
                disabled={selected}
                selected={selected}
                // This is used for modal arrow ref tracking
                {...(type === 'newList'
                    ? { 'data-betterdo-newlist': true }
                    : undefined)}
                onClick={
                    type === 'newList'
                        ? openNewListModal
                        : () => switchList(list)
                }
            >
                <IconHolder {...touchEvents}>{Icon}</IconHolder>
                <Title>{title}</Title>
            </Container>
        );
    }
);

ListItem.displayName = 'ListItem';

export default ListItem;
