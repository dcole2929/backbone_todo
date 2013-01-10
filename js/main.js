require.config({
	paths: {
		jquery: 'libs/jquery-1.8.3',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone'
	}
});

require(['app'], function (App){
	App.initialize();
});