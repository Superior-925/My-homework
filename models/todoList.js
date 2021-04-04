
class TodoList {
    constructor() {
        this.todos = [];
    }

    addTodo(newTodo) {
        this.todos.push(newTodo);
        let dataPost = JSON.stringify(newTodo);

        fetch(`http://${config.development.host}:${config.development.port}/todos`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: dataPost
        });

        controller.renderList();
    }

    deleteAllTodos() {
        this.todos.length = 0;

        fetch(`http://${config.development.host}:${config.development.port}/todos`, {
            method: 'delete',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: ''
        });
        controller.renderList();
    }

    deleteCompletedTodos() {

        function filteringByTrueStatus(arr, isDone) {
            return arr.filter(e => e.isDone == true);
        }

        let completedTodos = filteringByTrueStatus(this.todos, true);
        let completedIds = [];
        completedTodos.forEach(element => completedIds.push(element.id));

        for (let i = 0; i < this.todos.length; i++) {
            let arr = this.todos;

            function removeElementByStatus(arr, isDone) {
                return arr.filter(e => e.isDone !== true);
            }
            arr = removeElementByStatus(arr, true);
            this.todos = arr;
            controller.renderList();
        }

        // request on server for deleting selected todos by sended ids

        fetch(`http://${config.development.host}:${config.development.port}/todos/ids`, {
            method: 'delete',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(completedIds)
        });

        hideButtons();
    }

    refreshPage() {
        fetch(`http://${config.development.host}:${config.development.port}/todos`)
            .then(response => response.json())
            .then(json => {
                for (let i = 0; i<json.length; i++) {
                    let data = json[i];
                    this.todos.push(new Todo(data.taskText, data.id, data.isDone));
                    controller.renderList(ALL_TASK);
                }
                hideButtons();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    findInstanceById(id) {
        return this.todos.find(todo => todo.id == id);
    };

}