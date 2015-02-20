
var DOM = React.DOM;

var Footer = React.createClass({displayName: "Footer",
    render: function() {
        var clearElement = this.props.todos.getCompletedCount() ? DOM.button({id:"clear-completed"}, "Clear completed" ) : null;
        return DOM.footer({id:"footer"},
            DOM.span({id:"todo-count"},
                DOM.strong(null, getCountText(this.props.todos))
            ),
            DOM.ul({id:"filters"},
                DOM.li(null,
                    DOM.a({href:"#/", className:"selected"}, "All")
                ),
                DOM.li(null,
                    DOM.a({href:"#/active", className:""}, "Active")
                ),
                DOM.li(null,
                    DOM.a({href:"#/completed", className:""}, "Completed")
                )
            ),
            clearElement
        );

    }
});

module.exports = Footer;

function getCountText(model){
    var count = model.getActiveCount();
    return count === 1 ? "1 item left" : count + " items left";
}