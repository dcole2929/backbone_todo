define([
	'jquery',
	'underscore',
	'backbone',
	'views/todoListView'
], function ($, _, Backbone, TodoListView) {

	var AppRouter = Backbone.Router.extend({
		routes: {
			'/todos': 'todoList',
			'*actions': 'defaultAction'
		}

	});

	var initialize = function () {
		var app_router = new AppRouter;
		app_router.on('todoList', function () {
			var todoListView = new TodoListView();
			todoListView.render();

		});

		app_router.on("defaultAction", function(actions) {
			console.log("No route: ", actions);
		});

		Backbone.history.start();
	};

	return {
		initialize: initialize
	};

});