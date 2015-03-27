var Dispatcher = require('./Dispatcher');
var ActionTypes = require('./ActionTypes');
var model = require('./Model');

var TodoItem = React.createFactory(require('./TodoItem'));
var Footer = React.createFactory(require('./Footer'));
var Router = require('director').Router;

var DOM = React.DOM;

var TodoList = React.createClass({displayName: "TodoList",

    toggleAll: function(event){
        var checked = event.target.checked;
        Dispatcher.emit(ActionTypes.TOGGLE_ALL, checked);
    },

    getInitialState: function(){
        return {
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
        this.setState({filter: filter});
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
        var self = this;
        if (model.getTasks().length === 0) {
            return null;
        }
        
        var toggled = model.getActiveCount() === 0;
        return DOM.div(null,
            DOM.section({id:'main'},
                DOM.input({
                    id:"toggle-all",
                    type:"checkbox",
                    onChange:this.toggleAll,
                    checked:toggled
                }),
                DOM.ul({id:"todo-list"},
                    model.getTasks().filter(this.filter).map(function(todo){
                        return TodoItem({
                            item: todo, 
                            key: todo.id
                        });
                    })
                ),
                Footer({
                    filter: this.state.filter
                })
            )
        );
    }
});

module.exports = TodoList;

