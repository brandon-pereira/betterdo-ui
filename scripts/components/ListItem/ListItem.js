import React from 'react';
import SvgIcon from './../icon';

import { Container, DotIcon, Title, IconHolder } from './ListItem.styles';
import useSwitchList from '@hooks/useSwitchList';
import useCurrentListId from '@hooks/useCurrentListId';
import useNewListModal from '@hooks/useNewListModal';

const ListItemIcon = ({ icon }) => <SvgIcon icon={icon} color="#fff" />;

const ListItem = React.forwardRef(({ containerProps, list }, ref) => {
    const switchList = useSwitchList();
    const currentListId = useCurrentListId();
    const { openModal: openNewListModal } = useNewListModal();
    let Icon;
    let { type, color, title, id } = list;
    const selected = id === currentListId;

    switch (type) {
        case 'newList':
            title = 'New List';
            Icon = <ListItemIcon icon="quill" />;
            break;
        case 'inbox':
            title = 'Inbox';
            Icon = <ListItemIcon icon="drawer" />;
            break;
        case 'today':
            title = 'Today';
            Icon = <ListItemIcon icon="alarm" />;
            break;
        case 'tomorrow':
            title = 'Tomorrow';
            Icon = <ListItemIcon icon="calendar" />;
            break;
        case 'highPriority':
            title = 'High Priority';
            Icon = <ListItemIcon icon="bookmarks" />;
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
                type === 'newList' ? openNewListModal : () => switchList(list)
            }
        >
            <IconHolder>{Icon}</IconHolder>
            <Title>{title}</Title>
        </Container>
    );
});

ListItem.displayName = 'ListItem';

export default ListItem;
