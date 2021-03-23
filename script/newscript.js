
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const ALL_TASK = 0;
const NOT_COMPLETED_TASK = 1;
const COMPLETED_TASK = 2;

class TodoList {
    constructor() {
        this.todos = [];
    }

    addTodo(newTodo) {
        this.todos.push(newTodo);
        let localStorageValue = JSON.stringify(newTodo);
        localStorage.setItem(newTodo.id, localStorageValue);
    }

    deleteAllTodos() {
        this.todos.length = 0;
        localStorage.clear();
        this.renderList();
    }

    deleteCompletedTodos() {
        for (let i = 0; i < this.todos.length; i++) {
            let arr = this.todos;

            function removeElementByName(arr, isDone) {
                return arr.filter(e => e.isDone !== true);
            }

            arr = removeElementByName(arr, true);
            this.todos = arr;

            // deleting records in localstorage
            for (let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                let data = JSON.parse(localStorage.getItem(key));
                if (data.isDone == true) {
                    localStorage.removeItem(data.id);
                }
            }
            this.renderList();
        }
        hideButtons();
    }

    showAllTodos() {
        this.renderList();
    }

    showCompletedTodos() {
        this.renderList(COMPLETED_TASK);
    }

    showNotCompletedTodos() {
        this.renderList(NOT_COMPLETED_TASK);
    }

    refreshPage() {
        for (let i = 0;  i<localStorage.length; i++) {
            let key = localStorage.key(i);
            let data = JSON.parse(localStorage.getItem(key));
            this.todos.push(new Todo(data.taskText, data.id, data.isDone));
            this.renderList(NOT_COMPLETED_TASK);
        }
    }

    renderList(view = ALL_TASK) {
        // remove all appended todos
        let todos = document.getElementsByClassName('todo-message');
        while (todos.length > 0) todos[0].remove();

        this.todos.forEach(function (current) {
            // add container for new to-do
            let textElement;
            let doneButtonElement;
            switch (view) {

                case ALL_TASK :
                    textElement = document.createElement('div');
                    textElement.classList.add('todo-message');

                    if(current.isDone) {
                        textElement.setAttribute('data-text-decoration','text-decoration');
                    }

                    // append a new to-do into container
                    document.getElementById('todo-block').appendChild(textElement);

                    // add button for change isDone property
                    doneButtonElement = document.createElement('button');
                    doneButtonElement.setAttribute('data-id', current.id);
                    doneButtonElement.classList.add('done-button');
                    doneButtonElement.type = 'button';

                    // add to-do text
                    textElement.innerText = current.taskText;

                    // append button into to-do block
                    textElement.appendChild(doneButtonElement);

                    // adding function for change 'isDone' value
                    // doneButtonElement.addEventListener('click', function (e) {
                    //     let id = e.target.getAttribute('data-id'); // get id of clicked element
                    //     let currentTodo = controller.todoList.findInstanceById(id);
                    //     currentTodo.isDone = !currentTodo.isDone;
                    //
                    //     for (let i = 0;  i<localStorage.length; i++) {
                    //         let key = localStorage.key(i);
                    //         let data = JSON.parse(localStorage.getItem(key));
                    //
                    //         if (data.id == id) {
                    //             data.isDone = !data.isDone
                    //         }
                    //         let localStorageValue = JSON.stringify(data);
                    //         localStorage.setItem(data.id, localStorageValue);
                    //     }
                    //
                    //     controller.todoList.renderList();
                    // });

                    break;

                case NOT_COMPLETED_TASK :
                    textElement = document.createElement('div');
                    textElement.classList.add('todo-message');

                    if(current.isDone) {
                        textElement.setAttribute('data-text-decoration','text-decoration');
                    }
                    if(!current.isDone) {
                        // append a new to-do into container
                        document.getElementById('todo-block').appendChild(textElement);

                        // add button for change isDone property
                        doneButtonElement = document.createElement('button');
                        doneButtonElement.setAttribute('data-id', current.id);
                        doneButtonElement.classList.add('done-button');
                        doneButtonElement.type = 'button';

                        // add to-do text
                        textElement.innerText = current.taskText;

                        // append button into to-do block
                        textElement.appendChild(doneButtonElement);}

                    break;

                case COMPLETED_TASK :
                    textElement = document.createElement('div');
                    textElement.classList.add('todo-message');

                    if(current.isDone) {
                        textElement.setAttribute('data-text-decoration','text-decoration');
                    }
                    if(current.isDone) {
                        // append a new to-do into container
                        document.getElementById('todo-block').appendChild(textElement);

                        // add button for change isDone property
                        doneButtonElement = document.createElement('button');
                        doneButtonElement.setAttribute('data-id', current.id);
                        doneButtonElement.classList.add('done-button');
                        doneButtonElement.type = 'button';

                        // add to-do text
                        textElement.innerText = current.taskText;

                        // append button into to-do block
                        textElement.appendChild(doneButtonElement);
                    }
                    break;
            }
        });

    };

