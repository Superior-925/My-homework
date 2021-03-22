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