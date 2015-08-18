'use strict'

views.Settings = views.Overlay.extend({

    template: _.template(`
    <div class="settings-view">
        <h2>Settings</h2>

        <div class="form-horizontal">
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
                </div>
            </div>
            <div class="form-group">
                <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
                </div>
            </div>
        </div>

        <button class="btn btn-default btn-sm pull-right" data-toggle="view">Close</button>
    </div>
    `)

});
