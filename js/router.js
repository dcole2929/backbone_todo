definie([
	'jquery',
	'underscore',
	'backbone'
], function ($, _, Backbone) {

	var AppRouter = Backbone.Router.extend({
		routes: {
			'/todos': 'todoList'
		}

	});

	var initialize = function () {
		var app_router = new AppRouter;
		app_router.on('todoLists', function () {
			var todoListView = new TodoListView();
			todoListView.render();
		});

		Backbone.history.start();
	};

	return {
		initialize: initialize
	};

});