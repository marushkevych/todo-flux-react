var uuid = require('node-uuid');
var Dispatcher = require('./Dispatcher');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('./ActionTypes');


var todos = [];

/**
 * Class Model extends  EventEmitter
 */
util.inherits(Model, EventEmitter);
function Model(){
    EventEmitter.call(this);
}

Model.prototype.getTasks = function(){
    return todos;
};

Model.prototype.getActiveCount = function(){
    return todos.reduce(function(count, todo){
        return todo.completed ? count : count+=1;
    }, 0);
};

Model.prototype.getCompletedCount = function(){
    return todos.reduce(function(count, todo){
        return todo.completed ? count+=1 : count;
    }, 0);
};

Model.prototype.addChangeListener = function (callback) {
    this.on('change', callback);
};
            
var model = module.exports = new Model();

Dispatcher.register(function(action){
    switch (action.actionType) {
        case ActionTypes.ADD:
            handlers.add(action.payload);
            model.emit('change');
            break;
        case ActionTypes.REMOVE:
            handlers.remove(action.payload);
            model.emit('change');
            break;
        case ActionTypes.CLEAR:
            handlers.clearCompleted();
            model.emit('change');
            break;
        case ActionTypes.TOGGLE:
            handlers.toggle(action.payload);
            model.emit('change');
            break;
        case ActionTypes.TOGGLE_ALL:
            handlers.toggleAll(action.payload);
            model.emit('change');
            break;
        case ActionTypes.REFRESH:
            model.emit('change');
            break;
    }
})

var handlers = {
    add: function(todo){
        todos.push({
            id: uuid.v1(),
            name: todo,
            completed: false
        });
    },
    remove: function(item){
        todos = todos.filter(function(todo){
            return todo.id !== item.id;
        });
    },
    clearCompleted: function(){
        todos = todos.filter(function(todo){
            return !todo.completed;
        });
    },
    toggle: function(item){
        item.completed = !item.completed;
    },
    toggleAll: function(completed){
        todos.forEach(function(todo){
            todo.completed = completed;
        });

    }
};
