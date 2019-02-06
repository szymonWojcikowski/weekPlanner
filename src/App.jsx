"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';

import Header from "./components/Header.jsx";
import AddForm from "./components/AddForm.jsx";
import PlansSectionOld from "./components/PlansSection.jsx";
import Footer from "./components/Footer.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openAddFormClicked: false,
            // properties for taskObjToAdd
            taskName: "ble ble",
            taskPriority: 0,
            dayIndex: 0,
            estimatedTime: 0,
            tasks: []
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleT = this.handleT.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);// this.state?
    };

    handleClick(event) {
        //const {name, value} = event.target;
        event.preventDefault();
        this.state.openAddFormClicked ? this.setState({openAddFormClicked: false}) : this.setState({openAddFormClicked: true});
        console.log(this.state.openAddFormClicked);
    };

    handleT(event) {
       // event.preventDefault();
        if (event.keyCode === 84) {
            console.log(this.state.tasks);
        }
    };

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        console.log("change ", event);
        console.log("state ", this.state);
        //const {name, value} = event.target;
        // this.setState({   //App.jsx:47 Uncaught TypeError: this.setState is not a function
        //     [name]: value  //[event.target.name]: event.target.value
        // });
    };

    // handleSubmit() {
    //
    //     const taskArr = [];
    //     taskArr.push(
    //         {
    //             taskName: this.state.taskName,
    //             taskPriority: this.state.taskPriority,
    //             value: this.state.value,
    //             estimatedTime: this.state.estimatedTime
    //         }
    //     );
    //     this.setState({ tasks: taskArr });
    //     this.state.openAddFormClicked ? this.setState({openAddFormClicked: false}) : this.setState({openAddFormClicked: true});
    //     console.warn("Obiekt do dodania", taskArr);
    //     console.log('Dodano zadanie ', this.state.taskName, this.state.dayIndex);
    //     console.info("tasks from state ", this.state.tasks);
    // };

    handleSubmit = (event) => {
            event.preventDefault();
            const taskArr = [];
            taskArr.push(
                {
                    taskName: this.state.taskName,
                    taskPriority: this.state.taskPriority,
                    dayIndex: this.state.dayIndex,
                    estimatedTime: this.state.estimatedTime
                }
            );
            this.setState( prevState => ({
                tasks: [...prevState.tasks, taskArr]
            }));
            this.state.openAddFormClicked ? this.setState({openAddFormClicked: false}) : this.setState({openAddFormClicked: true});
            console.warn("Obiekt do dodania", taskArr);

    };

    render() {
        console.log('Dodano zadanie ', this.state.taskName, this.state.dayIndex);
        console.info("tasks from state ", this.state.tasks);

        return (
            <div onKeyDown={this.handleT}>
                <Header
                    handleClick={this.handleClick}
                    data={this.state}
                />
                {this.state.openAddFormClicked ? <AddForm
                    tasks={this.state.tasks}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    taskName={this.state.taskName}
                    taskPriority={this.state.taskPriority}
                    dayIndex={this.state.dayIndex}
                    estimatedTime={this.state.estimatedTime}
                /> : <PlansSectionOld />}
                <Footer />
            </div>
        )
    }
}

//--------------components rendering--------------
document.addEventListener('DOMContentLoaded',
    function(){
        ReactDOM.render(
            <App />,
            document.getElementById('app')
        );
    }
);
