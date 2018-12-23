document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const priorityInput = document.getElementById("priorityInput");
    const daySelect = document.getElementById("daySelect");
    const timeInput = document.getElementById("timeInput");
    const taskListContainer = document.getElementsByClassName("day");
    const addBtn = document.getElementById("addTaskButton");
    const removeFinishedTasksBtn = document.getElementById("removeFinishedTasksButton");
    const taskToDoCounter = document.getElementById("counter");
    const remainingChars = document.getElementById("remainingChars");

    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log(taskList);

    const checkIdCounter = function () {
        let currentlyBiggest;
        if (taskList.length === 0) {
            currentlyBiggest = 0;
        }
        else {
            currentlyBiggest = JSON.parse(localStorage.getItem("idCounter")) || 0;
            for (let i = 0; i < taskList.length; i++) {
                taskList[i].id > currentlyBiggest ? currentlyBiggest = taskList[i].id : currentlyBiggest;
            }
        }
        return currentlyBiggest;
    };

    let idCounter = checkIdCounter();
    let dragging;
    let draggingId;

    //---settings
    const activityHours = 16;
    const sectionWeekHeight = 80;

    //---konstruktor zadania
    const Task = function (task, priority, id, day, time) {
        this.priority = priority;
        this.task = task;
        this.id = id;
        this.day = day;
        this.time = time;
    };
    //---tablica zadan posortowana po kluczu priorytetu
    const taskListSorted = function (taskList) {
        let sortedTaskTab = taskList.slice().sort((a, b) => b.priority - a.priority);
        //powyżej użycie .slice() aby stworzyć kopię tablicy, inaczej sortowało również tablicę źródłową
        return sortedTaskTab;
    };
    //---czyszczenie widoku listy danego dnia
    const clearList = function (dayNr) {
        //console.log(dayNr, typeof dayNr);
        if (Array.isArray(dayNr)) {
            for (let i = 0; i < dayNr.length; i++) {
                for (let k = 0; k < taskListContainer.length; k++) {
                    if (taskListContainer[k].dataset.day == dayNr[i]) {
                        taskListContainer[k].innerHTML = "";
                    }
                }
            }
        }
        else {
            taskListContainer[dayNr].innerHTML = "";
        }
    };

    //---przyciski w zadaniach
    const buttonsInAddedTask = function (dayNr) {
        const getButtons = taskListContainer[dayNr].querySelectorAll("li>button"); //dayNr undefined
        //---zdarzenia przyciskow
        for (let i = 0; i < getButtons.length; i++) {
            getButtons[i].addEventListener("click", function () {
                //---klikniecie przycisku usuwania
                let taskToDelete = [];
                taskToDelete.push(parseInt(this.parentElement.dataset.id));
                deleteTaskObjFromTab(taskToDelete);
                //console.log(this);
                taskListRefresh(this.parentElement.parentElement.dataset.day);
                TaskCounterRefresh();
            });
            i++;//--- przejscie w petli do kolejnego przycisku
            getButtons[i].addEventListener("click", function (ev) {
                //---zaznaczenie, ze zrobione
                complete(this);
                ev.stopImmediatePropagation();
            });
        }
    };

    //--- wypelnianie widoku zadaniami danej listy
    const printList = function (dayNr) {
        for (let i = 0; i < taskListSorted(taskList).length; i++) {
            let nextTask = taskListSorted(taskList)[i].task;
            let nextTaskId = taskListSorted(taskList)[i].id;
            let nextTaskHeight = sectionWeekHeight/activityHours * taskListSorted(taskList)[i].time;
            let taskToAdd = document.createElement("li");
            taskToAdd.draggable = true;
            taskToAdd.classList.add("task");
            taskToAdd.dataset.id = nextTaskId;
            taskToAdd.style.height = nextTaskHeight + "vh";
            taskToAdd.innerHTML += `<h1>${nextTask}</h1><p class="descr" contenteditable="true">Add short description by click.</p><button class="btn delete"><i class="fas fa-times"></i></button><button class="btn selected"><i class="fas fa-check"></i></button>`;
            if (taskListSorted(taskList)[i].day === dayNr) {
                taskListContainer[dayNr].appendChild(taskToAdd);
                //--- odpalenie obslugi zdarzen dla wydrukowanych guzikow
                buttonsInAddedTask(dayNr);
            } else {
                for (let j = 0; j < dayNr.length; j++) {
                    if (taskListSorted(taskList)[i].day === dayNr[j]) {
                        taskListContainer[dayNr[j]].appendChild(taskToAdd);
                        //--- odpalenie obslugi zdarzen dla wydrukowanych guzikow
                        buttonsInAddedTask(dayNr[j]);
                    }
                }
            }
            dragEventsOfTask();
        }
    };


