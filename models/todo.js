class Todo {
    constructor(taskText, id, isDone) {
        this.taskText = taskText;
        this.id = id;
        this.isDone = isDone;
    };

    changeIsDone() {
        // changing 'isDone' value
        document.getElementById("todo-block").addEventListener("click", function (evt)
        {
            let id = evt.target.getAttribute('data-id'); // get id of clicked element
            let currentTodo = controller.todoList.findInstanceById(id);
            currentTodo.isDone = !currentTodo.isDone;

            fetch(`http://${config.development.host}:${config.development.port}/todo/id`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'id': id})
            });
            controller.renderList();
            evt.stopPropagation();
        });
    }
}

