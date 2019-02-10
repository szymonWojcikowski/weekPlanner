import React from "react";
import ReactDOM from 'react-dom';


const Task = (props) => {
    console.log("Propsy w tasku: ", props);
    const { estimatedTime } = props;
    console.log("czas::::", estimatedTime);
    const sectionWeekHeight = 80;
    const activityHours = 16;
    let style = {
        height: sectionWeekHeight/activityHours * parseInt(estimatedTime)+"vh"
    };

    return (
        <li style={style} className={props.selected ? "done" : undefined}>
            <h1>{props.taskName}</h1>
            <p className="descr">{props.taskPriority}</p>
            <button className="btn selected"
                    onClick={() => props.handleSelected(props.id)}>
                        <i className="fas fa-check" />
            </button>
            <button className="btn delete"
                    onClick={() => props.handleDelete(props.id)}>
                        <i className="fas fa-times" />
            </button>
        </li>
    )
};

export default Task; //?