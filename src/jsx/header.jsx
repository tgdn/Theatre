
rviews.Header = React.createClass({

    search_value: "",

    componentDidMount: function() {
        document.addEventListener('keydown', this.onKeyDown);
    },

    componentWillUnMount: function() {
        document.removeEventListener('keydown', this.onKeyDown);
    },

    onKeyDown: function(e) {
        // focus search
        // NOTE: if we add shortcuts this will have to be changed
        //React.findDOMNode(this.refs.searchInput).focus();
    },

    handleSearch: function(e) {
        var val = e.target.value;

        if (this.search_value != val) {
            this.search_value = val;
            console.debug("Searching for \"" + val + "\"");
        }
    },

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
                    <li className="settings-tab-list-item">
                        <a className="settings" data-toggle="tab" data-target="#settings-container"><i className="fa fa-cog"></i></a>
                    </li>
                </ul>

                <ul className="header-nav pull-right">
                    <li className="form">
                        <input type="text" onKeyUp={this.handleSearch} ref="searchInput" placeholder="Search" className="form-control input-sm" name="q" />
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

                    <li className="settings-ghost-list-item">
                        <a className="settings" data-toggle="tab" data-target="#settings-container"><i className="fa fa-cog"></i></a>
                    </li>
                </ul>

                <div className="clearfix"></div>
            </div>


        )
    }

});
