/*
 * jQuery Plugin - YoungPixel light accordion nav menu
 * Copyright (c) 2014 YoungPixel
 *
*/

(function($){
	$.fn.yp_anm = function(){
		var _$this = this;
		// our variables
		var is_stopped = true;
		var is_initiated = false;
		var is_slided_down = false;
		var is_paused = false;
        var speed = 300;
        var _$active_element = null;
      var is_sliding = false;

        function yp_anm_toggle(element){
            if(is_slided_down){
            	is_slided_down = false;
            	element.slideUp(speed, function() {
					element.removeAttr('style');
                  element.parent().find("i").removeClass().addClass("icon-plus");
                  is_sliding = false;
				});
            }else{
            	is_slided_down = true;
              element.slideDown(speed, function(){
                is_sliding = false;
              });
              element.parent().find("i").removeClass().addClass("icon-minus");
            }
        }
		this.runIt = function(){
			if(!is_initiated){
				is_initiated = true;
				_$this.each(function(){
					$(this).has('ul').click(function(){
						if(!is_sliding && !is_stopped && !is_paused){
                          is_sliding = true;
							var _$current_element = $(this).find('ul');
							if(_$active_element !== null){
                            	if(is_slided_down && _$active_element[0] !== _$current_element[0]){ //check if they're the same
                            		yp_anm_toggle(_$active_element);
                            	}
                        	}
                        	yp_anm_toggle(_$current_element);
                    		_$active_element = _$current_element;
						}
					});
				});
				_$this.find('ul').hover(// create hover event for all sub ul tags
										function(){
											is_paused = true;
										},
										function(){
											is_paused = false;
										}
									);
				_$this.find('a').hover(// create hover event for all sub a tags
										function(){
											is_paused = true;
										},
										function(){
											is_paused = false;
										}
									);
			}
			is_stopped = false;
		};
		// function to stop the plugin
		this.stopIt = function(){
			is_stopped = true;
			if(is_slided_down){
				is_slided_down = false;
            	_$active_element.slideUp(0, function() {
					_$active_element.removeAttr('style');
				});
        	}
		};

        return this;
	}
})(jQuery);