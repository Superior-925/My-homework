let addToDoButton = document.getElementById('todo-button');

function getRandomIntInclusive(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}


addToDoButton.onclick = function() {
    let inputValue = document.getElementById('new-todo-input').value;
    if(!inputValue || inputValue.trim().length === 0) {
        alert('Enter the tasks text!');
        return;
    }

    let id = (new Date()).getTime() + getRandomIntInclusive(1, 10000);

    const todo = new Todos(inputValue, id, false);
    todo.addTask();
    let localStorageValue = JSON.stringify(todo);
    localStorage.setItem(id, localStorageValue);
};

const ALL_TASK = 0;
const NOT_COMPLETED_TASK = 1;
const COMPLETED_TASK = 2;

class Todos {

    static todos = [];

    constructor(taskText, id, isDone) {
        this.taskText = taskText;
        this.id = id;
        this.isDone = isDone;
    }

    addTask() {
        Todos.todos.push(this);
        let render = new Render();
        render.renderList();
    }
}

class Render {

    renderList(view = ALL_TASK) {
        // remove all appended todos
        let todos = document.getElementsByClassName('todo-message');
        while (todos.length > 0) todos[0].remove();

        Todos.todos.forEach(function (current) {
            // add container for new to-do
            let textElement;
            let doneButtonElement;
            switch (view) {
                case 0 :
                    textElement = document.createElement('div');
                    textElement.classList.add('todo-message');

                    if(current.isDone) {
                        textElement.setAttribute('data-text-decoration','1');
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
                    break;
                case 1 :
                    textElement = document.createElement('div');
                    textElement.classList.add('todo-message');

                    if(current.isDone) {
                        textElement.setAttribute('data-text-decoration','1');
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
                case 2 :
                    textElement = document.createElement('div');
                    textElement.classList.add('todo-message');

                    if(current.isDone) {
                        textElement.setAttribute('data-text-decoration','1');
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
                        textElement.appendChild(doneButtonElement);}
                    break;
            }
        });

    }

    findInstanceById(id) {
        return Todos.todos.find(todo => todo.id == id);
    }

    deleteCompleted(){
        for (let i = 0; i < Todos.todos.length; i++) {
            let arr = Todos.todos;
            function removeElementByName(arr, isDone){
                return arr.filter( e => e.isDone !== true );
            }
            arr = removeElementByName(arr, true);
            Todos.todos = arr;

            // deleting records in localstorage
            for (let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                let data = JSON.parse(localStorage.getItem(key));
                if (data.isDone == true) {
                    localStorage.removeItem(data.id);
                }
            }
            let newRender = new Render();
            newRender.renderList();
            hideButtons();
        }
    }

}

// change value 'isDone'


document.addEventListener('click',function(e){
    if(!e.target || e.target.className !== 'done-button') {
        return;
    }

    let id = e.target.getAttribute('data-id'); // get id of clicked element

    let findId = new Render();

    let currentTodo = findId.findInstanceById(id);
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

    findId.renderList();
});


//delete selected to-do and hide buttons if not have todos

function hideButtons() {
    if (Todos.todos.length == 0) {
        deleteCompletedButton.setAttribute('button-display', '1');
        deleteAllButton.setAttribute('button-display', '1');
        showAllTodos.setAttribute('button-display', '1');
        showCompletedTodos.setAttribute('button-display', '1');
        showNotCompletedTodos.setAttribute('button-display', '1');
    }
}

let deleteCompletedButton = document.getElementById('delete-completed-button');

deleteCompletedButton.onclick = function () {
         // deleting records in todos array
    let deleteCompleted = new Render();
    deleteCompleted.deleteCompleted();

    // for (let i = 0; i < Todos.todos.length; i++) {
    //     let arr = Todos.todos;
    //     function removeElementByName(arr, isDone){
    //         return arr.filter( e => e.isDone !== true );
    //     }
    //     arr = removeElementByName(arr, true);
    //     Todos.todos = arr;
    //
    //     // deleting records in localstorage
    //     for (let i = 0; i < localStorage.length; i++) {
    //         let key = localStorage.key(i);
    //         let data = JSON.parse(localStorage.getItem(key));
    //         if (data.isDone == true) {
    //             localStorage.removeItem(data.id);
    //         }
    //     }
    //     let newRender = new Render();
    //     newRender.renderList();
    //     hideButtons();
    // }
};

//delete all to-do

let deleteAllButton = document.getElementById('delete-all-button');

deleteAllButton.onclick = function() {
    let deleteTask = document.querySelector('#todo-block');
    deleteTask.textContent = '';
    localStorage.clear();
    Todos.todos.length = 0;
};

// filter - show all to-do

let showAllTodos = document.getElementById('show-all-todos-button');

showAllTodos.onclick =  function () {
    let allTodos = new Render();
    allTodos.renderList();
    //showAllTodos.setAttribute('button-style','1');
};

// filter - show completed to-do

let showCompletedTodos = document.getElementById('show-completed-todos-button');

showCompletedTodos.onclick = function () {

    let completedTasks = new Render();
    completedTasks.renderList(COMPLETED_TASK);

};

// filter - show not completed to-do

let showNotCompletedTodos = document.getElementById('show-not-completed-todos-button');

showNotCompletedTodos.onclick = function () {

    let notCompleted = new Render();
    notCompleted.renderList(NOT_COMPLETED_TASK);

};

// show / hide buttons depending on the state of the local storage
// add todos on display from local storage after refresh the page

function showHideButtons() {
    if (localStorage.length == 0) {
        deleteCompletedButton.setAttribute('button-display', '1');
        deleteAllButton.setAttribute('button-display', '1');
        showAllTodos.setAttribute('button-display', '1');
        showCompletedTodos.setAttribute('button-display', '1');
        showNotCompletedTodos.setAttribute('button-display', '1');
    }
    else {
        deleteCompletedButton.removeAttribute('button-display');
        deleteAllButton.removeAttribute('button-display');
        showAllTodos.removeAttribute('button-display');
        showCompletedTodos.removeAttribute('button-display');
        showNotCompletedTodos.removeAttribute('button-display');
    }
}

document.addEventListener('click', function(e) {
    if(!e.target || e.target.id !== 'todo-button') {
        return;
    }
    showHideButtons();
});

document.addEventListener('click', function(e) {
    if(!e.target || e.target.id !== 'delete-all-button' ) {
        return;
    }
    showHideButtons();
});

function hideButtons () {
    if (localStorage.length == 0) {
        deleteCompletedButton.setAttribute('button-display', '1');
        deleteAllButton.setAttribute('button-display', '1');
        showAllTodos.setAttribute('button-display', '1');
        showCompletedTodos.setAttribute('button-display', '1');
        showNotCompletedTodos.setAttribute('button-display', '1');
    }
}

function refreshPage() {
    for (let i = 0;  i<localStorage.length; i++) {
        let key = localStorage.key(i);
        let data = JSON.parse(localStorage.getItem(key));
        Todos.todos.push(new Todos( data.taskText, data.id, data.isDone));
        let refreshPage = new Render();
        refreshPage.renderList(NOT_COMPLETED_TASK);
    }
}

document.addEventListener('DOMContentLoaded', function (){
    hideButtons();
    refreshPage();
});

//-----------------create drag and drop of elements

document.addEventListener('click', function() {

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