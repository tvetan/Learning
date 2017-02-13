import React, { PropTypes } from 'react';

export const TodoForm = (props) => (
    <form onSubmit={props.handleSubmit}>
        <input type="text" 
        onChange={props.handleInputChange} 
        value={props.currentTodo}/>
    </form>
)

TodoForm.PropTypes = {
    handleInputChange: PropTypes.func.isRequired,
    currentTodo: PropTypes.string.isRequired
};