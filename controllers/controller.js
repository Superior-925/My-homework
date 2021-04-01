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

            showHideButtons();
        });
    };

    deleteAll() {

        // deleting all records in todos array
        let deleteAllButton = document.getElementById('delete-all-button');

        deleteAllButton.addEventListener('click', () => {
            this.todoList.deleteAllTodos();
            showHideButtons();
        });
    }

    deleteCompleted() {
        // deleting completed records in todos array
        let deleteCompletedButton = document.getElementById('delete-completed-button');
        deleteCompletedButton.addEventListener('click', () => {
            this.todoList.deleteCompletedTodos();
        });
    }

    showAll() {
        //filtering displayed tasks
        let showAllTodosButton = document.getElementById('show-all-todos-button');
        showAllTodosButton.addEventListener('click', () => {
            this.todoList.showAllTodos();
        });
    }

    showCompleted() {
        //filtering displayed tasks
        let showCompletedTodosButton = document.getElementById('show-completed-todos-button');
        showCompletedTodosButton.addEventListener('click', () => {
            this.todoList.showCompletedTodos();
        });
    }

    showNotCompleted() {
        //filtering displayed tasks
        let showNotCompletedTodosButton = document.getElementById('show-not-completed-todos-button');
        showNotCompletedTodosButton.addEventListener('click', () => {
            this.todoList.showNotCompletedTodos();
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

    // for (let i = 0;  i<localStorage.length; i++) {
    //     let key = localStorage.key(i);
    //     let data = JSON.parse(localStorage.getItem(key));
    //
    //     if (data.id == id) {
    //         data.isDone = !data.isDone
    //     }
    //     let localStorageValue = JSON.stringify(data);
    //     localStorage.setItem(data.id, localStorageValue);
    // }

    fetch(`http://${config.development.host}:${config.development.port}/changeIsDone`, {
        method: 'post',
        headers: {
            'Content-Type': 'text/plain;charset=UTF-8'
        },
        body: id
    });

    controller.todoList.renderList();
    e.stopPropagation();
});

document.addEventListener('DOMContentLoaded', function (){

    controller.todoList.refreshPage();
});
