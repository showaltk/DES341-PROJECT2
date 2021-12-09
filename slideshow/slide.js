/**
 * Creator: Li'Zhuo(lizhuo04@baidu.com||topgrd@outlook.com)
 * Think First, Code Later !
 * Date: 2015-05-18
 * Time: 16:00
 */
(function($) {
	$.fn.slide = function(options) {
		/**
		 * 默认设置
		 * start: true or false 默认开始
		 * speed：2000 轮播速度 默认2000 单位：ms
		 * animate: "horizontal"||"opacity" horizontal为横向轮播 opacity为渐变消失
		 */
		this.defaults = {
			start: true,
			speed: 2000,
			animate: "horizontal"
		}
		opts = $.extend({}, this.defaults, options);
		this.each(function() {
			var slideContainer = $(this).find('.slide-container');
			var animate = opts.animate;
			var slide = slideContainer.find('li');
			var count = slide.length;
			var index = 0;
			var time = null;
			var _this = this;
			var speed = opts.speed || 2000;
			$(this).data('opts', opts);
			$(slide[0]).show();
			//向页面增加前进后退按钮元素
			var ctrlHtml = '<a href="javascript:;" class="ctrl-slide prev"></a>' + '<a href="javascript:;" class="ctrl-slide next"></a>';
			$('.slide').append(ctrlHtml);
			var pageIndex = '<ul class="slide-tabs">';
			for (var i = 0; i < count; i++) {
				pageIndex += '<li><a href="#" class="slide-a"></a></li>'
			}
			//向页面增加trigger
			pageIndex += '</ul>';
			$('.slide').append(pageIndex);

			function start() {
				if (opts.start) {
					time = setInterval(function() {
						var old = index;
						if (index >= count - 1) {
							index = 0;
						}
						else {
							index++;
						}
						change.call(_this, index, old);
					}, speed);
				}
			};

			$(this).find('.next').on('click', function() {
				var old = index;
				if (index >= count - 1) {
					index = 0;
				}
				else {
					index++;
				}
				change.call(_this, index, old);

			});

			$(this).find('.prev').on('click', function() {
			    var old = index;
				if (index <= 0) {
					index = count - 1;
				}
				else {
					index--;
				}
				change.call(_this, index, old, 'left');

			});
			//鼠标划入暂停
			$(this).on('mouseover', function() {
				if (opts.start) {
					clearInterval(time);
				}
				$(this).find('.ctrl-slide').css({
					opacity: 0.6
				});
			})

			$(this).on('mouseout', function() {
				if (opts.start) {
					start();
				}
				$(this).find('.ctrl-slide').css({
					opacity: 0
				});
			})

			//trigger
			$(this).find('.slide-tabs li').each(function(aIndex) {
				$(this).on('click.slide-tabs', function() {
					if (aIndex < index) {
						change.call(_this, aIndex, index, 'left');
					}
					else if (aIndex == index) {

					}
					else {
						change.call(_this, aIndex, index);
					}

					index = aIndex;
				});
			});

			switch (opts.animate) {
				case "horizontal":
					opts['width'] = $(this).width();
					slide.css('left', -opts['width']);
					$(slide[0]).css('left', 0);
					slide.show();
					break;
				case "opacity":
					slideContainer.css({
						'position': 'relative'
					});
					slide.css('display', 'none');
					$(slide[0]).show();
			}

			start();
		});
	};

	function change(showIndex, hideIndex, left) {
		var opts = $(this).data('opts');
		var slideContainer = $(this).find('.slide-container');
		var slide = $(this).find('.slide-container li');
		if (opts.animate == "horizontal") {
			var x = showIndex % (slide.length);
			var y = hideIndex % (slide.length);
			var slideWidth = opts['width'];
			if (left == 'left') {
				slide.eq(x).stop().css("left", -slideWidth).addClass("active").animate({
					left: 0
				});
				slide.eq(y).stop().css("left", 0).animate({
					left: slideWidth
				}, function() {
					slide.eq(x).removeClass('active');
				});
			}
			else {
				slide.eq(x).stop().css("left", slideWidth).addClass("active").animate({
					left: 0
				});
				slide.eq(y).stop().css("left", 0).animate({
					left: -slideWidth
				}, function() {
					slide.eq(x).removeClass('active');
				});
			}

			$(this).find('.slide-tabs li').eq(hideIndex).css({
				opacity:0.5, backgroundColor:"#f6f6f6", border:"none"
			});
			$(this).find('.slide-tabs li').eq(showIndex).css({
				opacity:1, backgroundColor:"#FA9BE6", border:"1px solid #222222"
			});
		}
		else {
			$(this).find('.slide-container li').eq(hideIndex).stop().hide().animate({
				opacity: 0
			});
			$(this).find('.slide-tabs li').eq(hideIndex).css({
				opacity: 0.7
			});
			$(this).find('.slide-tabs li').eq(showIndex).css({
				opacity: 1
			});
			$(this).find('.slide-container li').eq(showIndex).show().css({
				opacity: 0
			}).stop().animate({
				opacity: 1
			});
		}
	};
})(jQuery);