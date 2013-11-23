// Filename: models/todoModel
define([
	'underscore',
	'backbone',
	'collections/todoCollection'
], function (_, Backbone, TodoCollection){
	
	'use strict';

	var TodoModel = Backbone.Model.extend({

		urlRoot: '/todos',

		defaults: {
			title: '',
			completed: false
		},

		toggle: function () {
			this.save({
				completed: !this.get('completed')
			});
		}

	});

	return TodoModel;

});