//-------obsługa localStorage----------

    const saveTaskListToLocalStorage = function () {
        localStorage.setItem("tasks", JSON.stringify(taskList));
        localStorage.setItem("idCounter", JSON.stringify(idCounter));
    };

    const clearLocalStorage = function () {
        localStorage.clear();
    };

    //---odswiezanie listy zadan z danego dnia
    const taskListRefresh = function (dayNr) {
        console.log("tasklistRefreh: ", dayNr);
        clearList(dayNr);
        printList(dayNr);
        //---aktualizacja danych w localStorage
        clearLocalStorage();
        saveTaskListToLocalStorage();
    };

    //---odswiezanie licznika zadan
    const TaskCounterRefresh = function () {
        taskToDoCounter.innerText = taskList.length;
    };

    //---budowanie widoku po załadowaniu strony (na podstawie LocalStorage)
    ( (weekDays) => taskListRefresh(weekDays) )(["0", "1", "2", "3", "4", "5", "6"]);
    TaskCounterRefresh();

    //---czyszczenie inputow
    const inputsRefresh = function () {
        taskInput.value = "";
        priorityInput.value = "";
        timeInput.value = "";
    };

    //---zebranie do tablicy id zrobionych zadan
    const doneTaskTabPreparation = function () {
        const doneTasks = document.getElementsByClassName("done");
        let doneTaskId = [];
        for (let i = 0; i < doneTasks.length; i++) {
            doneTaskId.push(parseInt(doneTasks[i].dataset.id));
        }
        return doneTaskId;
    };
