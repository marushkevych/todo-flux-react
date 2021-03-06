var Dispatcher = require('./Dispatcher');
var ActionTypes = require('./ActionTypes');

var DOM = React.DOM;

var Header = React.createClass({displayName: "Header",
    keyDown:function(event){
        if(event.keyCode === 13){
            var value = this.refs.newField.getDOMNode().value;
            if(value){
                Dispatcher.emit(ActionTypes.ADD, value);
            }
            this.refs.newField.getDOMNode().value = '';
        }
    },
    render: function() {
        return DOM.header(null,
            DOM.h1(null, "todos"),
            DOM.input({
                id:"new-todo", 
                ref:"newField",
                placeholder:"What needs to be done?", 
                onKeyDown: this.keyDown
            })
        );

    }
});

module.exports = Header;