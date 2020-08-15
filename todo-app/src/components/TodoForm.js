import React from 'react';

export default class TodoForm extends React.Component {
  render() {
    const { todo, handleChange, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="todo">Todo</label>
        <input 
          type="text" 
          id="todo" 
          name="todo" className="todo-input" 
          value={todo} 
          onChange={handleChange} 
        />
        <button className="add-todo-btn button-primary">Add</button>
      </form>
    );
  }
}