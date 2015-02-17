var TodoItem = React.createFactory(require('./TodoItem'));

var DOM = React.DOM;

var TodoList = React.createClass({displayName: "TodoList",
    render: function() {
        var self = this;
        return DOM.section({id:'main'},
            DOM.ul({id:"todo-list"},
                this.props.todos.getTasks().map(function(todo){
                    return TodoItem({
                        item: todo, 
                        onToggle: self.props.onToggle,
                        onDestroy: self.props.onDestroy,
                        key: todo.id
                    });
                })
            )
        );

    }
});

module.exports = TodoList;