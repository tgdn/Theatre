
rviews.Header = React.createClass({

    render: function() {
        return (

            <div id="header">
                <ul className="header-nav tabs-list" role="tablist">
                    <li className="active">
                        <a data-toggle="tab" data-target="#movies-container" aria-expanded="true">Movies</a>
                    </li><li>
                        <a data-toggle="tab" data-target="#videos-container">Videos</a>
                    </li>
                    <li>
                        <a data-toggle="tab" data-target="#complete-collection-container">Complete collection</a>
                    </li>
                </ul>

                <ul className="header-nav pull-right">
                    <li className="form">
                        <input type="text" placeholder="Search" className="form-control input-sm" name="q" />
                    </li>
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            Genre
                            <span className="value"></span>
                            <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                            <li><a href="#">Title</a></li>
                            <li><a href="#">Year</a></li>
                            <li><a href="#">Rating</a></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            Sort by
                            <span className="value"></span>
                            <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                            <li><a href="#">Title</a></li>
                            <li><a href="#">Year</a></li>
                            <li><a href="#">Rating</a></li>
                        </ul>
                    </li>
                    <li>
                        <a className="settings" data-view="settings" data-toggle="view"><i className="fa fa-cog"></i></a>
                    </li>
                </ul>

                <div className="clearfix"></div>
            </div>


        )
    }

});
