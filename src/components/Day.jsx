import React from "react";

import Task from "./Task.jsx";
import PlansSection from "./PlansSection.jsx";

class Day extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: this.props.tasks,
            // monday: this.props[0].tasks
        };
    }

    render() {
        console.log("Props ", this.props);
        console.log("Tasks ", this.state.tasks);
        // console.log("state.tasks ", this.state.monday);
        return (
            <ul className="day" data-day={this.props.dataDay}>
                <span>{this.props.day}</span>
                {this.state.tasks.map( (item, index) => {
                    return (
                        <Task
                            key={index}
                            taskName={item.taskName}
                            taskPriority={item.taskPriority}
                            estimatedTime={item.estimatedTime}
                            handleDelete={this.props.handleDelete}
                            handleSelected={this.props.handleSelected}
                        />
                    );
                })}
            </ul>
        );
    }
}

export default Day;