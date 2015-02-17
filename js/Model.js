var Model = module.exports = function(){
    var todos = [];
    return {
        add: function(todo){
            todos.push({
                id: todos.length,
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
        }
    };
}

