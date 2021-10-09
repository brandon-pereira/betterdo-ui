import React, { useCallback } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
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

import Task from '@components/Task';

const SortableItem = function ({ id, value }) {
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
            containerProps={{
                style,
                ...attributes
            }}
            touchEvents={listeners}
            {...value}
        />
    );
};

function SortableList({ tasks, onSortEnd }) {
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
                const oldIndex = tasks.findIndex(
                    task => task._id === active.id
                );
                const newIndex = tasks.findIndex(task => task._id === over.id);
                return onSortEnd({ oldIndex, newIndex });
            }
        },
        [tasks, onSortEnd]
    );

    tasks = tasks || [];

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
            modifiers={[restrictToWindowEdges]}
        >
            <SortableContext
                items={tasks.map((task, index) =>
                    typeof task === 'object' ? task._id : index
                )}
                strategy={verticalListSortingStrategy}
            >
                {tasks.map((task, index) => (
                    <SortableItem
                        key={typeof task === 'object' ? task._id : index}
                        id={typeof task === 'object' ? task._id : index}
                        index={index}
                        value={task}
                    />
                ))}
            </SortableContext>
        </DndContext>
    );
}

export default SortableList;
