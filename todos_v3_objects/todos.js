// It should store the todos array on an object
var todoList = {
    todos: ['item1', 'item2'],
    // It should have a displayTodos method
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

// TODO: understand objects and keyword this
var russia = {
    name: 'Russia', // name property is an empty string?
    sayName: function () {
        debugger;
        console.log(this); // prints the entire object
        console.log(name); // empty string/line? why no variable not defined error?
        console.log(this.name); // prints 'Russia' this refers to the Russia.name property value?
        console.log(russia.name); // prints 'Russia' same as above
    }
};

// name and sayName are object properties
// sayName is a function on an object which is called a method