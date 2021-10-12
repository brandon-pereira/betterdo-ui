import React, { useCallback } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import {
    DndContext,
    PointerSensor,
    KeyboardSensor,
    closestCenter,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {
    useSortable,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';

import { DeleteIcon, Task, Checkbox } from './Subtasks.styles.js';

import x from '@components/Icon/svgs/x.svg';

const SortableItem = ({ id, onDelete, onToggleCompleted, value }) => {
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
    };

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
                        this.toggleCompleted(id);
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

const SortableList = ({ items, onDelete, onToggleCompleted, onSortEnd }) => {
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
        event => {
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
                items={items.map((item, index) => item._id || index)}
                strategy={verticalListSortingStrategy}
            >
                {items.map((value, index) => (
                    <SortableItem
                        onDelete={onDelete}
                        onToggleCompleted={onToggleCompleted}
                        key={value._id || index}
                        id={value._id || index}
                        value={value}
                    />
                ))}
            </SortableContext>
        </DndContext>
    );
};

export default SortableList;
