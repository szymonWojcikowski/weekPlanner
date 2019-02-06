import React from "react";
import ReactDOM from 'react-dom';

import Day from "./Day.jsx";




class PlansSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenSize: window.innerWidth,
            days: [
                [{
                    taskName: "taskName",
                    taskPriority: "3",
                    estimatedTime: "4"
                }, {
                    taskName: "taskNameTest",
                    taskPriority: "2",
                    estimatedTime: "2"
                }],
                [],
                [],
                [],
                [],
                [],
                []
            ]

        };
        //this.daysDisplay = this.daysDisplay.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        //this.updateDimensions = this.updateDimensions.bind(this);
    };

    handleLoad(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    };

    // daysDisplay(numberOfDays) {
    //     // for(let i = 0; i < numberOfDays; i++) {
    //     //     return (
    //     //         <li className="day" id={i}>Dzień nr {i}</li>
    //     //     );
    //     // }
    //     const daysOfWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    //
    //
    //     const enableDays = daysOfWeek.map( (day, index) => {
    //         return <Day key={index} dataDay={index} day={day} tasks={this.state.days[index]} days={this.state.days}>{day}</Day>
    //     });
    //
    //     const daysToDisplay = [];
    //
    //     for(let i = 0; i < numberOfDays; i++) {
    //         daysToDisplay.push(enableDays[i]);
    //     }
    //
    //     return daysToDisplay;
    // };


    // componentWillMount() {
    //     this.updateDimensions();
    // };

    // componentDidMount() {
    //     window.addEventListener("resize", this.updateDimensions);
    // };

    // componentWillUnmount() {
    //     window.removeEventListener("resize", this.updateDimensions);
    // };



    render() {
        const daysOfWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
        return (
            <section className="week" onLoad={this.handleLoad}>
                {daysOfWeek.map((day, index) => {
                    return (<Day key={index}
                                dataDay={index}
                                day={day}
                                tasks={this.state.days[index]}>
                                    {day}
                                </Day>)
                })}
            </section>
        );
    }
}

export default PlansSection;