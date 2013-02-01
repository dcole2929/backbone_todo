define([
	'jquery',
	'underscore',
	'backbone'
], function ($, _, Backbone) {

	'use strict';

	var TodoView = Backbone.View.Extend({

		tagName: 'li',

		template: _.template($('#item_template.htm').html()),

		events: {
			'click .toggle': 	'toggleCompleted',
			'dblclick label':	'edit',
			'click .destroy':	'clear',
			'keypress .edit':	'updateOnEnter',
			'blur .edit':		'close'
		},

		initialize: function () {
			// this.listenTo(this.model, 'change', this.render);
			// this.listenTo(this.model, 'destroy', this.remove);
			// this.listenTo(this.model, 'visible', this.toggleVisible);
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));

		},

		toggleVisible: function () {
			this.$el.toggleClass('hidden', this.isHidden());

		},

		isHidden: function () {
			var isCompleted = this.model.get('completed');
			return (//hidden cases only
				(!isCompleted && TodoFIlter === 'completed') 
				|| (isCompleted && TodoFilter === 'active'));
		},


	});

	return TodoView;
});