
class TodoList {
    constructor() {
        this.todos = [];
    }

    addTodo(newTodo) {
        this.todos.push(newTodo);
        controller.renderList();
    }

    deleteAllTodos() {
        this.todos.length = 0;

        db.collection("todos")
            .get()
            .then(res => {
                res.forEach(element => {
                    element.ref.delete();
                });
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

        for (let i = 0; i < completedIds.length; i++) {

            db.collection("todos").doc(`${completedIds[i]}`).delete();
        }

        for (let i = 0; i < this.todos.length; i++) {
            let arr = this.todos;

            function removeElementByStatus(arr, isDone) {
                return arr.filter(e => e.isDone !== true);
            }
            arr = removeElementByStatus(arr, true);
            this.todos = arr;
            controller.renderList();
        }

        hideButtons();
    }

    refreshPage() {

        db.collection("todos").get().then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            for (let i = 0; i<data.length; i++) {
                let value = data[i];
                this.todos.push(new Todo(value.taskText, value.id, value.isDone));
            }
            controller.renderList(ALL_TASK);
            hideButtons();
        });
    }


    findInstanceById(id) {
        return this.todos.find(todo => todo.id == id);
    };

}