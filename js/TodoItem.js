var cx = React.addons.classSet;
var DOM = React.DOM;

module.exports = React.createClass({displayName: "TodoItem",
    getName: function(){
        return 'TodoItem'
    },
    onToggle: function(){
        this.props.onToggle(this.props.item)
    },
    onDestroy: function(){
        this.props.onDestroy(this.props.item)
    },
    render: function() {
        var classes = cx({
            completed: this.props.item.completed,
            editing: this.props.editing
        });
        return DOM.li({className: classes},
            DOM.div({className:'view'},
                DOM.input({
                    className:"toggle",
                    type:"checkbox",
                    checked: this.props.item.completed,
                    onChange: this.onToggle
                }),
                DOM.label(null, this.props.item.name),
                DOM.button({className: "destroy", onClick: this.onDestroy})
            )
        );

    }
});
