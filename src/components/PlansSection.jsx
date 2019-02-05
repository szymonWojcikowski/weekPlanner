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
        this.daysDisplay = this.daysDisplay.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
    };

    handleLoad(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    };

    daysDisplay(numberOfDays) {
        // for(let i = 0; i < numberOfDays; i++) {
        //     return (
        //         <li className="day" id={i}>Dzień nr {i}</li>
        //     );
        // }
        const daysOfWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];


        const enableDays = daysOfWeek.map( (day, index) => {
            return <Day key={index} dataDay={this.index} day={day} xDay={this.state.days[index]}>{day}</Day>
        });

        const daysToDisplay = [];

        for(let i = 0; i < numberOfDays; i++) {
            daysToDisplay.push(enableDays[i]);
        }

        return daysToDisplay;
    };

    updateDimensions() {
        let w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            width = w.innerWidth || documentElement.clientWidth || body.clientWidth;
            //height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;

        //this.setState({width: width, height: height});
        this.setState({screenSize: width});
        // if you are using ES2015 I'm pretty sure you can do this: this.setState({width, height});
    };

    componentWillMount() {
        this.updateDimensions();
    };

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    };

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    };



    render() {
        return (
            <section className="week" onLoad={this.handleLoad}>
                { this.state.screenSize < 961 ? this.daysDisplay(1) : this.daysDisplay(7) }
            </section>
        );
    }
}

export default PlansSection;