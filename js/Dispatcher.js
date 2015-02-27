
var callbacks = [];
var Dispatcher = module.exports =  {
    register: function (callback) {
        callbacks.push(callback);
    },
    dispatch: function (actionType, payload) {
        callbacks.forEach(function(callback){
            callback({
                actionType: actionType,
                payload: payload
            });
        });
    }
};

