/*global Handlebars, Router */
'use strict';  // js elimates silent errors, runs faster, elimates use of some future syntax https://mzl.la/1onrGsw

Handlebars.registerHelper('eq', function (a, b, options) { // custom handelbars helper called eq - to show the handlebars template with the class=selected
    return a === b ? options.fn(this) : options.inverse(this); //a & b are equal then show options.fn ( will show the html #selected in the html .filters and pases in this (from the footer tempplate)
}); // options.inverse is not actually used http://handlebarsjs.com/block_helpers.html

var ENTER_KEY = 13; // saves the KeyboardEvent.keyCode to the var
var ESCAPE_KEY = 27 ; // .keyCode is being depreciated : https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode

var util = {
    uuid: function () {
        /*jshint bitwise:false */
        var i, random; // to store the counter, random number for the lopp
        var uuid = ''; // to store the uuid characters after each loop

        for (i = 0; i < 32; i++) {  // sets the loop to run 32 times
            random = Math.random() * 16 | 0;  // bitwise or takes the binary representation of the operands and does magic
            if (i === 8 || i === 12 || i === 16 || i === 20) {  // adds a dash after the first 8 then every 4 characters
                uuid += '-';
            }
            uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);  // conditional (ternary) operator
        } // adds a number or letter to uuid

        return uuid;  // when the loop is finished returns a unique id
    },
    pluralize: function (count, word) {  // passes activeTodosCount and 'item' parameters to the conditional/ternary operator
        return count === 1 ? word : word + 's'; // conditino ? expr1: expr2 if count is 1 return item else return items
    },
    store: function (namespace, data) {  // accepts one parameter (todos-jquery) from init or 2 from render (, the todos array)
        if (arguments.length > 1) { // test to see  if 2 parameters were passed into this function
            return localStorage.setItem(namespace, JSON.stringify(data));   // assigns the values in data to the localStorage todos-jquery array and returns the strigify values
        } else {
            var store = localStorage.getItem(namespace);  // assign the array of objects in localStorage assigned to todos-jquery to this variable
            return (store && JSON.parse(store)) || []; // if store and JSON.parse are true (have values) return the parsed object else return an empty array
        }
    }
};

