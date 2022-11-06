import { forwardRef } from 'react';

import { Container, Title, IconHolder } from './ListItem.styles';

import customLists from '@utilities/customLists';
import useNewListModal from '@hooks/useNewListModal';

const getCustomList = (id: string) => {
    return customLists.find(list => list.id === id);
};

const ListItem = forwardRef<HTMLButtonElement>((props, ref) => {
    const { openModal: openNewListModal } = useNewListModal();
    const customList = getCustomList('newList');
    const Icon = customList?.icon;
    const title = customList?.title;

    return (
        <Container ref={ref} data-betterdo-newlist onClick={openNewListModal}>
            <IconHolder>{Icon}</IconHolder>
            <Title>{title}</Title>
        </Container>
    );
});

ListItem.displayName = 'ListItem';

export default ListItem;
