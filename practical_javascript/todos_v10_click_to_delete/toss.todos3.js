// there should be a way to store todos
// there should be a way to add todos

var todoList = {
    todos: [],
    addTodo: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
        view.displayTodos();
    },
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
        view.displayTodos();
    }
};

var handlers = {
    addTodo: function() {
        var addTodoInputText = document.getElementById('addTodoInputText');
        todoList.addTodo(addTodoInputText.value);
        addTodoInputText.value = '';
    },
    deleteTodo: function() {
        var deleteTodoInputPosition = document.getElementById('deleteTodoInputPosition');
        todoList.deleteTodo(deleteTodoInputPosition.valueAsNumber);
        deleteTodoInputPosition.value = '';
    }
};

// There should be a way to create delete buttons.
// There should be a delete button for each todos.
// Each li should have an id that has the todos position.
// Delted buttons should have access to the todos id.
// Clicking delete should update todoList.todos and the DOM.

// there should be a way to display todos
var view = {
    displayTodos: function() {
        debugger;
        var todoUl = document.querySelector('ul');
        // todoUl.innerHTML = '';

        // there should be an li for each todos
        for (var i = 0; i < todoList.todos.length; i++) {
            var todo = todoList.todos;
            var todoLi = document.createElement('li');
            todoText = todo[i];
        }
        // each li.textContent should display the todos text
        todoLi.textContent = todoText.todoText;
        console.log(todoList.todos);
        // each Ul should diplay li.texcontent
        todoUl.appendChild(todoLi);
    }
};



