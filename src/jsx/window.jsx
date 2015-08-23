var Titlebar = require('titlebar-react');

rviews.Window = React.createClass({

    handleClose: function(e) {
        console.log('closing');
    },
    handleMinimize: function(e) {
        console.log('minimize');
    },
    handleMaximize: function(e) {
        console.log('maximize');
    },
    handleFullScreen: function(e) {
        console.log('fullscreen');
    },

    render: function() {
        return (
            <div className="r-win">
                <Titlebar
                    draggable={true}
                    handleClose={this.handleClose}
                    handleMinimize={this.handleMinimize}
                    handleMaximize={this.handleMaximize}
                    handleFullScreen={this.handleFullScreen}>

                    <rviews.Header />
                </Titlebar>
            </div>
        );
    }

});

// React.render(
//     <rviews.Window />,
//     document.getElementById('content')
// );
