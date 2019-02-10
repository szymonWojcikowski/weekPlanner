import React from "react";

const RemoveFinishedTasksButton = (props) => {
    return (
        <button id="removeFinishedTasksButton" className="btn" onClick={props.removeSelected}>Remove selected</button>
    )
};

const MoveForward = (props) => {
    return (
        <button id="moveToAnotherDay" className="btn" onClick={props.moveForward}>Move Forward</button>
    )
};

const MoveBackward = (props) => {
    return (
        <button id="moveToDayBefore" className="btn" onClick={props.moveBackward}>Move Backward</button>
    )
};



const TaskCounter = () => {
    return (
        <div className="taskCounter">
            <span id="counter">0</span>
            <span>Tasks:</span>
        </div>
    )
};


const Footer = (props) => {
    return (
        <footer>
            <p>&copy;Copyright 2019</p>
            <RemoveFinishedTasksButton removeSelected={props.removeSelected}/>
            <MoveBackward moveBackward={props.moveBackward} />
            <MoveForward moveForward={props.moveForward} />
            <TaskCounter />
        </footer>
    )
};

export default Footer;