(function($) {
	$.fn.drag = function(fn, method) {
		var index = 0;
		return this.each(function() {
			$(this).on("mousedown", downEvent)

			function downEvent(e) {
				var x = e.pageX;
				var initX = e.pageX - $(this).offset().left;
				var initY = e.pageY - $(this).offset().top;
				var $this = $(this);
				$this.css("z-index", ++index) //.siblings().css("z-index",1)
				if(method) {
					$(document).on("mousemove", scaleEvent);
				} else {
					$(document).on("mousemove", moveEvent);
				}
				$this.on("mouseup", function(e) {
					if(!method) {
						$(document).off("mousemove", moveEvent);
						if(fn) {
							fn.call($this, {
								left: e.pageX - initX,
								top: e.pageY - initY
							});
						}
					}
				});
				$(document).on("mouseup", function(e) {
					if(method) {
						$(document).off("mousemove", scaleEvent);
						if(fn) {
							fn.call($this, {
								left: e.pageX - initX,
								top: e.pageY - initY
							});
						}
					}
				});
				return false;

				function moveEvent(e) {
					$this.offset({
						left: e.pageX - initX,
						top: e.pageY - initY
					})
					return false;
				}

				function scaleEvent(e) {
					e.stopPropagation()
					var disX = $this.width();
					if(e.pageX > x) {
						--disX;
					} else {
						++disX;
					}
					$this.css({
						width: disX
					})
					x = e.pageX;
					return false;
				}
			}
		});
	}
})(jQuery);