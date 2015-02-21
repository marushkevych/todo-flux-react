var TodoItem = React.createFactory(require('./TodoItem'));
var Footer = React.createFactory(require('./Footer'));
var Router = require('director').Router;

var DOM = React.DOM;

var TodoList = React.createClass({displayName: "TodoList",
    onToggle: function(item){
        this.props.model.toggle(item);
        this.setState({toggled: this.props.model.getActiveCount() === 0});
    },
    toggleAll: function(event){
        var checked = event.target.checked;
        this.props.model.toggleAll(checked);
        this.setState({toggled: checked});
    },
    clearCompleted: function(){
        this.props.model.clearCompleted();
        this.setState({toggled: false});
    },
    getInitialState: function(){
        return {
            toggled: this.props.model.getActiveCount() === 0,
            filter: 'ALL'
        };
    },
    componentWillMount: function(){
        var routes = {
            '/': this.setFilter.bind(this, 'ALL'),
            '/active': this.setFilter.bind(this, 'ACTIVE'),
            '/completed': this.setFilter.bind(this, 'COMPLETED'),
        };

        var router = Router(routes);
        router.init();        
    },
    setFilter: function(filter){
        this.state.filter = filter;
        this.setState(this.state);
    },
    filter: function(item){
        switch(this.state.filter ){
            case 'ACTIVE':
                return item.completed == false;
            case 'COMPLETED':
                return item.completed;
            default:
                return true;
        }
        
    },
    render: function() {
        console.log('list render')
        var self = this;
        if (this.props.model.getTasks().length === 0) {
            return null;
        }
        return DOM.div(null,
            DOM.section({id:'main'},
                DOM.input({
                    id:"toggle-all",
                    type:"checkbox",
                    onChange:this.toggleAll,
                    checked:this.state.toggled
                }),
                DOM.ul({id:"todo-list"},
                    this.props.model.getTasks().filter(this.filter).map(function(todo){
                        return TodoItem({
                            item: todo, 
                            onDestroy: self.props.onDestroy,
                            onToggle: self.onToggle,
                            key: todo.id
                        });
                    })
                ),
                Footer({
                    model: this.props.model,
                    clearCompleted: this.clearCompleted,
                    filter: this.state.filter
                })
            )
        );
    }
});

module.exports = TodoList;

