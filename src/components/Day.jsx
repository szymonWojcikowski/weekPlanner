import React from "react";

import Task from "./Task.jsx";

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
                        />
                    );
                })}
            </ul>
        );
    }
}

export default Day;


{/*if (1!==1) { //index == this.props.dataDay*/}
    {/*console.log("jestem w warunku");*/}
    {/*let holeDay = item;*/}
    {/*console.log("Cały dzien ", holeDay);*/}
    {/*return holeDay.map( item => {                   }*/}
            {/*}*/}