import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, content: "Task 1" },
    { id: 2, content: "Task 2" },
    { id: 3, content: "Task 3" },
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const todosCopy = [...todos];
    const [removed] = todosCopy.splice(result.source.index, 1);
    todosCopy.splice(result.destination.index, 0, removed);
    setTodos(todosCopy);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {todos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {todo.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
