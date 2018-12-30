import React from "react";


class AddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: "",
            taskPriority: 0,
            value: 0,
            estimatedTime: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    };

    handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    value={this.state.taskName}
                    name="taskName"
                    placeholder="Name the task"
                    onChange={this.handleChange}
                />
                <input
                    type="number"
                    value={this.state.taskPriority}
                    name="taskPriority"
                    placeholder="Task priority"
                    onChange={this.handleChange}
                />
                <input
                    type="number"
                    value={this.state.estimatedTime}
                    name="estimatedTime"
                    placeholder="Estimated time"
                    onChange={this.handleChange}
                />
                <select value={this.state.value} name="value" onChange={this.handleChange}>
                    <option value="0" data-day="0">Monday</option>
                    <option value="1" data-day="1">Tuesday</option>
                    <option value="2" data-day="2">Wednesday</option>
                    <option value="3" data-day="3">Thursday</option>
                    <option value="4" data-day="4">Friday</option>
                    <option value="5" data-day="5">Saturday</option>
                    <option value="6" data-day="6">Sunday</option>
                </select>
                <input type="submit" value="Submit" />
                <h1>{this.state.taskName}<br />
                    priority {this.state.taskPriority}, day {this.state.value}, estimated {this.state.estimatedTime} houres</h1>
            </form>
        );
    };
}

export default AddForm;