import React, { useCallback, useEffect, useRef } from 'react';
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
    visible: {
        opacity: 1,
        x: 0
    },
    beforeEnter: {
        x: -100,
        opacity: 0
    },
    exit: ({ newListLength }) => ({
        x: 100,
        opacity: 0,
        transition: {
            duration: newListLength ? undefined : 0
        }
    })
};

const SortableItem = function ({ id, task }) {
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
        <motion.div
            // we need to tell framer to re-calculate if isTemporary changes
            key={task._id + task.isTemporaryTask}
            // Disable animations because ghost element probs did this already
            layout={!task.isTemporaryTask}
            exit={task.isCompleted ? { x: '50vw', opacity: 0 } : undefined}
            transition={{
                type: 'easeOut'
            }}
        >
            <Task
                ref={setNodeRef}
                containerProps={{
                    style,
                    ...attributes
                }}
                touchEvents={listeners}
                {...task}
            />
        </motion.div>
    );
};

function SortableList({ listId, tasks, onSortEnd }) {
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

    // tracking of previous list length for when
    // bouncing from 'all caught up' to tasks list
    // for smoother transition
    const prevLength = useRef(tasks.length);
    useEffect(() => {
        prevLength.current = tasks.length;
    }, [tasks.length]);

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
                <AnimatePresence
                    exitBeforeEnter={prevLength.current !== 0}
                    custom={{ newListLength: tasks.length }}
                >
                    <motion.div
                        key={listId}
                        initial="beforeEnter"
                        animate="visible"
                        exit="exit"
                        variants={variants}
                        custom={{ newListLength: tasks.length }}
                    >
                        <AnimatePresence>
                            {tasks.map((task, index) => (
                                <SortableItem
                                    key={
                                        typeof task === 'object'
                                            ? task._id
                                            : index
                                    }
                                    id={
                                        typeof task === 'object'
                                            ? task._id
                                            : index
                                    }
                                    index={index}
                                    task={task}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </AnimatePresence>
            </SortableContext>
        </DndContext>
    );
}

export default SortableList;
