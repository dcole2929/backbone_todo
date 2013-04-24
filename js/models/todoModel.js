// Filename: models/todoModel
define([
	'underscore',
	'backbone',
	'collections/TodoCollections'
], function (_, Backbone){
	
	'use strict';

	var TodoModel = Backbone.Model.extend({

		urlRoot: '/todos',

		defaults: {
			title: '',
			order: TodoCollections.nextOrder(),
			completed: false
		},

		toggle: function () {
			this.save({
				completed: !this.get('completed');
			});
		}

	});

	return TodoModel;

});