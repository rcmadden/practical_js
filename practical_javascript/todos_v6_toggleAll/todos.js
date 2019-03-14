var todoList = {
    todos: [],
    displayTodos: function() {
        if (this.todos.length === 0) {
            console.log('Todo list is empty.')
        } else {
            console.log('My Todos:');
            for (var i = 0; i < this.todos.length; i++) {
                if (this.todos[i].completed === true) {
                    console.log('(x) ', this.todos[i].todoText);
                } else {
                    console.log('( ) ', this.todos[i].todoText);
                }

            }
        }

    },
    addTodos: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
        this.displayTodos();
    },
    toggleCompleted: function(position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
        this.displayTodos();
    },
    toggleAll: function() {
        var completedTodos = 0;
        var totalTodos = this.todos.length;

        // get number of completed todos
        for (var i = 0; i < totalTodos; i++) {
            if (this.todos[i].completed === true) {
                completedTodos++;
            }
        }
        // Case 1: If everything is true, make everything false
        if (completedTodos === totalTodos) {
            for (var j = 0; j < totalTodos; j++) {
                this.todos[j].completed = false;
            }
        } else {
        // Case 2: Otherwise make everything true
            for (var k = 0; k < totalTodos; k++) {
                this.todos[k].completed = true;
                }
            }

        this.displayTodos();
    }
};


