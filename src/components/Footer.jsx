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

const Save = (props) => {
    return (
        <button id="save" className="btn" onClick={props.save}>Save</button>
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
            <MoveBackward moveBackward={() => props.moveTask(true)} />
            <MoveForward moveForward={() => props.moveTask(false)} />
            <Save save={props.save} />
            <TaskCounter />
        </footer>
    )
};

export default Footer;