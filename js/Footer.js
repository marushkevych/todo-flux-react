var Dispatcher = require('./Dispatcher');
var ActionTypes = require('./ActionTypes');
var model = require('./Model');

var cx = React.addons.classSet;
var DOM = React.DOM;

var Footer = React.createClass({displayName: "Footer",
    clearCompleted: function(){
        Dispatcher.emit(ActionTypes.CLEAR);
    },
    render: function() {
        var clearButton = model.getCompletedCount() ? DOM.button({id:"clear-completed", onClick: this.clearCompleted}, "Clear completed" ) : null;
        return DOM.footer({id:"footer"},
            DOM.span({id:"todo-count"},
                DOM.strong(null, getCountText())
            ),
            DOM.ul({id:"filters"},
                DOM.li(null,
                    DOM.a({href:"#/", className:cx({selected: this.props.filter == 'ALL'}) }, "All")
                ),
                DOM.li(null,
                    DOM.a({href:"#/active", className:cx({selected: this.props.filter == 'ACTIVE'}) }, "Active")
                ),
                DOM.li(null,
                    DOM.a({href:"#/completed", className: cx({selected: this.props.filter == 'COMPLETED'})}, "Completed")
                )
            ),
            clearButton
        );

    }
});

module.exports = Footer;

function getCountText(){
    var count = model.getActiveCount();
    return count === 1 ? "1 item left" : count + " items left";
}

