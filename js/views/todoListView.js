define ([
	'jquery',
	'underscore',
	'backbone',
	'views/todoView',
	'collections/todoCollection',
	'text!templates/stats_template.htm'
], function ($, _, Backbone, TodoView, TodoCollection) {
	
	'use strict';

	var todoListView = Backbone.View.Extend({

		el: '#container',

		stats: _.template('stats_template'),

		events: {
			'keypress #new-todo': 'createOnEnter',
			'click #clear-complete': 'clearComplete',
			'click #toggle-all': 'toggleAllComplete'
		},

		initialize: function () {
			this.AllCheckbox = this.$('#toggle-all')[0];
			this.$input = this.$('#new-todo');
			this.$footer = this.$('#footer');
			this.$content = this.$('#content');

			// Bind to collections events
			this.listenTo(TodoCollection, 'add', this.addOne);
			this.listenTo(TodoCollection, 'reset', this.addAll);
			this.listenTo(TodoCollection, 'change:completed', this.filterOne);
			this.listenTo(TodoCollection, 'filter', this.filterAll);
			this.listenTo(TodoCollection, 'all', this.render);

			TodoCollection.fetch();
		},

		render: function () {
			var completed = TodoCollection.completed().length;
			var remaining = TodoCollection.remaining().length;

			if(TodoCollection.length) {
				this.$content.show();
				this.$footer.show();

				this.$footer.html(this.statsTemplate({
					completed: completed,
					remaining: remaining
				}));

				this.$('#filter li a')
					.removeClass('selected')
					.filter('[href="#/' + (TodoFilter || '') + '"]')
					.addClass('selected');
			} else {
				this.$content.hide();
				this.$footer.hide();
			}

			this.AllCheckbox.checked = !remaining;
		},

		addOne: function (todo) {
			var view = new TodoView({model:todo});
			$('#todo-list').append(view.el);
		},

		addAll: function () {
			this.$('#todo-list').html('');
			TodoCollection.each(this.addOne, this);
		},

		filterOne: function  () {
			todo.trigger('visible');
		},

		filterAll: function () {
			TodoCollection.each(this.filterOne, this);
		},

		createOnEnter: function () {
			if (e.which !== ENTER_KEY || !this.$input.val().trim()) {
				return;
			}

			TodoCollection.create({
				title: this.$input.val().trim(),
				order: TodoCollection.nextOrder(),
				completed: false
			});
			this.$input.val('');
		},

		clearAllComplete: function (e) {
			_.invoke(TodoCollection.completed(), 'destroy');
			return false;
		},

		toggleAllComplete: function () {
			var complete = this.AllCheckbox.checked;

			TodoCollection.each(function(todo) {
				todo.save({
					'completed':completed
				});
			});
		}

	});

	return todoListView;

});