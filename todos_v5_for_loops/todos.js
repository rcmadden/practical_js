// .displayTodos should show .todoText
// .displayTodos should tell you if .todos is empty
// .displayTodos should show .completed

var todoList = {
    todos: [],
    displayTodos: function() {
        var todo = this.todos;
        if (todo.length === 0) {
            console.log('You have NO Todos');
        } else {
            for (var i = 0; i < todo.length; i++) {
                if (todo[i].completed === true) {
                    console.log('(x) ', todo[i].todoText);
                } else {
                    console.log('( ) ', todo[i].todoText);
                }
            }
        }
    },
    addTodos: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
        this.displayTodos()
    },
    changeTodo: function(position, newTodo) {
        this.todos[position].todoText = newTodo;
        this.displayTodos();
    },
    toggleCompleted: function(position) {
        var todo = this.todos[position];
        // this.todos[position].completed = !this.todos[position].completed;
        todo.completed = !todo.completed;
        this.displayTodos();
        
    }

};