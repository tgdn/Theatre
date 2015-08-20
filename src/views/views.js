'use strict'

var fs = require('fs');

var hideNonImdb = false;

views.FilmRow = Backbone.View.extend({

    tagName: 'li',
    className: 'film-row',

    events: {
    },

    template: _.template(`
        <div class="poster">
            <% if (poster != "") { %>
            <img src="<%= poster %>">
            <% } %>
        </div>
        <span class="title"><%= displayTitle %></span>
    `),

    initialize: function() {
        this.render();
        this.setupEvents();
    },

    render: function() {

        // hide the ones with no imdb
        //this.$el.toggleClass('hidden', (!this.model.get('imdb') && hideNonImdb))

        this.$el.html(this.template(this.model.attributes));
        return this;
    },

    setupEvents: function() {
        var _this = this;
        this.model.bind('change', function() {
            _this.render();
        });
    }

});