    findInstanceById(id) {
        return this.todos.find(todo => todo.id == id);
    };

}

class Todo {
    constructor(taskText, id, isDone) {
        this.taskText = taskText;
        this.id = id;
        this.isDone = isDone;
    };
}


class Controller {
    constructor(todoList) {
        this.todoList = todoList;
    };

    onNewTodo() {
        let addToDoButton = document.getElementById("todo-button");
        addToDoButton.addEventListener('click', () => {
            let inputValue = document.getElementById("new-todo-input").value;
            if (!inputValue || inputValue.trim().length === 0) {
                alert("Enter the tasks text!");
                return;
            }
            let id = new Date().getTime() + getRandomIntInclusive(1, 10000);

            let newTodo = new Todo(inputValue, id, false);

            this.todoList.addTodo(newTodo);

            this.todoList.renderList();
            showHideButtons();
        });
    };

    deleteAll() {

        // deleting all records in todos array
        let deleteAllButton = document.getElementById('delete-all-button');

        deleteAllButton.addEventListener('click',function () {
            controller.todoList.deleteAllTodos();
            showHideButtons();
        });
    }

    deleteCompleted() {
        // deleting completed records in todos array
        let deleteCompletedButton = document.getElementById('delete-completed-button');
        deleteCompletedButton.addEventListener('click', function () {
            controller.todoList.deleteCompletedTodos();
        });
    }

    showAll() {
        //filtering displayed tasks
        let showAllTodosButton = document.getElementById('show-all-todos-button');
        showAllTodosButton.addEventListener('click', function () {
            controller.todoList.showAllTodos();
        });
    }

    showCompleted() {
        //filtering displayed tasks
        let showCompletedTodosButton = document.getElementById('show-completed-todos-button');
        showCompletedTodosButton.addEventListener('click', function () {
            controller.todoList.showCompletedTodos();
        });
    }

    showNotCompleted() {
        //filtering displayed tasks
        let showNotCompletedTodosButton = document.getElementById('show-not-completed-todos-button');
        showNotCompletedTodosButton.addEventListener('click', function () {
            controller.todoList.showNotCompletedTodos();
        });
    }
}

    let newTodoList = new TodoList();
    let controller = new Controller(newTodoList);

    controller.onNewTodo();
    controller.deleteAll();
    controller.deleteCompleted();
    controller.showAll();
    controller.showCompleted();
    controller.showNotCompleted();

    // changing 'isDone' value
    document.addEventListener('click',function(e){
        if(!e.target || e.target.className !== 'done-button') {
            return;
        }

        let id = e.target.getAttribute('data-id'); // get id of clicked element

        let currentTodo = controller.todoList.findInstanceById(id);
            currentTodo.isDone = !currentTodo.isDone;

        for (let i = 0;  i<localStorage.length; i++) {
                        let key = localStorage.key(i);
                        let data = JSON.parse(localStorage.getItem(key));

                        if (data.id == id) {
                            data.isDone = !data.isDone
                        }
                        let localStorageValue = JSON.stringify(data);
                        localStorage.setItem(data.id, localStorageValue);
                    }

            controller.todoList.renderList();
        e.stopPropagation();
    });

//delete selected to-do and hide buttons if not have todos after tap deleteSelectedButton

let deleteCompletedButton = document.getElementById('delete-completed-button');
let deleteAllButton = document.getElementById('delete-all-button');
let showAllTodosButton = document.getElementById('show-all-todos-button');
let showCompletedTodosButton = document.getElementById('show-completed-todos-button');
let showNotCompletedTodosButton = document.getElementById('show-not-completed-todos-button');

function hideButtons() {
    if (controller.todoList.todos.length == 0) {
        deleteCompletedButton.setAttribute('button-display', 'display-none');
        deleteAllButton.setAttribute('button-display', 'display-none');
        showAllTodosButton.setAttribute('button-display', 'display-none');
        showCompletedTodosButton.setAttribute('button-display', 'display-none');
        showNotCompletedTodosButton.setAttribute('button-display', 'display-none');
    }
}
//----------------------------------------

