import React, { PropTypes } from 'react';
import {Todo} from './Todo'

export const TodoList = (props) => (
    <div className="Todo-list">
        <ul>
            {
                props.todos.map(todo => 
                    <Todo handleRemove={props.handleRemove} handleToggle={props.handleToggle} key={todo.id} {...todo}/>
                )
            }
        </ul>
    </div>
)

TodoList.PropTypes = {
    todos: PropTypes.array.isRequired
};