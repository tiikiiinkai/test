document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const showDeletedBtn = document.getElementById('show-deleted-btn');
    const deletedTaskList = document.getElementById('deleted-task-list');

    let deletedTasks = [];

    addTaskBtn.addEventListener('click', addTask);
    newTaskInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    showDeletedBtn.addEventListener('click', () => {
        deletedTaskList.style.display = deletedTaskList.style.display === 'none' ? 'block' : 'none';
    });

    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText === '') return;

        const listItem = createTaskElement(taskText);
        taskList.appendChild(listItem);
        newTaskInput.value = '';
    }

    function createTaskElement(taskText) {
        const listItem = document.createElement('li');

        const checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('checkbox-container');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');
        checkbox.id = `task-${taskList.childElementCount}`;

        const checkboxLabel = document.createElement('label');
        checkboxLabel.htmlFor = checkbox.id;

        checkbox.addEventListener('change', () => {
            listItem.classList.toggle('completed');
        });

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(checkboxLabel);
        listItem.appendChild(checkboxContainer);

        const taskTextSpan = document.createElement('span');
        taskTextSpan.classList.add('task-text');
        taskTextSpan.textContent = taskText;
        listItem.appendChild(taskTextSpan);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '&times;';
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(listItem);
            deletedTasks.push(taskText);
            updateDeletedTasks();
        });
        listItem.appendChild(deleteBtn);

        return listItem;
    }

    function updateDeletedTasks() {
        deletedTaskList.innerHTML = '';
        deletedTasks.forEach(taskText => {
            const listItem = document.createElement('li');

            const taskTextSpan = document.createElement('span');
            taskTextSpan.classList.add('task-text');
            taskTextSpan.textContent = taskText;
            listItem.appendChild(taskTextSpan);

            const restoreBtn = document.createElement('button');
            restoreBtn.classList.add('delete-btn');
            restoreBtn.innerHTML = '↩';
            restoreBtn.addEventListener('click', () => {
                deletedTaskList.removeChild(listItem);
                deletedTasks = deletedTasks.filter(task => task !== taskText);
                const restoredTask = createTaskElement(taskText);
                taskList.appendChild(restoredTask);
            });
            listItem.appendChild(restoreBtn);

            deletedTaskList.appendChild(listItem);
        });
    }
});
