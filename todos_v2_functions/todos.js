// It should have a place to store todos
var todos = ['item1', 'item2'];
// It should have a function to display todos
function displayTodos() {
    console.log(todos);
}
// It should have a function to add new todos
function addTodo(newTodo) {
    todos.push(newTodo);
}
// It should have a function to delete a todo
function deleteTodo(position) {
    todos.splice(position, 1);

}
var myName = 'Russia';
function sayName() {
	var secret = 'watchandcode';
	console.log(myName);
}

// if you're outside of a function (sayName) you can look out and see data.
// BUT if you are outside you CANNOT look inside.

// sayName();
// conosle.log(secret); //ReferenceError: secret is not defined

// circles and arrows on paper
//    circle around function
//    arrows only go out from circle (arrows don't point into circles)
//    this is variable scope