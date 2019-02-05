import React from "react";


class AddForm extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     tasks: props.tasks,
        //     // taskName: "",
        //     // taskPriority: 0,
        //     // value: 0,
        //     // estimatedTime: 0
        // };
        // this.taskName={props.taskName};
        // this.taskPriority={this.state.taskPriority};
        // this.dayIndex={this.state.dayIndex};
        // this.estimatedTime={this.state.estimatedTime};
        //this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleChange = this.handleChange.bind(this);
        //this.handleChange = props.handleChange;
    };



    // handleSubmit(event) {
    //
    //     //console.log('props ', this.props, "tasks from state ", this.state.tasks);
    //     //event.preventDefault();
    //     this.props.handleSubmit(event.target.value);
    //     event.preventDefault();
    // };

    render() {
        return (
            <form className="addForm" onSubmit={this.props.handleSubmit}>
                <label>Task name
                    <input
                        type="text"
                        value={this.props.taskName}
                        name="taskName"
                        placeholder="Name the task"
                        onChange={this.props.handleChange}
                        //onInput={event => event.target.value}
                    />
                </label>
                <label>Task priority
                    <input
                        type="number"
                        value={this.props.taskPriority}
                        name="taskPriority"
                        placeholder="Task priority"
                        onChange={this.props.handleChange}
                    />
                </label>
                <label>Estimated time
                    <input
                        type="number"
                        value={this.props.estimatedTime}
                        name="estimatedTime"
                        placeholder="Estimated time"
                        onChange={this.props.handleChange}
                    />
                </label>
                <select value={this.props.dayIndex} name="dayIndex" onChange={this.props.handleChange}>
                    <option value="0" data-day="0">Monday</option>
                    <option value="1" data-day="1">Tuesday</option>
                    <option value="2" data-day="2">Wednesday</option>
                    <option value="3" data-day="3">Thursday</option>
                    <option value="4" data-day="4">Friday</option>
                    <option value="5" data-day="5">Saturday</option>
                    <option value="6" data-day="6">Sunday</option>
                </select>
                <input type="submit" value="Submit" />
                <h1>{this.props.taskName}<br />
                    priority {this.props.taskPriority}, day {this.props.value}, estimated {this.props.estimatedTime} houres</h1>
            </form>
        );
    };
}

export default AddForm;