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
    addTodo: function(todoText) {
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

handlers = {
    displayTodos: function() {
        todoList.displayTodos();
    },
    toggleAll: function() {
        todoList.toggleAll();
    },
    addTodo: function() {
        var addTodoTextInput = document.getElementById('addTodoTextInput');
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = '';
    },
    changeTodo: function() {
        var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
        var changeTodoTextInput = document.getElementById('changeTodoTextInput');
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoPositionInput.value = '';
        changeTodoTextInput.value = '';
    },
    deleteTodo: function() {
        var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
        todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
        deleteTodoPositionInput.value = '';
    },
    toggleCompleted: function() {
        var toggleCompletedInput = document.getElementById('toggleCompletedInput');
        todoList.toggleCompleted(toggleCompletedInput.valueAsNumber);
        toggleCompletedInput.value = '';
    }

};

var view = {
   displayTodos: function() {
    // There should be an li for every item
       var todosUl = document.querySelector('ul');
       todosUl.innerHTML = '';
       for (var i = 0; i < todoList.todos.length; i++) {
           var todosLi = document.createElement('li');
           if (todoList.todos[i].completed === false ) {
               todosLi.textContent = '( ) ' + todoList.todos[i].todoText;
             } else {
               todosLi.textContent = '(x) ' + todoList.todos[i].todoText;
           }
           todosUl.appendChild(todosLi);
       }
   }
};
// Each li should contain .todoText
// Each li should show .complteted
