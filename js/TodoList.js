var TodoItem = React.createFactory(require('./TodoItem'));

var DOM = React.DOM;

var TodoList = React.createClass({displayName: "TodoList",
    render: function() {
        var props = this.props;
        return DOM.section({id:'main'},
            DOM.ul({id:"todo-list"},
                this.props.todos.getTasks().map(function(todo){
                    return TodoItem({
                        item: todo, 
                        onToggle: props.onToggle,
                        onDestroy: props.onDestroy,
                        onUpdate: props.onUpdate,
                        key: todo.id
                    });
                })
            )
        );

    }
});

module.exports = TodoList;