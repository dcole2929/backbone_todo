// Filename: collections/todos
define([
	'underscore',
	'backbone',
	'models/todoModel'
], function (_, Backbone, TodoModel) {
	'use strict';

	var TodoCollection = Backbone.Collection.extend({

		model: TodoModel,

		completed: function () {
			return this.where({completed: true });
		},

		remaining: function () {
			return this.without.apply(this, this.done());
		},

		nextorder: function() {
			if (!this.length) return 1;
			return this.last().get('order') + 1;
		},

		comparator: 'order'

	});

	return TodoCollection;
});