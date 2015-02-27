var Dispatcher = require('./Dispatcher');
var ActionTypes = require('./ActionTypes');

var cx = React.addons.classSet;
var DOM = React.DOM;

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

module.exports = React.createClass({displayName: "TodoItem",
    getInitialState: function () {
        return {editing:false};
    },
    onToggle: function(){
        Dispatcher.dispatch(ActionTypes.TOGGLE, this.props.item);
    },
    onDestroy: function(){
        Dispatcher.dispatch(ActionTypes.REMOVE, this.props.item);
    },
    handleEdit: function(){
        var node = this.refs.editField.getDOMNode();
        this.setState({editing:true}, function(){
            node.focus();
            node.setSelectionRange(node.value.length, node.value.length);
        });
    },
    handleSubmit: function(){
        if(!this.state.editing){
            return;
        }
        var newValue = this.refs.editField.getDOMNode().value;
        if(this.props.item.name !== newValue){
            this.props.item.name = newValue;
//            Dispatcher.dispatch(ActionTypes.REFRESH);
            this.setState({editing:false});
        }else{
            this.cancelEdit();
        }
    },
    cancelEdit: function(){
        this.refs.editField.getDOMNode().value = this.props.item.name;
        this.setState({editing:false});
    },
    handleKeyDown: function (event) {
        if (event.which === ESCAPE_KEY) {
            this.cancelEdit();
        } else if (event.which === ENTER_KEY) {
            this.handleSubmit();
        }
    },
    render: function() {
        var classes = cx({
            completed: this.props.item.completed,
            editing: this.state.editing
        });
        return DOM.li({className: classes},
            DOM.div({className:'view'},
                DOM.input({
                    className:"toggle",
                    type:"checkbox",
                    checked: this.props.item.completed,
                    onChange: this.onToggle
                }),
                DOM.label({onDoubleClick:this.handleEdit}, this.props.item.name),
                DOM.button({className: "destroy", onClick: this.onDestroy})
            ),
            DOM.input({
                ref:"editField",
                className:"edit",
                defaultValue:this.props.item.name,
                onBlur:this.handleSubmit,
//                onChange:this.handleChange,
                onKeyDown:this.handleKeyDown
            })
        );

    }
});
