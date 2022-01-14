import React, { forwardRef } from 'react';

import { Container, DotIcon, Title, IconHolder } from './ListItem.styles';

import List from '@types/list';
import customLists from '@utilities/customLists';
import useSwitchList from '@hooks/useSwitchList';
import useCurrentListId from '@hooks/useCurrentListId';
import useNewListModal from '@hooks/useNewListModal';

const getCustomList = (id: string) => {
    return customLists.find(list => list.id === id);
};

interface Props {
    containerProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
    touchEvents: import('@dnd-kit/core').DraggableSyntheticListeners;
    list: List;
}

const ListItem = forwardRef<HTMLButtonElement, Props>(
    ({ containerProps, touchEvents, list }, ref) => {
        const switchList = useSwitchList();
        const currentListId = useCurrentListId();
        const { openModal: openNewListModal } = useNewListModal();
        const { type, color, _id } = list;
        const selected = _id === currentListId;
        const customList = getCustomList(type);
        const Icon = customList?.icon || <DotIcon color={color} />;
        const title = customList?.title || list.title;

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
