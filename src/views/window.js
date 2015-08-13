'use strict'

var ipc = require('ipc');
var remote = require('remote');
var titlebar = require('titlebar');
var Menu = remote.require('menu');
var appmenu_template = require('./menus').appmenu_template;

views.Window = Backbone.View.extend({


    el: $('body'),
    titlebar_el: '#titlebar',

    content: $('#content'),
    $content: $(this.content),

    use_titlebar: process.platform !== 'win32',
    titlebar: titlebar(),
    titlebar_ready: false,

    titlebar_inner_template: _.template('\
        <div class="title">\
            <%= title %>\
        </div>\
        <!--<button class="btn btn-info btn-sm add-folder">\
            Add folders\
        </button>-->\
    '),

    fullscreen: false,

    attributes: {
        'title': 'Theatre',
    },

    events: {
        "dblclick #titlebar .add-folder": "addFolderDblClick",
        "click #titlebar .add-folder": "addFolderClick",
    },

    initialize: function() {

        this.model.bind('change:current', this.render);

        this.setupTitlebar();
        this.setupMenus();
        this.setupEvents();

        this.render();
    },

    render: function() {

        // content
        var view = this.model.getCurrent();

        if (view != null) {
            view.render();
            this.$content.html(view.$el);
        }

    },

    addFolderDblClick: function(e) {
        console.log('double clicked');
        console.log(e);
        e.preventDefault();
        return false;
    },

    addFolderClick: function(e) {
        console.log('clicked');
    },

    addView: function(key, view) {
        var v = {
            key: key,
            view: view
        };
        this.model.addView(v);
        return this;
    },

    setCurrent: function(key) {
        this.model.setCurrent(key);
    },

    setupTitlebar: function() {
        // title bar
        if (this.use_titlebar && !this.titlebar_ready) {
            $(this.titlebar.element).append(
                this.titlebar_inner_template(this.attributes)
            );
            this.titlebar.appendTo(this.titlebar_el);
            this.titlebar_ready = true;
        }
    },

    setupMenus: function() {
        var appmenu = Menu.buildFromTemplate(appmenu_template);
        Menu.setApplicationMenu(appmenu);
    },

    setupEvents: function() {
        this.titlebar.on('close', function() {
            ipc.send('close');
        });

        this.titlebar.on('minimize', function() {
            ipc.send('minimize');
        });

        this.titlebar.on('maximize', function() {
            ipc.send('maximize');
        });

        this.titlebar.on('fullscreen', function(e) {
            // TODO : make it resizable
            if (this.fullscreen) {
                this.fullscreen = false;
                $('#titlebar')[0].style.display = 'block';
                ipc.send('exit-full-screen');
            } else {
                this.fullscreen = true;
                $('#titlebar')[0].style.display = 'none';
                ipc.send('enter-full-screen');
            }
        });

        $('#header a[data-toggle=tab]').on('show.bs.tab', function(e) {
            var target = e.target;
            var prevTarget = e.relatedTarget;

            var targetId = $(target).attr('data-target');
            var prevTargetId = $(prevTarget).attr('data-target');

            if (targetId == '') {

            } else if (false) {

            }
        });
    }

});
