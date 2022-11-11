import { CSSProperties, useCallback } from 'react';
import { CSS } from '@dnd-kit/utilities';
import {
    DndContext,
    PointerSensor,
    KeyboardSensor,
    closestCenter,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    useSortable,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';
import {
    restrictToVerticalAxis,
    restrictToParentElement
} from '@dnd-kit/modifiers';

import List from '@customTypes/list';
import ListItem from '@components/ListItem';

interface SortableItemProps {
    id: string;
    value: List;
}
const SortableItem = function ({ id, value }: SortableItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        pointerEvents: isDragging ? 'none' : 'all',
        zIndex: isDragging ? '6' : undefined
    } as CSSProperties;

    return (
        <ListItem
            ref={setNodeRef}
            containerProps={{
                style,
                ...attributes
            }}
            touchEvents={listeners}
            list={value}
        />
    );
};

export interface SortableListProps {
    lists: List[];
    onSortEnd: (params: { oldIndex: number; newIndex: number }) => void;
}
function SortableList({ lists, onSortEnd }: SortableListProps) {
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 100,
                tolerance: 50
            }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    lists = lists || [];

    const onDragEnd = useCallback(
        (event: DragEndEvent) => {
            const { active, over } = event;
            if (active && over && active.id !== over.id) {
                const oldIndex = lists.findIndex(
                    list => list._id === active.id
                );
                const newIndex = lists.findIndex(list => list._id === over.id);
                return onSortEnd({ oldIndex, newIndex });
            }
        },
        [lists, onSortEnd]
    );

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
            modifiers={[restrictToParentElement, restrictToVerticalAxis]}
        >
            <SortableContext
                items={lists.map(list => list._id)}
                strategy={verticalListSortingStrategy}
            >
                {lists.map((list, index) => (
                    <SortableItem
                        key={typeof list === 'object' ? list._id : index}
                        id={typeof list === 'object' ? list._id : `${index}`}
                        value={list}
                    />
                ))}
            </SortableContext>
        </DndContext>
    );
}

export default SortableList;
