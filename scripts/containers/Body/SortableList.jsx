import React, { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const variants = {
    visible: i => ({
        opacity: 1,
        x: 0,
        transition: {
            ease: 'easeOut',
            delay: i * 0.05
        }
    }),
    hidden: {
        x: -100,
        opacity: 0
    },
    exit: {
        x: 100,
        opacity: 0,
        transition: {
            ease: 'easeOut',
            delay: 0.1
        }
    }
};

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
                <AnimatePresence>
                    {tasks.map((task, index) => (
                        <motion.div
                            key={typeof task === 'object' ? task._id : index}
                            // Disable animations because ghost element probs did this already
                            initial={task.isTemporaryTask ? false : 'hidden'}
                            animate={task.isTemporaryTask ? false : 'visible'}
                            layout={!task.isTemporaryTask}
                            exit={task.isCompleted ? 'exit' : undefined}
                            custom={index}
                            variants={variants}
                        >
                            <SortableItem
                                id={typeof task === 'object' ? task._id : index}
                                index={index}
                                value={task}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </SortableContext>
        </DndContext>
    );
}

export default SortableList;
