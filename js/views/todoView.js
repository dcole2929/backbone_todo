define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/item_template.htm'
], function ($, _, Backbone, item_template) {

	'use strict';

	var TodoView = Backbone.View.Extend({

		tagName: 'li',

		template: _.template(item_template),

		events: {
			'click .toggle': 	'toggleCompleted',
			'dblclick label':	'edit',
			'click .destroy':	'clear',
			'keypress .edit':	'updateOnEnter',
			'blur .edit':		'close'
		},

		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
			this.listenTo(this.model, 'visible', this.toggleVisible);
			this.render();
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass('completed', this.model.get('completed'));
			this.toggleVisible();
			this.$input = this.$('.edit');
		},

		toggleVisible: function () {
			this.$el.toggleClass('hidden', this.isHidden());

		},

		isHidden: function () {
			var isCompleted = this.model.get('completed');
			return (//hidden cases only
				(!isCompleted && TodoFilter === 'completed') 
				|| (isCompleted && TodoFilter === 'active'));
		},

		toggleCompleted: function () {
			this.model.toggle();
		},

		edit: function () {
			this.$el.addClass('editing');
			this.$input.focus();
		},

		close: function () {
			var value = this.$input.val().trim();
			if(value) {
				this.model.save({title: value});
			} else {
				this.clear();
			}

			this.$el.removeClass('editing');
			delete this.$el;
			delete this.el;
		},

		updateOnEnter: function (e) {
			if (e.which === ENTER_KEY) {
				this.close();
			}
		},

		clear: function () {
			this.model.destroy();
		}


	});

	return TodoView;
});