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

            idCounter: 0,

            // properties for taskObjToAdd
            id: 0,
            taskName: "ble ble",
            taskPriority: 0,
            estimatedTime: 0,
            selected: false,

            // where to add
            dayIndex: 0,

            days: [
                [// day 0
                    { // single task
                        id: 0,
                        taskName: "taskName",
                        taskPriority: "3",
                        estimatedTime: "4",
                        selected: false,
                    }, {
                    id: 1,
                    taskName: "taskNameTest",
                    taskPriority: "2",
                    estimatedTime: "2",
                    selected: true,
                }],
                [], // day 2
                [],
                [],
                [],
                [],
                [] // day 6
            ],
            depot: [] // id of tasks to move
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleT = this.handleT.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);// this.state?
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSelected = this.handleSelected.bind(this);
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
            console.log("State na żądanie: ", this.state);
        }
    };

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        console.log("change ", event);
        console.log("state ", this.state);
    };

    // to co niżej
    // handleDelete = (a) => {
    //     return (b) => {
    //
    //     }
    // };

    handleDelete = day => toDel =>  {
        console.log("Skasujmy coś");
        //console.log("Skasujmy coś, najlepiej ", event.target.parentElement.parentElement);
        //const toDel = event.target.parentElement.parentElement.dataset.id;
       // const day = event.target.parentElement.parentElement.parentElement.dataset.day;

        this.setState( prevState => {
            let newDays = [...prevState.days];
            console.log(`Skasuj zadanie o id ${toDel} w dniu ${day}, możliwe dni ${newDays}`);
            console.log("Nasz------", newDays[day], newDays, day, event.target);

            // days[day].filter( item => !toDel.includes(item.id) );
            newDays[day] = newDays[day].filter( item => item.id != toDel );
            console.log("NEW days ", newDays);

            // filter(item => !toDel.includes(item.id));

            return ({
                days: newDays
            })
        });
    };

    handleSelected = day => toPush => {
        console.log("Zaznaczone");

        this.setState( prevState => {
            let toAction = [...prevState.days];
            let selectedTask = toAction[day].filter( item => item.id == toPush );
            console.warn("===== Selected to action before =====", selectedTask, toAction, day, event.target);
            selectedTask.selected === true ? selectedTask.selected = false : selectedTask.selected = true;
            console.warn("===== Selected to action after=====", selectedTask);

            //----New--setting--task--to--selected----
            let x = toAction.map( day => {
                console.log("DAY:", day);
                let y = day.map( item => {
                    console.log("ITEM:", item);
                    if (item.id == selectedTask.id) {
                        item = selectedTask;
                        return item;
                    }
                    return item;
                });
                return day;
            });
            console.log("toAction po map", x);
            //---------------------

            return ({
                depot: [...prevState.depot, ...toAction]
            })
        });
    };



    // handleSelected2 = day => toPush => {
    //     console.log("Zaznaczone");
    //
    //     this.setState( prevState => {
    //         let toDepot = prevState.days;
    //         toDepot = toDepot[day].filter( item => item.id == toPush );
    //         console.warn("Selected to depot------ /n ::::", toDepot[day], toDepot, day, event.target);
    //
    //         //----New--setting--task--to--selected----
    //         toDepot.map( item => {
    //             item.selected === true ? item.selected = false : item.selected = true;
    //         });
    //         //---------------------
    //
    //         return ({
    //              depot: [...prevState.depot, ...toDepot]
    //         })
    //     });
    // };

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState( prevState => {
            console.warn(prevState);
            const newDays = [...prevState.days];
            const currentId = prevState.idCounter;

            // -!!-> tworzymy wiele zmiennych, którym przypsiujemy wartości z obiektu
            // leżące pod kluczami analogicznymi do nazwy zmiennej
            const { idCounter: id, taskName, taskPriority, estimatedTime, selected } = prevState;
            // zapis równoważny:
            // const taskName = prevState.taskName;
            // const taskPriority = prevState.taskPriority;
            // const estimatedTime = prevState.estimatedTime;
            console.log("Idiki: ", id);


            // -!!-> tworzymy nowy obiekt currentDay, w którym przypisujemy kluczom
            // wartości zmiennych o takich samych nazwach jak klucze
            const currentDay = { id, taskName, taskPriority, estimatedTime, selected };
            // zapis równoważyny:
            // currentDay = {
            //     taskName: taskName,
            //     taskPriority: taskPriority
            //     estimatedTime: estimatedTime
            // }

            console.error("Obiekt do dodania currentDay ", currentDay);
            newDays[prevState.dayIndex].push(currentDay);

            return ({
                days: newDays,
                idCounter: currentId + 1
            })
        });
        this.state.openAddFormClicked ? this.setState({openAddFormClicked: false}) : this.setState({openAddFormClicked: true});
        //console.warn("Obiekt do dodania", taskArr);
    };

    render() {
        console.log("-Days-", this.state.days);
        console.log("-Depot-", this.state.depot);

        //console.log('Dodano zadanie ', this.state.taskName, this.state.dayIndex);

        return (
            <div onKeyDown={this.handleT}>
                <Header
                    handleClick={this.handleClick}
                    data={this.state}
                />
                {this.state.openAddFormClicked ? <AddForm
                    days={this.state.days}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    id={this.state.id}
                    taskName={this.state.taskName}
                    taskPriority={this.state.taskPriority}
                    dayIndex={this.state.dayIndex}
                    estimatedTime={this.state.estimatedTime}
                /> : <PlansSection
                    days={this.state.days}
                    handleDelete={this.handleDelete}
                    handleSelected={this.handleSelected}
                />}
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
