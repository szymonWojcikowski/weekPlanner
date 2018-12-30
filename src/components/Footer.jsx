import React from "react";

const RemoveFinishedTasksButton = () => {
    // const removeFinishedTasksBtn = (function (daysToRefreshTab) {
    //     let doneTasks = doneTaskTabPreparation();
    //     let dToRefr = daysToRefresh(doneTasks);
    //     deleteTaskObjFromTab(doneTasks);
    //     taskListRefresh(dToRefr);
    //     //TaskCounterRefresh();
    // })();

    const removeFinishedTasks = () => console.log("click on remove");

    return (
        <button id="removeFinishedTasksButton" className="btn" onClick={removeFinishedTasks}>Remove selected</button>
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


const Footer = () => {
    return (
        <footer>
            <p>&copy;Copyright 2018</p>
            <RemoveFinishedTasksButton />
            <TaskCounter />
        </footer>
    )
};

export default Footer;