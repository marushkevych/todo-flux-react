var TodoItem = React.createFactory(require('./TodoItem'));

var DOM = React.DOM;

var TodoList = React.createClass({displayName: "TodoList",
    onToggle: function(item){
        this.props.todos.toggle(item);
        this.setState({toggled: this.props.todos.getActiveCount() === 0});
    },
    toggleAll: function(event){
        var checked = event.target.checked;
        this.props.todos.toggleAll(checked);
        this.setState({toggled: checked});
    },
    getInitialState: function(){
        return {toggled: this.props.todos.getActiveCount() === 0};
    },
    render: function() {
        console.log('list render')
        var self = this;
        if (this.props.todos.getTasks().length === 0) {
            return null;
        }
        return DOM.section({id:'main'},
            DOM.input({
                id:"toggle-all",
                type:"checkbox",
                onChange:this.toggleAll,
                checked:this.state.toggled
            }),
            DOM.ul({id:"todo-list"},
                this.props.todos.getTasks().map(function(todo){
                    return TodoItem({
                        item: todo, 
                        onDestroy: self.props.onDestroy,
                        onToggle: self.onToggle,
                        key: todo.id
                    });
                })
            )
        );


    }
});

module.exports = TodoList;