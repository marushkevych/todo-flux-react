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

Dispatcher.on(ActionTypes.ADD, function(itemName){
    todos.push({
        id: uuid.v1(),
        name: itemName,
        completed: false
    });
    model.emit('change');
});

Dispatcher.on(ActionTypes.REMOVE, function(item){
    todos = todos.filter(function(todo){
        return todo.id !== item.id;
    });
    model.emit('change');
});

Dispatcher.on(ActionTypes.CLEAR, function(){
    todos = todos.filter(function(todo){
        return !todo.completed;
    });   
    model.emit('change');
});

Dispatcher.on(ActionTypes.TOGGLE, function(item){
    item.completed = !item.completed;   
    model.emit('change');
});

Dispatcher.on(ActionTypes.TOGGLE_ALL, function(isCompleted){
    todos.forEach(function(todo){
        todo.completed = isCompleted;
    });
    model.emit('change');
});

