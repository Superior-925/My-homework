// document.addEventListener("DOMContentLoaded", function () {
//
//     let newTodoList = new TodoList();
//     let controller = new Controller(newTodoList);
//     //controller.subscribe(); на это не обращать внимания
//     controller.onNewTodo();
//     //controller.changeDone(); на это не обращать внимания
//
//     document.addEventListener('click',function(e){
//         if(!e.target || e.target.className !== 'done-button') {
//             return;
//         }
//         controller.renderLog()
//     });
//
// });


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
    }

    get todoList() {
        return console.log([this.todos]);
    }

    deleteAllTodos() {
        this.todos.length = 0;
        this.renderList();
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
                case 0 :
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
                    doneButtonElement.addEventListener('click', function (e) {
                        let id = e.target.getAttribute('data-id'); // get id of clicked element
                        let currentTodo = controller.todoList.findInstanceById(id);
                        currentTodo.isDone = !currentTodo.isDone;
                        controller.todoList.renderList();
                        controller.todoList.todoList
                    });

                    break;
                case 1 :
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
                        // adding function for change 'isDone' value
                        doneButtonElement.addEventListener('click', function (e) {
                        let id = e.target.getAttribute('data-id'); // get id of clicked element
                        let currentTodo = controller.todoList.findInstanceById(id);
                        currentTodo.isDone = !currentTodo.isDone;
                        controller.todoList.renderList();
                        controller.todoList.todoList
                    });

                    break;
                case 2 :
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
                        textElement.appendChild(doneButtonElement);}
                         // adding function for change 'isDone' value
                        doneButtonElement.addEventListener('click', function (e) {
                        let id = e.target.getAttribute('data-id'); // get id of clicked element
                        let currentTodo = controller.todoList.findInstanceById(id);
                        currentTodo.isDone = !currentTodo.isDone;
                        controller.todoList.renderList();
                        controller.todoList.todoList
                    });

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

        });
    };
}



    let newTodoList = new TodoList();
    let controller = new Controller(newTodoList);
    //controller.subscribe(); на это не обращать внимания
    controller.onNewTodo();

    //controller.changeDone(); на это не обращать внимания

    // document.addEventListener('click',function(e){
    //     if(!e.target || e.target.className !== 'done-button') {
    //         return;
    //     }
    //
    //     //controller.changeIsDone();
    //
    //     let id = e.target.getAttribute('data-id'); // get id of clicked element
    //
    //
    //     let currentTodo = controller.todoList.findInstanceById(id);
    //         currentTodo.isDone = !currentTodo.isDone;
    //         controller.todoList.renderList();
    //
    //         controller.todoList.todoList;
    //     //controller.renderLog()
    // });


let deleteCompletedButton = document.getElementById('delete-all-button');

deleteCompletedButton.onclick = function () {

    // deleting records in todos array
    controller.todoList.deleteAllTodos();

};






