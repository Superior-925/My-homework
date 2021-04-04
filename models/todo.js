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

            db.collection("todos").doc(`${id}`).update({
                isDone : currentTodo.isDone
            });

            controller.renderList();
            evt.stopPropagation();
        });
    }
}

