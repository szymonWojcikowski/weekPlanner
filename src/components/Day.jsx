import React from "react";

import Task from "./Task.jsx";
import PlansSection from "./PlansSection.jsx";

class Day extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        // };
    }

    render() {
        console.log("Props ", this.props);
        // console.log("Tasks ", this.state.tasks);
        // console.log("state.tasks ", this.state.monday);
        return (
            <ul className="day">
                <span>{this.props.day}</span>
                {this.props.tasks.map( (item, index) => {
                    return (
                        <Task
                            key={index}
                            id={item.id}
                            taskName={item.taskName}
                            taskPriority={item.taskPriority}
                            estimatedTime={item.estimatedTime}
                            handleDelete={this.props.handleDelete(this.props.dataDay)}
                            handleSelected={this.props.handleSelected(this.props.dataDay)}
                        />
                    );
                })}
            </ul>
        );
    }
}

export default Day;