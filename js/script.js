{
    let tasks = [];

    let hideDoneTasks = false;

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [...tasks, { content: newTaskContent }];
        render();
    };

    const toggleAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const bindToggleDoneEvents = () => {

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const renderTasks = () => {
        const taskToHTML = task => `
        <li 
        class="task__content ${task.done && hideDoneTasks ? "tasks__content--hidden" : ""} js-tasksButtons">
        <button class="button__done js-done">
            ${task.done ? "✔" : ""}
        </button>
        <span class="task__content--text${task.done ? " task__content--done" : ""}">
        ${task.content}
        </span>
        <button class="button__remove js-remove">
        <span class="button__remove--icon">&#128465;
        </span>
        </button>
        </li>
        `;

        const taskElement = document.querySelector(".js-tasks");
        taskElement.innerHTML = tasks.map(taskToHTML).join("");
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-tasksButtons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
        <button 
            class="buttons__button js-toggleHideDoneTasks">
                ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button
            class="buttons__button js-toggleAllTasksDone"
                ${tasks.every(({ done }) => done) ? "disabled" : ""}>
            Ukończ wszystkie
        </button>    
        `;
    };

    const bindButtonsEvents = () => {
        const toggleAllTasksDoneButton = document.querySelector(".js-toggleAllTasksDone");

        if (toggleAllTasksDoneButton) {
            toggleAllTasksDoneButton.addEventListener("click", toggleAllTasksDone);
        }

        const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");

        if (toggleHideDoneTasksButton) {
            toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        }
    };

    const render = () => {
        renderTasks();
        bindRemoveEvents();
        bindToggleDoneEvents();

        renderButtons();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };

    init();
}