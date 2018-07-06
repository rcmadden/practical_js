// tooList addTodo should add objects
// todoList changeTodo should change the todoText property
// todoList toggleCompleted should change the completed property
var todoList = {
    todos: [],
    displayTodos: function() {
        console.log(this.todos);
    },
    addTodos: function(newTodo) {
      this.todos.push({
          todoText: newTodo,
          completed: false
      });
      todoList.displayTodos();
  },
    changeTodos: function(position, newTodo) {
        this.todos[position] = newTodo;
        todoList.displayTodos();
    },
    deleteTodos: function(position) {
        this.todos.splice([position], 1);
        todoList.displayTodos();
    },
    toggleCompleted: function(position) {
        debugger;
        // TODO: revisit why this doesn't work after Lesson 6 interlude Data types and comparisons
        // var todoCompleted = this.todos[position].completed; // this assigns the value false to the variable todoCompleted
        // console.log(todoCompleted);
        // todoCompleted = !todoCompleted; // always returns false but works in console?
        // console.log(todoCompleted);

        // todoList.todos[position].completed = !todoList.todos[position].completed;
        var todo = this.todos[position];
        todo.completed = !todo.completed;  // boolean "bang" ! operator returns opposite value
        todoList.displayTodos();
    }
};
// note to self:
// todos is an empty array (it is NOT an object, it does not define todos object attributes)
// addTodos adds objects to the todos array and defines the todos attributes


