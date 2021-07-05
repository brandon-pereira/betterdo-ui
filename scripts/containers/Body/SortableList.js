import React from 'react';
import Task from '@components/Task';
import { CSS } from '@dnd-kit/utilities';
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    useDraggable
} from '@dnd-kit/core';
import {
    useSortable,
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';

const SortableItem = function({ id, value }) {
    // console.log(id, value);
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useDraggable({ id });
    // const P

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Task {...value} />
        </div>
    );
};

function SortableList({ tasks }) {
    const sensors = useSensors(
        useSensor(PointerSensor)
        // useSensor(KeyboardSensor, {
        //     coordinateGetter: sortableKeyboardCoordinates
        // })
    );
    if (!tasks || !tasks.length) {
        return null;
    }

    return (
        // <DndContext
        // sensors={sensors}
        // collisionDetection={closestCenter}
        // onDragEnd={handleDragEnd}
        // >
        <>
            <SortableContext
                items={tasks.map(task => task._id)}
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
        </>
        // </DndContext>
    );

    // return (
    //     <div>
    //         {tasks.map((task, index) => (
    //             <SortableItem
    //                 key={typeof task === 'object' ? task._id : index}
    //                 index={index}
    //                 value={task}
    //             />
    //         ))}
    //     </div>
    // );
}

function handleDragEnd(event) {
    const { active, over } = event;
    // DragOverlay;
    if (active.id !== over.id) {
        console.log(active);
    }
}

export default SortableList;
