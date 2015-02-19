var uuid = require('node-uuid');

var Model = module.exports = function(){
    var todos = [];
    return {
        add: function(todo){
            todos.push({
                id: uuid.v1(),
                name: todo,
                completed: false
            });
        },
        getTasks: function(){
            return todos;
        },
        remove: function(item){
            todos = todos.filter(function(todo){
                return todo.id !== item.id;
            });
        },
        getActiveCount: function(){
            return todos.reduce(function(count, todo){
                return todo.completed ? count : count+=1;
            }, 0);
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
};
