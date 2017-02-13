import React, { PropTypes } from 'react';
import {partial} from "../../lib/utils"

export const Todo = (props) => {
    const handleToggle = partial(props.handleToggle, props.id);
    const handleRemove = partial(props.handleRemove, props.id)
    return (
        <li>
            <span className='delete-item'><a href="#" onClick={handleRemove}>x</a></span>
            <input type="checkbox" onChange={handleToggle} checked={props.isComplete} /> 
            {props.name}
        </li>
    )
}

Todo.PropTypes = {
    isComplete: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
};