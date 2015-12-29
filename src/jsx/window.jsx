var ipc = require('ipc');
var Titlebar = require('titlebar-react');

rviews.Window = React.createClass({

    handleClose: function(e) {
        ipc.send('close');
    },
    handleMinimize: function(e) {
        ipc.send('minimize');
    },
    handleMaximize: function(e) {
        ipc.send('maximize');
    },
    handleFullScreen: function(e) {
        ipc.send('maximize');
        // TODO: handle fullscreen
    },

    render: function() {
        return (
            <div>
                <Titlebar
                    draggable={true}
                    handleClose={this.handleClose}
                    handleMinimize={this.handleMinimize}
                    handleMaximize={this.handleMaximize}
                    handleFullScreen={this.handleFullScreen}>

                    <rviews.Header />
                </Titlebar>

                <div className="content">

                    <rviews.TabArea id={'movies-container'}>
                        <div className={'view-default'}>
                            <h2>Movies</h2>
                        </div>
                    </rviews.TabArea>

                    <rviews.TabArea id={'videos-container'}>
                        <div className={'view-default'}>
                            <h2>Videos</h2>
                        </div>
                    </rviews.TabArea>

                    <rviews.TabArea id={'complete-collection-container'}>
                        <div className={'view-default'}>
                            <h2>Complete collection</h2>
                        </div>
                    </rviews.TabArea>

                    <rviews.TabArea id={'settings-container'}>
                        <div className={'view-default'}>
                            <h2>Settings</h2>
                            <p>Lorem ipsum dolor sit amet, eu per civibus officiis. Cu putent mediocrem vel, at aeque graeci tamquam vel, ei liber commune similique eos. Vim in quaeque voluptaria, est nihil dicam alienum ad. Ne qui amet suscipiantur consectetuer, eu duo viris aliquam verterem, quis vituperatoribus mea id.</p><p>Causae rationibus deseruisse ut cum. Sonet diceret fuisset pri no, mucius reprimique cu sea, an graecis deleniti duo. Cu evertitur gloriatur sit, duo melius efficiendi vituperatoribus at. Tritani appareat ocurreret sea ne, per augue epicuri praesent no. Nominati interpretaris ex pro, vim fuisset copiosae at, et quo tamquam sensibus consequuntur. Sea officiis efficiendi eu, mea enim esse mediocritatem id.</p><p>Usu assentior maiestatis ad, eum ex elit graecis dolores, cum eros tamquam appetere an. Cu has omnium elaboraret, est nostrum fastidii ad. Tritani ornatus cu est, quo cu purto corpora dolores. Vim in quis homero omnesque.</p><p>Aliquip eripuit eu quo. Ius invidunt referrentur cu, ut ius feugait ponderum facilisi, eu dolorem molestiae temporibus cum. Aeque ludus audire vix id, nam te dicat appetere incorrupte. Sint utamur percipit in per. Dicit laudem sapientem ad mea, pri in possit scaevola verterem. Erat brute suavitate ex sed.</p><p>Malorum minimum consectetuer nec ne, rebum placerat reprimique no per. Eu animal appetere pericula sed, esse iriure torquatos usu an. Sumo omnium meliore eos eu, sed ei eros dignissim contentiones. Et deleniti invidunt patrioque ius. Offendit scripserit reprehendunt mel ei, eros aperiam blandit ex mea, eum iudico consul pertinax eu.</p><p>Sit at autem partiendo facilisis. Ridens nostrum periculis cum no. Quo blandit adipisci ei. Ei congue euripidis ius. Ex eam ipsum dolorum, ut sed malis falli omittantur. Qui magna tincidunt cu.</p><p>Duo omnium indoctum imperdiet ut, case movet eos in. Duo ea movet oporteat. Sea ei illum omittam. Ad quando saperet per, aeterno labores expetenda an vix. Pri ad audiam deleniti conceptam, pri natum propriae iracundia et, ei posse quaeque mel.</p><p>Libris epicurei his ei. Et mutat blandit efficiantur ius, mei ei noster appellantur neglegentur. Duo brute incorrupte ea, vix alii mnesarchum ei, mel aperiam expetenda adversarium ut. Cu sed consul discere sadipscing. Ex sea magna soleat alienum, eu duis ullum cum, nibh ignota lobortis mei ei.</p><p>Dicat efficiendi est ne, pri tation placerat an. Dictas omnium liberavisse vim ne, quod fabellas per in. Duo no quot saepe admodum. His copiosae mediocrem maluisset at, veritus consetetur theophrastus sit no. His enim eruditi ut. Dicant philosophia et eam. Est wisi consul alienum ex, dico melius mediocrem no mea, nec an doctus disputationi.</p><p>Vim cu novum nemore viderer, vix insolens petentium ad, viris utamur vis ex. Mei odio graecis eu, ea homero debitis complectitur per. Nulla dicam tractatos vim ut. Latine principes ei sea, te cum lorem referrentur. Cum omnes graecis id. Vix esse elit rebum ne.</p><p>Usu brute dicam consul ad, an illum dolorum lobortis mel. Tation eligendi partiendo cu his, porro percipit per no. Sea ea altera interpretaris, sed clita sensibus eu. Lorem dicant ponderum eam ad, id diam vidisse phaedrum eam, ad regione scaevola vis.</p><p>Vero accumsan apeirian vis ut, an cum saepe ponderum. Usu graeci nonumes antiopam at, ad adhuc tibique ocurreret eam. Autem partem aeterno pro in. Pri scaevola placerat vituperatoribus no, id usu ludus bonorum.</p>
                        </div>
                    </rviews.TabArea>
                </div>
            </div>
        );
    }

});

// React.render(
//     <rviews.Window />,
//     document.getElementById('content')
// );