// show / hide buttons depending on the state of the local storage
// add todos on display from local storage after refresh the page

function showHideButtons() {
    if (localStorage.length == 0) {
        deleteCompletedButton.setAttribute('button-display', 'display-none');
        deleteAllButton.setAttribute('button-display', 'display-none');
        showAllTodosButton.setAttribute('button-display', 'display-none');
        showCompletedTodosButton.setAttribute('button-display', 'display-none');
        showNotCompletedTodosButton.setAttribute('button-display', 'display-none');
    }
    else {
        deleteCompletedButton.removeAttribute('button-display');
        deleteAllButton.removeAttribute('button-display');
        showAllTodosButton.removeAttribute('button-display');
        showCompletedTodosButton.removeAttribute('button-display');
        showNotCompletedTodosButton.removeAttribute('button-display');
    }
}

document.addEventListener('DOMContentLoaded', function (){

    controller.todoList.refreshPage();
    hideButtons();

});

//-----------------create drag and drop of elements

let divOfTask = document.getElementById('todo-block');
divOfTask.addEventListener('click', function() {

    // Query the list element
    const list = document.getElementById('todo-block');

    let draggingEle;
    let placeholder;
    let isDraggingStarted = false;

    // The current position of mouse relative to the dragging element
    let x = 0;
    let y = 0;

    // Swap two nodes
    const swap = function(nodeA, nodeB) {
        const parentA = nodeA.parentNode;
        const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

        // Move `nodeA` to before the `nodeB`
        nodeB.parentNode.insertBefore(nodeA, nodeB);

        // Move `nodeB` to before the sibling of `nodeA`
        parentA.insertBefore(nodeB, siblingA);
    };

    // Check if `nodeA` is above `nodeB`
    const isAbove = function(nodeA, nodeB) {
        // Get the bounding rectangle of nodes
        const rectA = nodeA.getBoundingClientRect();
        const rectB = nodeB.getBoundingClientRect();

        return (rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2);
    };

    const mouseDownHandler = function(e) {
        draggingEle = e.target;

        // Calculate the mouse position
        const rect = draggingEle.getBoundingClientRect();
        x = e.pageX - rect.left;
        y = e.pageY - rect.top;

        // Attach the listeners to `document`
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function(e) {
        const draggingRect = draggingEle.getBoundingClientRect();

        if (!isDraggingStarted) {
            isDraggingStarted = true;

            // Let the placeholder take the height of dragging element
            // So the next element won't move up
            placeholder = document.createElement('div');
            placeholder.classList.add('placeholder');
            draggingEle.parentNode.insertBefore(placeholder, draggingEle.nextSibling);
            placeholder.style.height = `${draggingRect.height}px`;
        }

        // Set position for dragging element
        draggingEle.style.position = 'absolute';
        draggingEle.style.top = `${e.pageY - y}px`;
        draggingEle.style.left = `${e.pageX - x}px`;

        // The current order
        // prevEle
        // draggingEle
        // placeholder
        // nextEle
        const prevEle = draggingEle.previousElementSibling;
        const nextEle = placeholder.nextElementSibling;

        // The dragging element is above the previous element
        // User moves the dragging element to the top
        if (prevEle && isAbove(draggingEle, prevEle)) {
            // The current order    -> The new order
            // prevEle              -> placeholder
            // draggingEle          -> draggingEle
            // placeholder          -> prevEle
            swap(placeholder, draggingEle);
            swap(placeholder, prevEle);
            return;
        }

        // The dragging element is below the next element
        // User moves the dragging element to the bottom
        if (nextEle && isAbove(nextEle, draggingEle)) {
            // The current order    -> The new order
            // draggingEle          -> nextEle
            // placeholder          -> placeholder
            // nextEle              -> draggingEle
            swap(nextEle, placeholder);
            swap(nextEle, draggingEle);
        }
    };

    const mouseUpHandler = function() {
        // Remove the placeholder
        placeholder && placeholder.parentNode.removeChild(placeholder);

        draggingEle.style.removeProperty('top');
        draggingEle.style.removeProperty('left');
        draggingEle.style.removeProperty('position');

        x = null;
        y = null;
        draggingEle = null;
        isDraggingStarted = false;

        // Remove the handlers of `mousemove` and `mouseup`
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    // Query all items
    [].slice.call(list.querySelectorAll('.todo-message')).forEach(function(item) {
        item.addEventListener('mousedown', mouseDownHandler);
    });
});
