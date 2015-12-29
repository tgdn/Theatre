
var classNames = require('classnames');

rviews.VideoRow = React.createClass({

    render: function() {

        var poster = "";
        if (this.props.data.poster != "") {
            poster = (
                <img src={this.props.data.poster} />
            );
        }

        return (
            <li className={"film-row"}>
                <div className={"poster"}>
                    {poster}
                </div>
                <span className={"title"}>{this.props.data.displayTitle}</span>
            </li>
        )
    }

});
