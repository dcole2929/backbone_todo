define([
	'jquery',
	'underscore',
	'backbone',
	'mockjax'
], function ($, _, Backbone, Mockjax)  {

	var mock = Mockjax({
		type: 'GET',
		url: '/todos',
		contentType: 'text/json',
		status: 200,
		proxy: '/mocks/todos.json'
	});

	return mock;


});