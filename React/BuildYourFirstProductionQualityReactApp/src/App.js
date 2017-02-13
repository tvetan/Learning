import React, { Component } from 'react';
import logo from './logo.svg';
import {TodoForm, TodoList, Footer} from './components/todo'
import './App.css';
import  {removeTodo, addTodo, generateId, findById, updateTodo, toggleTodo, filterTodos} from './lib/todoHelpers';
import {partial, pipe} from "./lib/utils"
import {loadTodos, createTodo, saveTodo, deleteTodo} from "./lib/todoService"

class App extends Component {
  state = {
      todos: [],
      currentTodo: ''
    };

  handleInputChange = (evt) => {
    this.setState({
      currentTodo: evt.target.value
    });
  }

  handleRemove = (id, evt) => {
    evt.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id);
    this.setState({
      todos: updatedTodos
    })

    deleteTodo(id)
      .then(() => this.showTempMessage('Todo removed'))
  }

  handleSubmitValid = (evt) => {
    console.log("handleSubmitValid")
    evt.preventDefault();
    const addedTodo = { id: generateId(), name: this.state.currentTodo};
    const updatedList = addTodo(this.state.todos, addedTodo);

    this.setState({
      todos: updatedList,
      errorMessage: ""
    });

    createTodo(addedTodo)
      .then(() => this.showTempMessage('Todo Added'))
  }

  handleSubmitEmpty = (evt) => {
    evt.preventDefault();

    this.setState({
      errorMessage: "Todo cannot be empty"
    });
  }

  handleToggle = (id) => {
    const getToggledTodo = pipe(findById, toggleTodo)
    const updated = getToggledTodo(id, this.state.todos);
    
    const getUpdatedTodos = partial(updateTodo, this.state.todos);
    let updatedTodos = getUpdatedTodos(updated)
    this.setState({
      todos: updatedTodos
    })

    saveTodo(updated)
      .then(() => this.showTempMessage("Updated"))
  }

  showTempMessage = (msg) => {
    console.log()
    this.setState({message: msg})
    setTimeout(() => this.setState({message: ''}), 2500)
  }

  static contextTypes = {
    route: React.PropTypes.string
  }

  componentDidMount() {
    loadTodos()
      .then(todos => this.setState({todos}))
  }

  render() {
    const handleSubmit = this.state.currentTodo ? this.handleSubmitValid : this.handleSubmitEmpty;
    const displayTodos = filterTodos(this.state.todos, this.context.route);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todo</h2>
        </div>
       <div className="Todo-App"> 
       { this.state.errorMessage && <span className="error"> {this.state.errorMessage} </span>}
        { this.state.message && <span className="success"> {this.state.message} </span>}
        
        <TodoForm handleSubmit={handleSubmit} 
          currentTodo={this.state.currentTodo} 
          handleInputChange={this.handleInputChange}/>
        <TodoList
          handleRemove={this.handleRemove}
         handleToggle={this.handleToggle} todos={displayTodos} /> 
         <Footer />
       </div>
      </div>
    );
  }
}

export default App;
