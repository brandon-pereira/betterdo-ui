import React from 'react';
import Dropdown from '@components/dropdown';
import useLists from '@hooks/useLists';

function ListsDropdown({ currentListId, onSelect }) {
    const { lists } = useLists();
    const formattedLists = lists
        .filter(list => list.type === 'default' || list.type === 'inbox')
        .map(list => ({
            value: list.id,
            label: list.title
        }));

    return (
        <Dropdown
            values={formattedLists}
            onSelect={onSelect}
            value={currentListId}
        />
    );
}

export default ListsDropdown;
