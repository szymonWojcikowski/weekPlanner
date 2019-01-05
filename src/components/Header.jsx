import React from "react";

const Header = (props) => {
    console.log(props.data.openAddFormClicked);

    return (
        <header>
            <h1>Week Planner</h1>
            <button onClick={props.handleClick} name="openAddFormClicked" className="btn">Add Task</button>
        </header>
    )
};

export default Header;