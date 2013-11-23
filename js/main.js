require.config({
	paths: {
		jquery: 'libs/jquery-1.8.3',
		mockjax: 'libs/jquery.mockjax',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone'
	},

	shim: {
		"backbone": {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},
		"mockjax" : {
			deps: ['jquery'],
			exports: 'Mockjax'
		}
	}
});

require(['app'], function (App){
	App.initialize();
});