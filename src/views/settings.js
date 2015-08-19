'use strict'

views.Settings = views.Overlay.extend({

    events: {
        "dragover .dropzone": function(e) { console.log('dragover');return false; },
        "dragleave .dropzone": function(e) { return false; },
        "drop .dropzone": "fileDropped",
    },

    fileDropped: function(e) {
        e.preventDefault();
        var file = e.dataTransfer.files[0];
        console.log('File you dragged here is', file.path);
        return false;
    },

    template: _.template(`
    <div class="settings-view">
        <h2>
            Settings
            <button class="btn-close btn th-btn btn-sm pull-right" data-toggle="view">Close</button>
        </h2>

        <div class="form-group">
            <div class="dropzone">
                <i class="fa fa-4 fa-folder-open"></i>
                <h3>Drop folders here to add to movie inspection</h3>
            </div>
        </div>

        <div class="form-group">
            <table class="table">
                <thead>
                    <tr>
                        <th style="width: 80%;">Path</th>
                        <th>Files found</th>
                    </tr>
                </thead>
                <tbody>
                    <% _.each(Settings.filesLocations, function(location) { %>
                    <tr>
                        <td><%= location %></td>
                        <td>unknown</td>
                    </tr>
                    <% }); %>
                </tbody>
            </table>
        </div>
    </div>
    `)

});
