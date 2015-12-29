
var classNames = require('classnames');

rviews.VideoGrid = React.createClass({

    getInitialState: function() {
        return {
            objects: []
        }
    },

    render: function() {

        var videoNodes = this.props.data.map(function(video) {
            return (
                <rviews.VideoRow data={video} />
            );
        });

        return (
            <ul className="video-grid">

            </ul>
        )
    }

});
