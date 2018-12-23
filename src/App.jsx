import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import './scss/main.scss';


const TaskInput = () => {
    return (
        <input id="taskInput" type="text" placeholder="Name the task" maxLength="20" />
    )
};

const RemainingCharsInTaskInput = () => {
    return (
        <div id="outputHolder">
            <output htmlFor="taskInput" id="remainingChars">20</output>
        </div>
    )
};

const PriorityInput = () => {
    return (
        <input id="priorityInput" type="number" min="1" max="10" placeholder="Task priority" maxLength="2" />
    )
};

const TimeInput = () => {
    return (
        <input id="TimeInput" type="number" min="1" max="16" placeholder="Estimated time" maxLength="2" />
    )
};

const DaySelect = () => {
    const daysOfWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday", "Sunday"];


    const enableDays = daysOfWeek.map( (day, index) => {
        return <option key={index} value={index} data-day={index}>{day}</option>
    });

    return (
        <select id="daySelect" name="daySelect" className="btn">{enableDays}</select>
    )
};

class AddTaskButton extends React.Component {
    addTask = () => {
        console.log("Button działa!", this);
    };
    render() {
        return (
            <button id="addTaskButton" className="btn" onClick={this.addTask}>Add task</button>
        )
    }
}

// class Introspection extends React.Component {
//     render() {
//         return <div>
//             Currently using React {React.version}
//         </div>
//     }
// }

// class FormExample extends React.Component {
//     constructor(props) {
//         super(props);
//         //Początkowa wartość inputa ustawiona na '':
//         this.state = {name: ''};
//     }
//     handleNameChange = (event) => {
//         this.setState({name: event.target.name});
//     };
//     handleSubmit = (event) => {
//         event.preventDefault();
//         console.log('Your name is '
//             + this.state.name);
//     };
//     render(){
//         return <form onSubmit={this.handleSubmit}>
//             <label>
//                 Name:
//                 <input type="text"
//                        value={this.state.name}
//                        onChange={this.handleNameChange}
//                 />
//             </label>
//             <input type="submit" value="Submit" />
//         </form>;
//     }
// }

// function Example() {
//     const [count, setCount] = useState(0);
//
//     // Similar to componentDidMount and componentDidUpdate:
//     useEffect(() => {
//         // Update the document title using the browser API
//         document.title = `You clicked ${count} times`;
//     });
//
//     return (
//         <div>
//             <p>You clicked {count} times</p>
//             <button onClick={() => setCount(count + 1)}>
//                 Click me
//             </button>
//         </div>
//     );
// }


const Header = () => {
    return (
        <header>
            <h1>Week Planner</h1>
            <TaskInput />
            <RemainingCharsInTaskInput />
            <PriorityInput />
            <TimeInput />
            <DaySelect />
            {/*<FormExample />*/}
            {/*<Example />*/}
            <AddTaskButton />

            {/*<h1>Week Planner</h1>*/}
            {/*<input id="taskInput" type="text" placeholder="Name the task" maxLength="20">*/}
                {/*<div id="outputHolder">*/}
                    {/*<output htmlFor="taskInput" id="remainingChars">20</output>*/}
                {/*</div>*/}
                {/*<br>*/}
                    {/*<input id="priorityInput" placeholder="Task priority"><br>*/}
                        {/*<input id="timeInput" placeholder="Estimated time"><br>*/}
                            {/*<select name="daySelect" id="daySelect" className="btn">*/}
                                {/*<option value="0" data-day="0">Monday</option>*/}
                                {/*<option value="1" data-day="1">Tuesday</option>*/}
                                {/*<option value="2" data-day="2">Wednesday</option>*/}
                                {/*<option value="3" data-day="3">Thursday</option>*/}
                                {/*<option value="4" data-day="4">Friday</option>*/}
                                {/*<option value="5" data-day="5">Saturday</option>*/}
                                {/*<option value="6" data-day="6">Sunday</option>*/}
                            {/*</select>*/}
                            {/*<button id="addTaskButton" className="btn">Add task</button>*/}
        </header>
    )
};

document.addEventListener('DOMContentLoaded',
    function(){
        ReactDOM.render(
            <Header />,
            document.getElementById('header')
        );
    }
);