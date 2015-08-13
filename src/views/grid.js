'use strict'

views.Grid = Backbone.View.extend({

    events: {
    },

    ghostTemplate: $('<li/>', {
        class: 'film-row ghost'
    }),

    template: _.template('\
    <% collection.each(function(model) { %>\
        <%= model.view.$el.prop("outerHTML") %>\
    <% }); %>\
    <% for (var i = 0; i < itemsLeft; i++) { %>\
        <%= ghostTemplate.prop("outerHTML") %>\
    <% } %>\
    '),

    initialize: function() {
        var _this = this;

        this.collection.bind('add', function(model) {
            _this.modelAdded(model);
        });
        this.collection.bind('remove', function(model) {
            _this.modelRemoved(model);
        });

        this.render();
        $(window).on('resize', function(e) {
            _this.render()
        });
    },

    modelAdded: function(model) {
        //this.$el.empty();
        this.render();
    },

    modelRemoved: function(model) {
        this.$el.find(model.view.$el).remove();
    },

    getItemsLeft: function() {
        var width = 150;
        var colMargin = 6 + 6;
        var gridPadding = 8 + 8;
        var colWidth = width + colMargin;

        var gridWidth = $('.grid-container.active > ul').width();
        var colsN = parseInt(gridWidth / colWidth);

        return (colsN - (this.collection.length % colsN)) % colsN;
    },

    render: function() {
        var _this = this;
        var itemsLeft = this.getItemsLeft();

        this.$el.html(this.template({
            collection: _this.collection,
            itemsLeft: itemsLeft,
            ghostTemplate: _this.ghostTemplate
        }));

        return this;
    }


});
