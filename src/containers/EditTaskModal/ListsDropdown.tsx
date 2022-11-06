import Dropdown from '@components/Dropdown';
import useLists from '@hooks/useLists';

interface Props {
    currentListId?: string;
    onSelect: (newList: string) => void;
}

function ListsDropdown({ currentListId, onSelect }: Props) {
    const { lists } = useLists();
    const formattedLists = lists
        .filter(list => list.type === 'default' || list.type === 'inbox')
        .map(list => ({
            value: list._id,
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
