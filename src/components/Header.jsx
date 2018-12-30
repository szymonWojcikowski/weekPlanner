import React from "react";

const Header = ({that}) => {//tu nie powinno być tego that, trzeba inaczej rozwiązać przypisanie this
    console.log(that.state.openAddFormClicked);

    return (
        <header>
            <h1>Week Planner</h1>
            <button onClick={that.handleClick} name="openAddFormClicked">Add Task</button>//tu nie powinno być tego that, trzeba inaczej rozwiązać przypisanie this
        </header>
    )
};

export default Header;