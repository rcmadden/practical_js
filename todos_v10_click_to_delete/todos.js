var todoList = {
    todos: [],
    addTodo: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    toggleCompleted: function(position) {
        var todo = this.todos;
        todo[position].completed = !todo[position].completed;
    },
    deleteTodo: function(position) {
        this.todos.splice([position], 1);
    },
    changeTodo: function(position, todoText) {
        this.todos[position].todoText = todoText;
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
        }
};

handlers = {
    toggleAll: function() {
        todoList.toggleAll();
        view.displayTodos();
    },
    addTodo: function() {
        var addTodoTextInput = document.getElementById('addTodoTextInput');
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = '';
        view.displayTodos();
    },
    changeTodo: function() {
        var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
        var changeTodoTextInput = document.getElementById('changeTodoTextInput');
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoPositionInput.value = '';
        changeTodoTextInput.value = '';
        view.displayTodos();
    },
    deleteTodo: function() {
        var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
        todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
        deleteTodoPositionInput.value = '';
        view.displayTodos();
    },
    toggleCompleted: function() {
        var toggleCompletedInput = document.getElementById('toggleCompletedInput');
        todoList.toggleCompleted(toggleCompletedInput.valueAsNumber);
        toggleCompletedInput.value = '';
        view.displayTodos();
    }

};

var view = {
   displayTodos: function() {
    // There should be an li for every item
       var todosUl = document.querySelector('ul');
         // clearing toddosUl here clears the content from first time called
        // does not remain when function is called again.
       todosUl.innerHTML = '';
       for (var i = 0; i < todoList.todos.length; i++) {
           var todoLi = document.createElement('li');
           var todo = todoList.todos[i];
           var todoTextWithCompletion = '';

           if (todo.completed === false ) {
               todoTextWithCompletion = '( ) ' + todo.todoText;
             } else {
               todoTextWithCompletion = '(x) ' + todo.todoText;
           }

           todoLi.textContent = todoTextWithCompletion;
           // There should be a delete button for each todos
           todoLi.appendChild(this.createDeleteButton());
           todosUl.appendChild(todoLi);
       }
   },
   // There should be a way to create delete buttons
    // Each li should have an id that has the todos position
    // Delted buttons should have access to the todos id
    // Clicking delete should update todoList.todos and the DOM
    createDeleteButton: function() {
       var deleteButton = document.createElement('button');
       deleteButton.textContent = 'Delete';
       deleteButton.className = 'deleteButton';
       return deleteButton;
    }
};
// Each li should contain .todoText
// Each li should show .complteted

