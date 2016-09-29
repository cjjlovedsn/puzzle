(function($) {
	$.fn.puzzle = function(id) {
		//		settings.img = imgs[Math.floor(Math.random() * imgs.length)];
		$(".preview").children().attr("src", "img/" + settings.img);
		$(id).children().remove(); //.remove("div[grid]");
		$(id).gridPic(settings, function(opts) {
			var picPos = [];
			var that = this;
			var wP = $("div[whiteSpace]");
			this.each(function() {
				//保存每一个图块的初始位置
				picPos.push({
					left: $(this).css("left"),
					top: $(this).css("top")
				})
				$(this).data("pos", {
					left: $(this).css("left"),
					top: $(this).css("top")
				});
			});
			//将图块随机打乱置于拼图区
			for(var i = 0; i < Math.pow(settings.columns, 2) * 4; i++) {
				var near = [];
				this.each(function() {
					var tP = $(this);
					var wLeft = parseFloat(wP.css("left"));
					var wTop = parseFloat(wP.css("top"));
					var tLeft = parseFloat(tP.css("left"));
					var tTop = parseFloat(tP.css("top"));
					var atR = (tLeft === wLeft + tP.width() + 2 && tTop === wTop);
					var atL = (tLeft === wLeft - tP.width() - 2 && tTop === wTop);
					var atU = (tTop === wTop - tP.height() - 2 && tLeft === wLeft);
					var atD = (tTop === wTop + tP.height() + 2 && tLeft === wLeft);
					if(atL || atR) {
						tP.flag = true;
						near.push(tP);
					} else if(atU || atD) {
						tP.flag = false;
						near.push(tP);
					}
				})
				var $movepic = near[Math.floor(Math.random() * near.length)];
				if($movepic.flag) {
					var mpposL = $movepic.css("left");
					$movepic.css("left", wP.css("left"));
					wP.css("left", mpposL);
				} else {
					var mpposT = $movepic.css("top");
					$movepic.css("top", wP.css("top"));
					wP.css("top", mpposT);
				}

			}
			setTimeout(function() {
					that.css("transition", "all 0.1s ease-in");
				}, 0)
				//按键移动图块
			$(document).on("keyup", function(e) {
					var wLeft = parseFloat(wP.css("left"));
					var wTop = parseFloat(wP.css("top"));
					//左37上38右39下40
					if(e.keyCode === 37) {
						that.each(function() {
							var tP = $(this);
							var tLeft = parseFloat(tP.css("left"));
							var tTop = parseFloat(tP.css("top"));
							//按左键时，空白区与其右边的图块交换位置
							if(tLeft === wLeft + tP.width() + 2 && tTop === wTop) {
								tP.css("left", wLeft);
								wP.css("left", tLeft);
							}
						})
					}
					if(e.keyCode === 38) {
						that.each(function() {
							var tP = $(this);
							var tLeft = parseFloat(tP.css("left"));
							var tTop = parseFloat(tP.css("top"));
							//按上键时，空白区与其下边的图块交换位置
							if(tTop === wTop + tP.height() + 2 && tLeft === wLeft) {
								tP.css("top", wTop);
								wP.css("top", tTop);
							}
						})
					}
					if(e.keyCode === 39) {
						that.each(function() {
							var tP = $(this);
							var tLeft = parseFloat(tP.css("left"));
							var tTop = parseFloat(tP.css("top"));
							//按右键时，空白区与其左边的图块交换位置
							if(tLeft === wLeft - tP.width() - 2 && tTop === wTop) {
								tP.css("left", wLeft);
								wP.css("left", tLeft);
							}
						})
					}
					if(e.keyCode === 40) {
						that.each(function() {
							var tP = $(this);
							var tLeft = parseFloat(tP.css("left"));
							var tTop = parseFloat(tP.css("top"));
							//按下键时，空白区与其上边的图块交换位置
							if(tTop === wTop - tP.height() - 2 && tLeft === wLeft) {
								tP.css("top", wTop);
								wP.css("top", tTop);
							}
						})
					}
				})
				//鼠标点击移动图块
			$(id).on("click", function(e) {
					var $target = $(e.target);
					var wP = $("div[whiteSpace]");
					if($target.attr("whiteSpace") || !$target.attr("grid")) {
						return
					}
					var wLeft = parseFloat(wP.css("left"));
					var wTop = parseFloat(wP.css("top"));
					var tLeft = parseFloat($target.css("left"));
					var tTop = parseFloat($target.css("top"));
					if((Math.abs(tLeft - wLeft) - 2 === wP.width()) && tTop === wTop) {
						$target.css("left", wLeft);
						wP.css("left", tLeft);
					} else if((Math.abs(tTop - wTop) - 2 === wP.height()) && tLeft === wLeft) {
						$target.css("top", wTop);
						wP.css("top", tTop);
					}
				})
				//拼图区域网格
			var rows = Math.ceil(opts.height / opts.width * opts.columns);
			for(var i = 0; i < rows; i++) {
				for(var j = 0; j < opts.columns; j++) {
					var $span = $("<span>");
					$span.css({
						width: opts.offsetWidth - 2,
						height: opts.offsetHeight - 2,
						border: "1px solid #ccc",
						position: "absolute",
						left: opts.offsetWidth * j + j * 2 + 1,
						top: opts.offsetHeight * i + i * 2 + 1
					}).appendTo(id);
				}
			}
		});
	}

})(jQuery);