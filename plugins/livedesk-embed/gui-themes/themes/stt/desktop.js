requirejs.config({
	paths: 	{
		'theme': '../../themes/stt/desktop'
	}
});
define([
	'css!theme/liveblog',
	'plugins/wrappup-toggle',
	'plugins/scroll-pagination',
	'plugins/permanent-link',
	'plugins/user-comments'
], function(){
});