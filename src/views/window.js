'use strict'

var ipc = require('ipc');
var remote = require('remote');
var events = require('events');
var titlebar = require('titlebar');
var Menu = remote.require('menu');
var appmenu_template = require('./menus').appmenu_template;

views.Window = Backbone.View.extend({

    el: $('body'),
    titlebar_el: '#titlebar',
    current: null,

    use_titlebar: process.platform !== 'win32',
    titlebar: titlebar(),
    titlebar_ready: false,

    titlebar_inner_template: _.template(`
        <!--<div class="title">
            <%= title %>
        </div>-->
        <!--<button class="btn btn-info btn-sm add-folder">
            Add folders
        </button>-->
    `),

    fullscreen: false,

    attributes: {
        'title': 'Theatre',
    },

    events: {
        "dblclick #titlebar .add-folder": "addFolderDblClick",
        "click #titlebar .add-folder": "addFolderClick",
        "click *[data-toggle=view]": "openView",
    },

    initialize: function() {
        var _this = this;

        this.content = $('.main-window-region');
        this.$content = $(this.content);

        this.on('rendering', function() {
            console.log('yes -rendering')
        })

        this.model.on('change:current', function() {
            _this.render();
        });
        //this.model.bind('add', this.viewAdded, this);
        //this.model.bind('remove', this.viewRemoved, this);

        //this.setupTitlebar();
        this.setupMenus();
        this.setupEvents();

        this.render();
    },

    render: function() {

        this.trigger('rendering');

        // content
        var view = null;
        var oldView = this.current;
        var current = this.model.getCurrent();

        if (current != null) {
            view = current.view;
        }
        this.current = view;

        if (oldView != null && oldView != view) {
            $('#' + oldView.id).remove();
        }

        // nothing needs to change
        if (oldView === view || view == null) {
            return this;
        }

        // when a new view is displayed
        // remove previous view from DOM

        // render and append view to DOM
        view.render();
        this.$content.append(view.$el.prop('outerHTML'));
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

    openView: function(e) {
        var target = e.currentTarget;
        var view_key = $(target).attr('data-view') || null;
        this.setCurrent(view_key);
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
