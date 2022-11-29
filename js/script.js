{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        function clearInput() {
            document.getElementById("newTask").value = "",
            document.getElementById("newTask").focus();
        }

        clearInput();
        
        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li type="none" class="task__content"
            >
            <button class="button__done js-done"></button>
            <span class="task__content--text${task.done ? " task__content--done" : ""}">${task.content}</span>
            <button class="button__remove js-remove">
            <span class="button__remove--icon">&#128465;</span>
            </button>
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}