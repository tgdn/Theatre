
var classNames = require('classnames');

rviews.TabArea = React.createClass({

    getInitialState: function() {
        return {
            active: false
        }
    },

    propTypes: {
        id: React.PropTypes.string,
        active: React.PropTypes.bool,
        onTabChange: React.PropTypes.func,
        onTabWillChange: React.PropTypes.func

    },

    getDefaultProps: function() {
        return {
            active: false,
            onTabChange: function(e, current, previous) {
                console.debug(e);
            },
            onTabWillChange: function(e, current, previous) {
                console.debug(e);
            }
        };
    },

    onTabShown: function(e) {
        // on shown
        var current = e.target;
        var prev = e.relatedTarget;

        this.props.onTabChange(e, current, prev);
    },

    onTabShow: function(e) {
        // before next is shown
        var current = e.target;
        var prev = e.relatedTarget;

        this.props.onTabWillChange(e, current, prev);
    },

    componentDidMount: function() {
        // get tab link
        this.tab = $('[data-target=#' + this.props.id + ']');

        this.tab.on('show.bs.tab', this.onTabShow);
        this.tab.on('shown.bs.tab', this.onTabShown);

        //React.findDOMNode().addEventListener();
        //React.findDOMNode().addEventListener();
    },

    componentWillUnMount: function() {
        this.tab.off('show.bs.tab', this.onTabShow);
        this.tab.off('shown.bs.tab', this.onTabShown);

        //React.findDOMNode().removeEventListener();
        //React.findDOMNode().removeEventListener();
    },

    render: function() {

        var classes = classNames('tab-container',
        {
            'active': this.state.active
        });

        return (
            <div role={"tabpanel"} className={classes} id={this.props.id}>
                {this.props.children}
            </div>
        );
    }

});
