import { forwardRef } from 'react';

import {
    Container,
    DotIcon,
    Title,
    IconHolder,
    SelectedItemBackground
} from './ListItem.styles';

import List from '@customTypes/list';
import customLists from '@utilities/customLists';
import useSwitchList from '@hooks/useSwitchList';
import useCurrentListId from '@hooks/useCurrentListId';

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
        const { type, color, _id } = list;
        const selected = _id === currentListId;
        const customList = getCustomList(type);
        const Icon = customList?.icon || <DotIcon color={color} />;
        const title = customList?.title || list.title;

        return (
            <Container
                selected={selected}
                {...containerProps}
                ref={ref}
                onClick={() => switchList(list)}
            >
                {selected && (
                    <SelectedItemBackground layoutId="primary-nav-selected-div" />
                )}
                <IconHolder {...touchEvents}>{Icon}</IconHolder>
                <Title>{title}</Title>
            </Container>
        );
    }
);

ListItem.displayName = 'ListItem';

export default ListItem;
