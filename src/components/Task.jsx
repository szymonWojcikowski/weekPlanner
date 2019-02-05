import React from "react";
import ReactDOM from 'react-dom';


const Task = (props) => {
    return (
        <li>
            <h1>{props.taskName}</h1>
            <span>Description will be here</span>
        </li>
    )
};

export default Task;