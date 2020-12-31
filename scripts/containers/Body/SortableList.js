import React from 'react';
import Task from '@components/Task';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const SortableItem = SortableElement(({ value }) => <Task {...value} />);

const _SortableList = SortableContainer(({ items }) => {
    return (
        <div>
            {items.map((task, index) => (
                <SortableItem
                    key={typeof task === 'object' ? task._id : index}
                    index={index}
                    value={task}
                />
            ))}
        </div>
    );
});

function SortableList({ tasks, onSortEnd }) {
    if (!tasks || !tasks.length) {
        return null;
    }
    return (
        <_SortableList pressDelay={200} items={tasks} onSortEnd={onSortEnd} />
    );
}

export default SortableList;
