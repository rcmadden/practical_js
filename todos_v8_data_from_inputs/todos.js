var todoList = {
    todos: [],
    displayTodos: function() {
        var totalTodos = this.todos.length;
        var todo = this.todos;
        if (totalTodos === 0) {
            console.log('Your todo list is empty, yo!')
        } else {
            console.log('My Todos:')
            for (var i = 0; i < totalTodos; i++) {
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
        this.displayTodos();
    },
    toggleCompleted: function(position) {
        var todo = this.todos;
        todo[position].completed = !todo[position].completed;
        this.displayTodos();
    },
    deleteTodo: function(position) {
        this.todos.splice([position], 1);
        this.displayTodos();
    },
    changeTodo: function(position, todoText) {
        this.todos[position].todoText = todoText;
        this.displayTodos();
    },
    toggleAll: function() {
        var todo = this.todos;
        var totalTodos = todo.length;
        var completedTodos = 0;
        // get count of completed todos
        for (var i = 0; i < totalTodos; i++) {
            if (todo[i].completed === true) {
                completedTodos++;
            }
        }
        // Case1 if all are true then make all false
        if (completedTodos === totalTodos) {
                for (var i = 0; i < totalTodos; i++) {
                    todo[i].completed = false;
                }
        // Case2 otherwise make all true
        } else {
            for (var i = 0; i < totalTodos; i++) {
                todo[i].completed = true;
                }
            }
            this.displayTodos();
        }


};


// There should be a "Display Todos" button and a "Toggle all" button in the app

var displayTodosButton = document.getElementById('displayTodosButton');
// console.log(displayTodosButton);
// 2. run displayTodos method when someone clicks display todos button
displayTodosButton.addEventListener('click', function() {
   todoList.displayTodos();
});

// clicking "Toggle all" should run todoList.toggleAll
var toggleAllButton = document.getElementById('toggleAllButton');
toggleAllButton.addEventListener('click', function() {
    todoList.toggleAll();
});

handlers = {
    displayTodos: function() {
        todoList.displayTodos();
    },
    toggleAll: function() {
        todoList.toggleAll();
    }
};
