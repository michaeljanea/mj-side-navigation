/****************************************************************
 *	Class:		mjSideNavigation								*
 *	Use:		a responsive off-canvas navigation menu			*
 *	Author:		Michael Janea									*
 *				http://facebook.com/mbjanea						*
 *				http://michaeljanea.byethost7.com/				*
 *	Version:	1.0												*
 ****************************************************************/

(function($){
	
	$.fn.mjSideNavigation = function(options){
		
		//defaults
		var mjSettings = $.extend({
			plusIconPath	: 'plus.png',
			minusIconPath	: 'minus.png',
			position		: 'left'
		}, options);
		
		/****************************************
		 *	no need to change the codes below	*
		 ****************************************/
		
		return this.each(function(){
			
			var el = this;
		
			$('.sideNavTrigger').on('click', function(){
				
				eval("$('#sideNavigation, body').addClass('movable').stop(true, true).animate({" + ($('#sideNavigation').hasClass('right') ? 'right' : 'left') + ":'" + ($('#sideNavigation').hasClass('moved') ? '-=' : '+=') + $('#sideNavigation').outerWidth() + "px'}, function(){" + ($('#sideNavigation').hasClass('right') ? "$('body').addClass('right');" : '') + "$(this)." + ($('#sideNavigation').hasClass('moved') ? 'removeClass' : 'addClass') + "('moved').removeAttr('style');});");
				return false;
				
			});
			
			$(document).mouseup(function(e){
				
				var container = $('.sideNavTrigger, #sideNavigation');
				!container.is(e.target) && container.has(e.target).length === 0 && $(container).hasClass('moved') ? container.click() : '';
				
			});
			
			$(window).bind('orientationchange resize load', function(e){
				
				if($(window).width() > 1024){
					$('#sideNavigation, body').removeClass('moved');
					$(el).show();
				}else{
					$(el).hide();
				}
				
			}).load(function(){
			
				$('body').prepend('<div id="sideNavigation"' + (mjSettings.position == 'right' ? ' class="right"' : '') + '></div>');
				
				if($('#sideNavigation').size() > 0){
					$('#sideNavigation').append($(el).html());
					$('#sideNavigation').find('li').each(function(){
						$(this).children('ul').size() > 0 ? $(this).children('a').append('<img src="' + mjSettings.plusIconPath + '" />') : '';
					}).find('img').on('click', function(){
						if(!$(this).hasClass('clicked')){
							$(this).addClass('clicked').attr('src', mjSettings.minusIconPath);
						}else{
							$(this).removeClass('clicked').attr('src', mjSettings.plusIconPath);
						}
						$(this).parent().siblings().stop(true, true).slideToggle();
						return false;
					});
					$('#sideNavigation').find('ul').each(function(){
						$(this).children().children('a').css({paddingLeft:parseInt($(this).siblings('a').css('padding-left')) + 20});
					});
					$('#sideNavigation').find('a[href=#], a[href^=javascript]').on('click', function(){
						$(this).children('img').trigger('click');
					});
				}
			
			});
		
		});
		
	};
	
}(jQuery));