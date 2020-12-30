import React from 'react';
import SvgIcon from './../icon';

import { Container, DotIcon, Title, IconHolder } from './ListItem.styles';

const ListItemIcon = ({ icon }) => <SvgIcon icon={icon} color="#fff" />;

function ListItem({ selected, onClick, title, color, type }) {
    let Icon;
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
            selected={selected}
            // This is used for modal arrow ref tracking
            {...(type === 'newList'
                ? { 'data-betterdo-newlist': true }
                : undefined)}
            onClick={onClick}
        >
            <IconHolder>{Icon}</IconHolder>
            <Title>{title}</Title>
        </Container>
    );
}

export default ListItem;
