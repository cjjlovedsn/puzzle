(function($) {
	$.fn.gridPic = function(opts, fn) {
		//参数设置
		var settings = $.extend({
			columns: 5,
			img: "demo.jpg",
			path: "./img/"
		}, opts);
		//获取图片宽高
		var img = new Image();
		img.src = settings.path + settings.img;
		var self = this;
		$(img).on("load", function() {
			var rate = img.width / img.height;
			if(settings.height) {
				settings.width = settings.width || settings.height * rate;
			} else {
				settings.width = settings.width || img.width;
				settings.height = settings.width / rate;
			}
			self.each(function() {
				var container = $(this);
				var rows = Math.ceil(settings.height / settings.width * settings.columns);
				var squareWidth = Math.ceil(settings.width / settings.columns);
				var squareHeight = Math.ceil(settings.height / rows);
				container.width(squareWidth * settings.columns).height(squareHeight * rows-2).css({
					"position": "relative"
				});
				for(var i = 0; i < rows; i++) {
					for(var j = 0; j < settings.columns; j++) {
						var $div = $("<div>");
						$div.css({
							width: squareWidth-2,//-parseInt($(this).css("border-width"))*2,
							height: squareHeight-2,//-parseInt($(this).css("border-width"))*2,
//							border: "1px solid #ccc",
							backgroundImage: "url(" + settings.path + settings.img + ")",
							backgroundPosition: -squareWidth * j + "px " + (-squareHeight * i) + "px",
							backgroundRepeat: "no-repeat",
							backgroundSize: settings.width+"px "+settings.height+"px",
							position: "absolute",
							left: squareWidth * j+1,
							top: squareHeight * i+1,
							"z-index":1
						}).attr("grid","true").appendTo(container);
						settings.offsetWidth = $div.outerWidth();
						settings.offsetHeight = $div.outerHeight();
						if (i==rows-1&&j==settings.columns-1) {
							$div.css("background","");
							$div.attr("whiteSpace",true)
						}
					}
				}
			})
			if(fn) {
				fn.call(self.children(),settings);
			}
		})
	}
})(jQuery);