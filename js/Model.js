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
        toggleAll: function(completed){
            console.log(completed)
            for(var i=0; i<todos.length; i++){
                todos[i].completed = completed;
            }
            
        }
    };
};
