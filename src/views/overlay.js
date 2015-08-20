'use strict'

views.Overlay = Backbone.View.extend({

    tagName: 'div',
    className: 'overlay-view',
    id: util.guid(),
    template: _.template(''),

    render: function() {
        // TODO add attributes
        this.$el.html(this.template(global));
        return this;
    }
});
