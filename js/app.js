document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const priorityInput = document.getElementById("priorityInput");
    let daySelect = document.getElementById("daySelect");//new
    const timeInput = document.getElementById("timeInput");//new
    const taskListContainer = document.getElementsByClassName("day");
    const addBtn = document.getElementById("addTaskButton");
    const removeFinishedTasksBtn = document.getElementById("removeFinishedTasksButton");
    const taskToDoCounter = document.getElementById("counter");

    let taskList = [];
    let idCounter = 0;


    const Task = function (task, priority, id, day, time) {
        this.priority = priority;
        this.task = task;
        this.id = id;
        //-------
        this.day = day;
        this.time = time;
    };

    const taskListSorted = function (taskList) {
        let sortedTaskTab = taskList.slice().sort( (a, b) => b.priority - a.priority);
        //powyżej użycie .slice() aby stworzyć kopię tablicy, inaczej sortowało również tablicę źródłową
        return sortedTaskTab;
    };

    const taskListRefresh = function (dayNr) {
        console.log(dayNr, typeof dayNr);
        if (Array.isArray(dayNr)) {
            console.log("tablica");
            for (let i = 0; i < dayNr.length; i++) {
                console.log(i, dayNr, dayNr.length, taskListContainer[i]);
                taskListContainer[i].innerHTML = "";
            }
        }
        else {
            console.log("var");
            taskListContainer[dayNr].innerHTML = "";
        }
        for (let i = 0; i < taskListSorted(taskList).length; i++) {
            let nextTask = taskListSorted(taskList)[i].task;
            let nextTaskId = taskListSorted(taskList)[i].id;
            if (taskListSorted(taskList)[i].day === dayNr) {
                let taskToAdd = document.createElement("li");
                taskToAdd.dataset.id = nextTaskId;
                taskToAdd.innerHTML += `<h1>${nextTask}</h1><button>X</button><button>V</button>`;
                taskListContainer[dayNr].appendChild(taskToAdd);
                buttonsInAddedTask(dayNr);
            }
        }
        console.log(taskList);
    };

    const TaskCounterRefresh = function () {
        taskToDoCounter.innerText = taskList.length;
    };

    const inputsRefresh = function () {
        taskInput.value = "";
        priorityInput.value = "";
        timeInput.value = "";
    };

    const buttonsInAddedTask = function (dayNr) {
        const getButtons = taskListContainer[dayNr].querySelectorAll("li>button"); //dayNr undefined

        for (let i = 0; i < getButtons.length; i++) {
            getButtons[i].addEventListener("click", function () {
                let taskToDelete = [];
                taskToDelete.push(parseInt(this.parentElement.dataset.id));// po tym można szukać argumentu dla tasklistRefresh (odpowiednika taskList.day)
                deleteTaskObjFromTab(taskToDelete);
                console.log(this);
                taskListRefresh(this.parentElement.parentElement.dataset.day);//arg all?
                TaskCounterRefresh();
            });
            i++;
            getButtons[i].addEventListener("click", function (ev) {
                complete(this);
                ev.stopImmediatePropagation();
            });
        }
    };

    const doneTaskTabPreparation = function () {
        const doneTasks = document.getElementsByClassName("done");
        let doneTaskId = [];
        for (let i = 0; i < doneTasks.length; i++) {
            doneTaskId.push(parseInt(doneTasks[i].dataset.id));
        }
        return doneTaskId;
    };
//------------przygotowanie tablicy dni-------------------
    const daysToRefresh = function (doneTaskId) {
        let daysToRefreshTab = [];
        console.log("argumenty", doneTaskId);
        for (let i = 0; i < doneTaskId.length; i++) {
            console.log("1 petla", taskList.length);
            for (let j = 0; j < taskList.length; j++) {
                console.log("in days ", doneTaskId[i], taskList[j].id);
                if (doneTaskId[i] == taskList[j].id) {
                    console.log("iv", taskList[j].day);
                    daysToRefreshTab.push(taskList[j].day);
                }
            }
            //daysToRefreshTab.push(taskList[i].find(el => el.day));
            console.log(daysToRefreshTab);
        }
        return daysToRefreshTab;
    };


//----------------------------------------
    removeFinishedTasksBtn.addEventListener("click", function (daysToRefreshTab) {
        let dToRefr = daysToRefresh(doneTaskTabPreparation());
        deleteTaskObjFromTab(doneTaskTabPreparation());
        taskListRefresh(dToRefr);
        TaskCounterRefresh();
    });

    const deleteTaskObjFromTab = function (toCut) {
        taskList = taskList.filter(item => !toCut.includes(item.id));
    };
    //-----obejscie problemu zmieniajacej sie dlugosci tablicy przy usuwaniu z niej elementow:
    // https://stackoverflow.com/questions/5767325/how-do-i-remove-a-particular-element-from-an-array-in-javascript
    // można dodać plyfill do includes: https://tc39.github.io/ecma262/#sec-array.prototype.includes
    // polyifill do filter: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#Polyfill

    const complete = function (context) {
        context.parentElement.classList.toggle("done");
    };

    addBtn.addEventListener("click", function () {
        if (taskInput.value.length > 5 && taskInput.value.length < 100) {
            if (Number.isInteger(parseInt(priorityInput.value)) && parseInt(priorityInput.value) >= 1 && parseInt(priorityInput.value) <= 10) {
                taskList.push(new Task(taskInput.value, priorityInput.value, idCounter, daySelect.options[daySelect.options.selectedIndex].value, timeInput.value));//new args 4 & 5
                idCounter++;
                taskListRefresh(daySelect.options[daySelect.options.selectedIndex].value);
                TaskCounterRefresh();
                inputsRefresh();
            }
            else {
                alert("Whooha! \n ProTip: Priorytet powinien być liczbą całkowitą z zakresu 1-10");
            }
        }
        else {
            alert("Whooha! \n ProTip: Minimum 5 znaków, nie więcej niż 100.");
        }
    });
});