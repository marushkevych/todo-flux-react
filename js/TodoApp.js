var Header = React.createFactory(require('./Header'));
var TodoList = React.createFactory(require('./TodoList'));


var model = require('./Model');

var DOM = React.DOM;

function getTodoState() {
  return {
    allTodos: model.getTasks()
  };
}

var TodoApp = React.createClass({displayName: "TodoApp",
    getInitialState: function () {
        return getTodoState();
    },
    componentDidMount: function() {
        model.addChangeListener(this.onChange);
    },
    onChange: function() {
        this.setState(getTodoState());
    },
    
    render: function() {
        return DOM.div(null,
            Header(),
            TodoList()
        );

    }
});

module.exports = TodoApp;