var App = {  // declares the variable App and assigns it an object with these properties
    init: function () {  // sets up the app with values for these variables
        this.todos = util.store('todos-jquery');  // calls the .store function and passes one parameter and assigns the contents, if any of localStorage to this variable
        // this.todoTemplate = Handlebars.compile($('#todo-template').html()); // gets the html content of the html element with id todo-template and assigns the handelbars compiled template to this variable
        this.todoTemplate = Handlebars.compile((document.getElementById('todo-template').innerHTML));
        // this.footerTemplate = Handlebars.compile($('#footer-template').html());  // gets the html content of the html element with id footer-template and assigns the handelbars compiled template to this variable
        this.footerTemplate = Handlebars.compile((document.getElementById('footer-template').innerHTML));
        // this.bindEvents(); // calls the event listeners
        this.setUpEventListeners();

        new Router({  // uses director js library https://github.com/flatiron/director
            '/:filter': function (filter) {  // /:filter is used as a variable
                this.filter = filter; // takes the filter variable: all, active or complted
                this.render(); // render the app again with the filtered todos
            }.bind(this)  // binds this in the bind call back to the App object (not the Router)
        }).init('/all');  // starts the router at this url
    }, // the preceding pound in the url allows the page to render without doing a full page refresh


    setUpEventListeners: function() {
        var newTodo = document.getElementById('new-todo');
        var toggleAll = document.getElementById('toggle-all');
        var footer = document.getElementById('footer');
        // var clearCompleted = document.getElementById('clear-completed'); // not available?
        var todoList = document.getElementById('todo-list');

        newTodo.addEventListener('keyup', function(event) {
            this.create(event);
        }.bind(this));

        toggleAll.addEventListener('change', function (event) {
            this.toggleAll(event);
        }.bind(this));

        footer.addEventListener('click', function (event) {
            var elementClicked = event.target;
            if (elementClicked.id === 'clear-completed') {
                this.destroyCompleted(event);
            }
        }.bind(this));
        // TODO: be able to explain in the console/debugger why this does NOT work??
        // clearCompleted.addEventListener('click', function (event) {
        //   this.destroyCompleted(event);
        // }.bind(this));

        //  https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

        todoList.addEventListener('change', function (event) {
            var elementClicked = event.target;
            if (elementClicked.className == 'toggle') {
                this.toggle(event);
            }
        }.bind(this));

        todoList.addEventListener('dblclick', function (event) {
            var elementClicked = event.target;
            if (elementClicked.tagName == 'LABEL') { // xTODO: be able to explain in the console/debugger why this does NOT work?? LABEL not label
                this.edit(event);
            }
        }.bind(this));

        todoList.addEventListener('keyup', function (event) {
            var elementClicked = event.target;
            if (elementClicked.className == 'edit') {
                this.editKeyup(event);
            }
        }.bind(this));

        todoList.addEventListener('focusout', function (event) {
            var elementClicked = event.target;
            if (elementClicked.className == 'edit') {
                this.update(event);
            }
        }.bind(this));
        todoList.addEventListener('click', function (event) {
            var elementClicked = event.target;
            if (elementClicked.className == 'destroy') {
                this.destroy(event);
            }
        }.bind(this));

    },
    // bindEvents: function () {  // .bind is a .js method on functions(create, toggle...) , returns a copy of the function with 'this' set to the first argument ('this') passed into .bind()
    // .on is a jquery method that attaches an event handler funtion to the selected element
    // $('#new-todo').on('keyup', this.create.bind(this));  // attaches a copy of the create function bound to this to the new-todo element on a keyup event
    // $('#toggle-all').on('change', this.toggleAll.bind(this)); // attaches a copy of the toggleAll function bound to this to the toggle-all element on a change event
    // $('#footer').on('click', '#clear-completed', this.destroyCompleted.bind(this));  // attaches a copy of the destroyCompleted function bound to this to the footer clear-completed button
    // $('#todo-list')  // applies method chaining to these todo-list elements triggered by these events
    // .on('change', '.toggle', this.toggle.bind(this))  // checkbox input elements with the class of toggle calls toggle bound to this todo item
    // .on('dblclick', 'label', this.edit.bind(this))    // ?label? is a tagName
    // .on('keyup', '.edit', this.editKeyup.bind(this))  // input with the class of edit
    // .on('focusout', '.edit', this.update.bind(this));  // input with the class of edit
    // .on('click', '.destroy', this.destroy.bind(this));// button with destroy class
    // },
    render: function () {
        var todos = this.getFilteredTodos(); // assigns an array of todos based on filter All, Active or Completed to the variable todos
        var todoList = document.getElementById('todo-list');
        var main = document.getElementById('main');
        var toggleAll = document.getElementById('toggle-all');
        var newTodo = document.getElementById('new-todo');

        // $('#todo-list').html(this.todoTemplate(todos));  // sets the html content of each the html element with id todo-list.ul to the todoTemplate(handlebars) for each todo
        document.getElementById('todo-list').innerHTML = this.todoTemplate(todos);  //
        // this.todoTemplate(todos); // this line does the same as above? NOT it passes the handelbars template the todos items/data. todo-list assigns it to the todo-list element that gets rendered
        // $('#main').toggle(todos.length > 0); // jQuery toggle function displays the html element with class of main if their are any todos
        // css display: none if false or
        // htmlMainElement.hidden to true if false
        if (todos.length > 0) {
            main.style.display = 'block';
        };
        // $('#toggle-all').prop('checked', this.getActiveTodos().length === 0); // calls the prop method on the toggle-all elements and sets them to checked if there are no completed todos
        if (this.getActiveTodos().length === 0) {
            toggleAll.checked = true;
        };

        this.renderFooter(); // calls the renderFooter function with this todos object
        // $('#new-todo').focus();  // returns the cursor to the add new todo box
        newTodo.focus();
        util.store('todos-jquery', this.todos); // passes the .store funciton the string todos-jquery and this todos array to be stored in local storage
    },
    renderFooter: function () {
        var todoCount = this.todos.length; // gets number of todos
        var activeTodoCount = this.getActiveTodos().length;
        var footerElement = document.getElementById('footer');

        var template = this.footerTemplate({ // gets the footer template properties
            activeTodoCount: activeTodoCount, // sets count
            activeTodoWord: util.pluralize(activeTodoCount, 'item'), // passes count and word to pluraliz function and assigns result to activeTodoWord
            completedTodos: todoCount - activeTodoCount, // used to determine if clear completed link will be displayed
            filter: this.filter // adds the outline around the html .filter element
        });

        // $('#footer').toggle(todoCount > 0).html(template); // See main ablove -> not quite this -> calls the handelbars html method and passes it the variable template if todoCount > 0 passing the footer object to the toggle function to be rendered
        if (todoCount > 0) {
            var footerElement = document.getElementById('footer');
            footerElement.style.display = 'block';
            footerElement.innerHTML = template;
        } else {
            footerElement.style.display = 'none';
        };
    },
    toggleAll: function (e) {
        var isChecked = e.target.checked;

        this.todos.forEach(function (todo) {  // loops over each item in todos and passes it to the function
            todo.completed = isChecked; // asigns the value of isChecked to each todo's completed property
        });

        this.render();  // calls the render function
    },
    getActiveTodos: function () {
        return this.todos.filter(function (todo) {  // passes each js array.filter returns a new array with all todos that are not completed
            return !todo.completed;  // returns todos that are NOT completed/ARE active
        });
    },
    getCompletedTodos: function () {
        return this.todos.filter(function (todo) {  // passes each todo to the function to be filtered
            return todo.completed;  // returns a new array with todos with completed value of true
        });
    },
    getFilteredTodos: function () {
        if (this.filter === 'active') {  // checks the current filter value for active
            return this.getActiveTodos();  // calls getActiveTodos
        }

        if (this.filter === 'completed') {
            return this.getCompletedTodos();  // returns only the todos in the array with filter prop of completed
        }

        return this.todos;  // if filter is all returns this todos object
    },
    destroyCompleted: function () {
        this.todos = this.getActiveTodos();  // assigns the array returned from getActiveTodos to the variable this.todos
        this.filter = 'all';  // assigns the string all to this.filter
        this.render();  // calls the render function with the remaining items in the array
    },
    indexFromEl: function (el) {  // accepts an element from inside the `.item` div
        // var id = $(el).closest('li').data('id'); // .data-id gets the html5 data-'id' attribute of the el's closest li
        var id = el.closest('li').dataset.id;
        var todos = this.todos;  // assigns the App.todos array to the variable todos
        var i = todos.length;    // assigns the length of this.todos array to the varriable i

        while (i--) { // while i is true(> 0)
            if (todos[i].id === id) { // checks if the id of i matches the id variable we set
                return i;  //  returns the el's corresponding index in the `todos` array
            }
        }
    },
    create: function (e) {  // e is a js keyboard event.  e was = jQuery.Event type keyup triggered on new-todo id
        // var $input = $(e.target); // assigns jQuery wrapped event object? $input = jQuery.fn.init [input#new-todo, context: input#new-todo]
        // var input = e.target;
        // var val = $input.val().trim();  // assigns the trimmed (of white space) value of the object $input to the variable val
        var input = e.target;
        var val = input.value;  // add the trim
        //event.which property holds the value of the keyboard key pressed
        // if the key was not the enter key or not val true is returned and execution stops/waits
        if (e.which !== ENTER_KEY || !val) {
            return;
        }
        // when enter key is entered exection proceeds to line below
        // calls uuid function and assigns it's value to this property
        // assigns the value in val to the title attribute
        // assigns false to the completed attribute
        // if (e.which == ENTER_KEY) {
        this.todos.push({
            uuid: util.uuid(),
            title: val,
            completed: false
        });
        // console.log(this.todos);
        input.value = '';
        // }
        // $input.val('');  // clears the val in the input box on the screen
        this.render();// calls the render function with this todos object
    },
    toggle: function (e) {  // e is the jQuery event a type = change
        var i = this.indexFromEl(e.target);  // calls indexFromEl with input.toggle and assigns its index/position value to the variable i
        this.todos[i].completed = !this.todos[i].completed;  // assigns the completed value of the todo at index i to the opposite value (if true assigns it false)
        this.render();  // calls reneder on this object
    },
    edit: function (e) {   // double click event activates editing mode
                           // var $input = $(e.target).closest('li').addClass('editing').find('.edit');
        var input = e.target.closest('li');
        input.classList.add('editing');
        // var input = (e.target).closest('li');
        // input.className = 'editing';
        // $input.val($input.val()).focus();  // returns focus to the input box value
        // $input.val().focus;  // this line does the same as the line above
        input.value = '';

    },
    // if thes
    editKeyup: function (e) {  // keyup event triggers function and passes the key event parameter in
        if (e.which === ENTER_KEY) {  // if the keyup event which value was 13
            e.target.blur(); // causes the current event to lose focus
        }

        if (e.which === ESCAPE_KEY) {  // if the keyup event which value was 27
            // when I hit escap key the text should not be saved
            // $(e.target).data('abort', true).blur(); // passes?sets? jquery the abort true and calls element to lose focus
            localStorage.setItem('data', 'abort');
            e.target.blur();
        }
    },
    update: function (e) {  // event triggered by focus out on edit class
        var el = e.target;  // assigns input.edit event object to the el variable
        // var $el = $(el);  // wraps the el event target in a jQuery function
        // var val = $el.val().trim();  // assigns val the trimmed jQuery el value
        var val = el.value.trim();

        if (!val) {  // if not val
            this.destroy(e); // call destroy with the e parameter
            return;
        }
        // if ($el.data('abort')) {  // if true: jQurey data element == abort
        // $el.data('abort', false);  // set the abort to false
        if (localStorage.getItem('data') == 'abort') {
            localStorage.setItem('data', '');
        } else {
            this.todos[this.indexFromEl(el)].title = val;  // asign the index.title to the variable val of this todo item
        }

        this.render();
    },
    destroy: function (e) {  // from update accepts the input.edit event object
        this.todos.splice(this.indexFromEl(e.target), 1);  // removes the todo element at this index position
        this.render();
    }
};

App.init();  // calls the init function on App object
