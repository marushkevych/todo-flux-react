var TodoItem = React.createFactory(require('./TodoItem'));

var DOM = React.DOM;

var TodoList = React.createClass({displayName: "TodoList",
    toggleAll: function(event){
        console.log(event)
        var checked = event.target.checked;
        this.props.todos.toggleAll(checked);
        this.setState({toggled: checked});
    },
    render: function() {
        var props = this.props;
        if (this.props.todos.getTasks().length === 0) {
            return null;
        }
        return DOM.section({id:'main'},
            DOM.input({
                id:"toggle-all",
                type:"checkbox",
                onChange:this.toggleAll,
                checked:this.props.todos.getActiveCount() === 0
            }),
            DOM.ul({id:"todo-list"},
                this.props.todos.getTasks().map(function(todo){
                    return TodoItem({
                        item: todo, 
                        onDestroy: props.onDestroy,
                        key: todo.id
                    });
                })
            )
        );


    }
});

module.exports = TodoList;