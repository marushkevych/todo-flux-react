var Header = React.createFactory(require('./Header'));
var TodoList = React.createFactory(require('./TodoList'));
var Model = require('./Model');

var DOM = React.DOM;

var TodoApp = React.createClass({displayName: "TodoApp",
    getInitialState: function () {
        var model = new Model();
        model.add("do something!");
        return {todos: model};
    },
    addTodo:function(todo){
        this.state.todos.add(todo);
        this.setState(this.state);
    },
    onDestroy: function(item){
        this.state.todos.remove(item);
        this.setState(this.state);
    },
    render: function() {
        console.log('app render')
        return DOM.div(null,
            Header({addTodo: this.addTodo}),
            TodoList({
                todos: this.state.todos,
                onDestroy: this.onDestroy,
            })
            
        );

    }
});

module.exports = TodoApp;