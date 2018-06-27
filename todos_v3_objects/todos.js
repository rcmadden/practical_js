var todoList = {
    todos: ['item1', 'item2'],
    displayTodos: function() {
        console.log(this.todos);
    },
    addTodos: function(newTodo) {
      this.todos.push(newTodo);
      todoList.displayTodos();
    },
    changeTodos: function(position, newTodo) {
        this.todos[position] = newTodo;
        todoList.displayTodos();
    },
    deleteTodos: function(position) {
        this.todos.splice([position], 1);
        todoList.displayTodos();
    }
};



