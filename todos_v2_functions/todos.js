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
