"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';

import Header from "./components/Header.jsx";
import AddForm from "./components/AddForm.jsx";
import PlansSection from "./components/PlansSection.jsx";
import Footer from "./components/Footer.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openAddFormClicked: false,
            // properties for taskObjToAdd
            taskName: "ble ble",
            taskPriority: 0,
            value: 0,
            estimatedTime: 0,
            tasks: []
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleT = this.handleT.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleClick(event) {
        //const {name, value} = event.target;
        event.preventDefault();
        this.state.openAddFormClicked ? this.setState({openAddFormClicked: false}) : this.setState({openAddFormClicked: true});
        console.log(this.state.openAddFormClicked);
    };

    handleT(event) {
        event.preventDefault();
        if (event.keyCode === 84) {
            console.log(this.state.tasks);
        }
    };

    handleSubmit() {
        console.log('props ', this.props, "tasks from state ", this.state.tasks);
        const taskArr = [];
        taskArr.push(
            {
                taskName: this.state.taskName,
                taskPriority: this.state.taskPriority,
                value: this.state.value,
                estimatedTime: this.state.estimatedTime
            }
        );
        this.setState({ tasks: taskArr })
    };

    render() {
        return (
            <div onKeyDownCapture={this.handleT}>
                <Header
                    handleClick={this.handleClick}
                    data={this.state}
                />
                {this.state.openAddFormClicked ? <AddForm tasks={this.state.tasks} handleSubmit={this.handleSubmit} /> : <PlansSection />}
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
