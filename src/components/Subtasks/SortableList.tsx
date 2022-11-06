import { CSSProperties, useCallback } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { restrictToParentElement } from '@dnd-kit/modifiers';
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

import { DeleteIcon, Task, Checkbox } from './Subtasks.styles';

import x from '@components/Icon/svgs/x.svg';
import { Subtask } from '@customTypes/task';

interface Props {
    id: string;
    onDelete: (id: string) => void;
    onToggleCompleted: (id: string) => void;
    value: Subtask;
}

const SortableItem = ({ id, onDelete, onToggleCompleted, value }: Props) => {
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
        zIndex: isDragging ? '1' : undefined
    } as CSSProperties;

    return (
        <Task
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            {...value}
            checked={value.isComplete}
        >
            <Checkbox
                type="checkbox"
                onClick={e => e.stopPropagation()}
                onChange={() => onToggleCompleted(id)}
                onKeyDown={e => {
                    // if space key
                    if (e.keyCode === 13) {
                        onToggleCompleted(id);
                    }
                }}
                checked={value.isComplete}
            />
            <span>{value.title}</span>
            <DeleteIcon
                icon={x}
                size="1rem"
                color="#d8d8d8"
                onClick={() => {
                    onDelete(id);
                }}
            />
        </Task>
    );
};

interface SortableListProps {
    items: Subtask[];
    onDelete: (id: string) => void;
    onToggleCompleted: (id: string) => void;
    onSortEnd: (moves: { oldIndex: number; newIndex: number }) => void;
}

const SortableList = ({
    items,
    onDelete,
    onToggleCompleted,
    onSortEnd
}: SortableListProps) => {
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

    const onDragEnd = useCallback(
        (event: DragEndEvent) => {
            const { active, over } = event;
            if (active && over && active.id !== over.id) {
                const oldIndex = items.findIndex(
                    task => task._id === active.id
                );
                const newIndex = items.findIndex(task => task._id === over.id);
                return onSortEnd({ oldIndex, newIndex });
            }
        },
        [items, onSortEnd]
    );

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
            modifiers={[restrictToParentElement]}
        >
            <SortableContext
                items={items.map((item, index) => item._id || `${index}`)}
                strategy={verticalListSortingStrategy}
            >
                {items.map((value, index) => (
                    <SortableItem
                        onDelete={onDelete}
                        onToggleCompleted={onToggleCompleted}
                        key={value._id || index}
                        id={value._id || `${index}`}
                        value={value}
                    />
                ))}
            </SortableContext>
        </DndContext>
    );
};

export default SortableList;
