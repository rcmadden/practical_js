var todoList = {
    todos: [],
    displayTodos: function() {
        if (this.todos.length === 0) {
            console.log('Your todolist is empty.')
        } else {
            console.log('My Todos:')
            for (var i = 0; i < this.todos.length; i++) {
                if (this.todos[i].completed === false) {
                    console.log('( ) ',this.todos[i].todoText);
                } else {
                    console.log('(x)', this.todos[i].todoText);
                }

            }
        }
    },
    addTodo: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
        this.displayTodos();
    },
    changeTodo: function(position, newText) {
        this.todos[position].todoText = newText;
        this.displayTodos();
    },
    toggleCompleted: function(position) {
        var todo = this.todos;
        todo[position].completed = !todo[position].completed;
        this.displayTodos();
    },
    toggleAll: function() {
        var totalTodos = this.todos.length;
        var completedTodos = 0;
        // get number of completed todos
        for (var i = 0; i < totalTodos; i++) {
            if (this.todos[i].completed === true) {
                completedTodos++;
                }
        }
        // If everything is true, make everything false
        if (completedTodos === totalTodos) {
            for (var i = 0; i < completedTodos; i++) {
                this.todos[i].completed = false;
            }
        // Otherwise make everything true
        } else {
            for (var i = 0; i < totalTodos; i++) {
                this.todos[i].completed = true;
            }
        }
        this.displayTodos();
    }


};



