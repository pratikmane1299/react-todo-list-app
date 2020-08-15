import React from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

export default class TodoList extends React.Component {
  state = {
    todos: [
      {
        id: 1,
        todo: 'first todo',
        complete: true
      }
    ],
    todo: '',
    filter: 'all',
    toggleAllComplete: true
  };

  handleChange = (e) => {
    this.setState({
      todo: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.todo === '') return;

    const newTodo = {
      id: this.state.todos.length + 1,
      todo: this.state.todo,
      complete: false
    };
    this.setState((state) => ({
      todos: [newTodo, ...state.todos],
    }));

    this.setState({
      todo: ''
    });
  }

  toggleComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(t => {
        if (t.id === id) {
          return {
            ...t,
            complete: !t.complete
          };
        } else {
          return t;
        }
      })
    });
  }

  deleteTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  }

  deleteAllTodos = () => {
    this.setState({
      todos: []
    });
  }

  toggleCompleteAllTodos = () => {
    this.setState({
      todos: this.state.todos.map(todo => {
        return {
          ...todo,
          complete: this.state.toggleAllComplete
        }
      }),
      toggleAllComplete: !this.state.toggleAllComplete
    });
  }

  filterTodos = (filter) => {
    this.setState({
      filter: filter
    })
  }

  render() {
    let todos = [];

    switch (this.state.filter) {
      case 'active':
        todos = this.state.todos.filter(todo => !todo.complete);
        break;
      case 'complete':
        todos = this.state.todos.filter(todo => todo.complete);
        break;
      default:
        todos = this.state.todos;
    }

    return (
      <div>
        <TodoForm
          todo={this.state.todo}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <div className="buttons-wrapper">
          <button onClick={this.deleteAllTodos}>Delete all todos</button>
          <button onClick={this.toggleCompleteAllTodos}>Toggle all todos as complete</button>
        </div>
        <div className="filter-btn-wrapper">
          <span className={`${this.state.filter === 'all' ? 'active-filter' : null}`} onClick={() => this.filterTodos('all')}>All</span>
          <span className={`${this.state.filter === 'active' ? 'active-filter' : null}`} onClick={() => this.filterTodos('active')}>Active</span>
          <span className={`${this.state.filter === 'complete' ? 'active-filter' : null}`} onClick={() => this.filterTodos('complete')}>Complete</span>
        </div>
        <p className="todos-count">Todos - {todos.length}</p>
        {
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleComplete={() => this.toggleComplete(todo.id)}
              deleteTodo={() => this.deleteTodo(todo.id)}
            />
          ))
        }
      </div>
    );
  }
}