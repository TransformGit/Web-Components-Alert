require.config({
	paths: {
		jquery: 'jquery/jquery.min'
	}
})
define(['jquery'], function($){
	function Window(){
		this.config = {
			width: 500,
			height: 300,
			title: '系统消息',
			content: '',
			alertBtnText: '确定',
			handler: null,
			hasCloseBtn: false,
			skinClassName: null,
			hasMask: true
		}
	}
	Window.prototype = {
		alert: function(config){
			var cfg = $.extend(this.config, config);
			var boundingBox = $(
				'<div class="window_boundingBox">'+
				'<div class="window-header">'+cfg.title+'</div>'+
				'<div class="window-body">'+cfg.content+'</div>'+
				'<div class="window-footer"><button class="btn">'+cfg.alertBtnText+'</button></div>'+
				'</div>')
			var mask = $('<div class="window_mask"></div>');
			boundingBox.appendTo('body');
			var btn = boundingBox.find('.window-footer button')
			btn.click(function(){
				cfg.handler && cfg.handler()
				boundingBox.remove()
				mask && mask.remove()
			})
			boundingBox.css({
				width: cfg.width,
				height: cfg.height,
				left: cfg.x || (window.innerWidth - cfg.width)/2,
				top: cfg.y || (window.innerHeight - cfg.height)/2
			})
			if(cfg.hasCloseBtn){
				var closeBtn = $('<span class="window_closeBtn">&times;</span>')
				closeBtn.appendTo(boundingBox)
				closeBtn.click(function(){
					boundingBox.remove()
					mask && mask.remove()
				})
			}
			if(cfg.skinClassName){
				boundingBox.addClass(cfg.skinClassName)
			}
			if(cfg.hasMask){
				mask.appendTo('body')
			}
		},
		confirm: function(){},
		prompt: function(){}
	}
	return {
		Window: Window
	}
})