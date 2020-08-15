import React from 'react';

const TodoItem = (props) => {
  const { todo, toggleComplete, deleteTodo } = props;
  return (
    <div className="todo">
      <input type="checkbox" checked={todo.complete} onChange={toggleComplete} />
      <span className={`${todo.complete ? 'complete' : ''}`}>{todo.todo}</span>
      <span className="delete-todo-btn" onClick={deleteTodo}>
        <i className="far fa-trash-alt"></i>
      </span>
    </div>
  );
}

export default TodoItem;