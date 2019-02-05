import React from "react";

import Task from "./Task.jsx";

class Day extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            xDay: props.xDay
        };
    }

    render() {
        return (
            <ul className="day" data-day={this.props.dataDay}>
                {this.props.day}
                {this.state.xDay.map( (item, index) => {
                        if (index === this.props.xDay) {
                            const holeDay = item;
                            holeDay.map( item => {
                                    return <Task
                                        taskName={item.taskName}
                                        taskPriority={item.taskPriority}
                                        estimatedTime={item.estimatedTime} />
                                }
                            )
                        }
                    }
                )}
            </ul>
        )
    }
}

export default Day;