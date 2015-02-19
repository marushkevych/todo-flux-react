var cx = React.addons.classSet;
var DOM = React.DOM;

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

module.exports = React.createClass({displayName: "TodoItem",
    onToggle: function(){
        this.props.onToggle(this.state.item);
    },
    onDestroy: function(){
        this.props.onDestroy(this.state.item);
    },
    handleEdit: function(){
        var node = this.refs.editField.getDOMNode();
        this.state.editing = true;
        this.setState(this.state, function(){
            node.focus();
            node.setSelectionRange(node.value.length, node.value.length);
        });
    },
    handleSubmit: function(){
        if(!this.state.editing){
            return;
        }
        var newValue = this.refs.editField.getDOMNode().value;
        if(this.state.item.name !== newValue){
            this.state.item.name = newValue;
            this.state.editing = false;
            this.setState(this.state);
        }else{
            this.cancelEdit();
        }
    },
    cancelEdit: function(){
        this.state.editing = false;
        this.refs.editField.getDOMNode().value = this.state.item.name;
        this.setState(this.state);
    },
    handleKeyDown: function (event) {
        if (event.which === ESCAPE_KEY) {
            this.cancelEdit();
        } else if (event.which === ENTER_KEY) {
            this.handleSubmit();
        }
    },
    getInitialState: function(){
        
        return {item: this.props.item};
    },
    render: function() {
        console.log('item render')
        var classes = cx({
            completed: this.state.item.completed,
            editing: this.state.editing
        });
        return DOM.li({className: classes},
            DOM.div({className:'view'},
                DOM.input({
                    className:"toggle",
                    type:"checkbox",
                    checked: this.state.item.completed,
                    onChange: this.onToggle
                }),
                DOM.label({onDoubleClick:this.handleEdit}, this.state.item.name),
                DOM.button({className: "destroy", onClick: this.onDestroy})
            ),
            DOM.input({
                ref:"editField",
                className:"edit",
                defaultValue:this.state.item.name,
                onBlur:this.handleSubmit,
//                onChange:this.handleChange,
                onKeyDown:this.handleKeyDown
            })
        );

    }
});
