'use strict'

models.Window = Backbone.Model.extend({

    attributes: {
        'views': [],
        'current': ''
    },

    // a @view is an Object containing two keys: key and and view
    // view := {
    //     key: "myView",
    //     view: Backbone.View.extend({ })
    // }
    addView: function(view) {
        var views = this.get('views');
        var exists = _.filter(views, function(v) {
            return v.key == view.key;
        }).length != 0;

        if (!exists) {
            views.push(view);
        }

        this.set('views', views);
        return this;
    },

    removeView: function(key) {
        var views = this.get('views');

        views.forEach(function(v) {
            if (v.key == key) {
                // FIXME: check if it fails
                views = _.without(views, v);
            }
        })
        return this;
    },

    setCurrent: function(key) {
        this.set(key);
        return this;
    },

    getView: function(key) {
        var view = null;
        _.each(this.get('views'), function(v) {
            if (v.key == key) view = v;
        });
        return view;
    },

    getCurrent: function() {
        return this.getView(this.get('current'));
    }

});