//--- przygotowanie tablicy dni do odswiezenia
    const daysToRefresh = function (doneTaskId) {
        let daysToRefreshTab = [];
        for (let i = 0; i < doneTaskId.length; i++) {
            for (let j = 0; j < taskList.length; j++) {
                if (doneTaskId[i] == taskList[j].id) {
                    daysToRefreshTab.push(taskList[j].day);
                }
            }
        }
        return daysToRefreshTab;
    };

    //---przycisk usuwania zrobionych zadan
    removeFinishedTasksBtn.addEventListener("click", function (daysToRefreshTab) {
        let doneTasks = doneTaskTabPreparation();
        let dToRefr = daysToRefresh(doneTasks);
        deleteTaskObjFromTab(doneTasks);
        taskListRefresh(dToRefr);
        TaskCounterRefresh();
    });

    //---usuniecie z tablicy obiektow zadan wg przekazanych id
    const deleteTaskObjFromTab = function (toCut) {
        taskList = taskList.filter(item => !toCut.includes(item.id));
    };
    //-----obejscie problemu zmieniajacej sie dlugosci tablicy przy usuwaniu z niej elementow:
    // https://stackoverflow.com/questions/5767325/how-do-i-remove-a-particular-element-from-an-array-in-javascript
    // można dodać plyfill do includes: https://tc39.github.io/ecma262/#sec-array.prototype.includes
    // polyifill do filter: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#Polyfill

    //---dodaje lub usuwa klase "done"
    const complete = function (context) {
        context.parentElement.classList.toggle("done");
    };
    //---przycisk dodawania zadania
    addBtn.addEventListener("click", function () {
        if (taskInput.value.length > 5 && taskInput.value.length < 100) {
            if (Number.isInteger(parseInt(priorityInput.value)) && parseInt(priorityInput.value) >= 1 && parseInt(priorityInput.value) <= 10) {
                if (Number.isInteger(parseInt(timeInput.value)) && parseInt(timeInput.value) >= 0.5 && checkTotalTime(daySelect.options[daySelect.options.selectedIndex].value) <= activityHours) {
                    taskList.push(new Task(
                        decodeURIComponent(encodeURIComponent(taskInput.value)),
                        decodeURIComponent(encodeURIComponent(priorityInput.value)),
                        idCounter,
                        decodeURIComponent(encodeURIComponent(daySelect.options[daySelect.options.selectedIndex].value)),
                        decodeURIComponent(encodeURIComponent(timeInput.value))
                        )
                    );
                    idCounter++;
                    //console.log(typeof (daySelect.options[daySelect.options.selectedIndex].value), daySelect.options[daySelect.options.selectedIndex].value);
                    taskListRefresh(daySelect.options[daySelect.options.selectedIndex].value);
                    TaskCounterRefresh();
                    inputsRefresh();
                }
                else {
                    alert("ProTip: Pamiętaj, żeby się wyspać ;) \n Minimalny czas przewidzany na zadnie 0.5 godziny, \n maksymalny 16.");
                }
            }
            else {
                alert("Whooha! \n ProTip: Priorytet powinien być liczbą całkowitą z zakresu 1-10");
            }
        }
        else {
            alert("Whooha! \n ProTip: Minimum 5 znaków, nie więcej niż 100.");
        }
    });

    //--- nasłuch zdarzenia na inpucie nazwy taska, wyświetlenie dostępnej liczby znaków
    // taskInput.addEventListener("keypress", function () {
    //     let displayRemainingChars = 20 - taskInput.value.length;
    //     console.log(displayRemainingChars, taskInput.value.length);
    //     taskInput.setAttribute('data-before', displayRemainingChars);
    //
    // });


    taskInput.addEventListener('input', function() {
        let displayRemainingChars = 20 - this.value.length;
        remainingChars.value = displayRemainingChars;
        if (displayRemainingChars <= 0) {
            remainingChars.classList.add("error");
            remainingChars.value = "no more";
        }
        console.log(taskInput);

        // function setDefaultState() {
        //     remainingChars.value = displayRemainingChars;
        // }
        //
        // document.addEventListener('DOMContentLoaded', function () {
        //     setDefaultState();
        // })
    });

    //--- taskList tester na żądanie (t key)
    document.addEventListener("keyup", function (ev) {
        if (ev.which === 84) { //t key
            ev.preventDefault();
            console.log(taskList);
        }
    });

    //--- przy dodawaniu taska sprawdzamy
    // czy w danym dniu łączny czas tasków nie przekracza wartości activityHours

    function checkTotalTime(whichDay) {
        const currentlyAdded = parseInt(timeInput.value);
        let totalTime = currentlyAdded;
        for (let j = 0; j < taskList.length; j++) {
            if (taskList[j].day === whichDay) {
                totalTime += parseInt(taskList[j].time);
            }
        }
        return totalTime;
    }

//--------------obsługa-draggable----------------

//--- generujemy eventy dla przeciągalnych tasków
    function dragEventsOfTask() {
        const tasks = document.querySelectorAll('.task');

        for (const taskToDrag of tasks) {
            taskToDrag.addEventListener('dragstart', dragStart);
        }
    }

//--- generujemy eventy dla lądowisk (dni)
    function dropAreaEvents(days) {
        for (const day of days) {
            day.addEventListener('dragover', dragOver);
            day.addEventListener('dragenter', dragEnter);
            day.addEventListener('drop', dragDrop);
        }
    }
    dropAreaEvents(taskListContainer);


//--- funkcje przeciągania
    function dragStart() {
        dragging = this;
        draggingId = dragging.dataset.id;
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
    }

    function dragDrop() {
        this.append(dragging);
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].id == draggingId) {
                taskList[i].day = this.dataset.day;
            }
        }
        clearLocalStorage();
        saveTaskListToLocalStorage();
    }
//---------- koniec obsługi drag&drop ---------

});