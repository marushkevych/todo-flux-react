var Header = React.createFactory(require('./Header'));
var TodoList = React.createFactory(require('./TodoList'));
var Model = require('./Model');

var DOM = React.DOM;

var TodoApp = React.createClass({displayName: "TodoApp",
    getInitialState: function () {
        var model = new Model();
        return {model: model};
    },
    addTodo:function(todo){
        this.state.model.add(todo);
        this.setState(this.state);
    },
    onDestroy: function(item){
        this.state.model.remove(item);
        this.setState(this.state);
    },
    render: function() {
        return DOM.div(null,
            Header({addTodo: this.addTodo}),
            TodoList({
                model: this.state.model,
                onDestroy: this.onDestroy,
            })
            
        );

    }
});

module.exports = TodoApp;