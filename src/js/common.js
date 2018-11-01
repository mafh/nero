var windowWidth = window.innerWidth,
	windowHeight = window.innerHeight,
	mobile = false,
	tablet = true,
	desktop = true,
	opera12 = false,
	apple = false,
	loaded = false,
	ie = 0,
	scrolltop = 0,
	scrollWidth = 0;


// video @title page
var player;

// maps to acces em
var contactMap;

var dealersMap;
var dealersMarkers = [];
var dealersMarkerImage;
var locations = [];
var mapItems = [];

function isMobile() {
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
}

function isTablet() {
	 return (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
}

function isApple() {
	return (/iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase()));
}

function isAndroid() {
	return (/android/i.test(navigator.userAgent.toLowerCase()));
}

function isOpera12() {
	if(navigator.userAgent.indexOf('Opera') !== -1 && navigator.userAgent.indexOf('OPR/') === -1) {
		var version = navigator.userAgent.substring(navigator.userAgent.indexOf('Version/') + 8);
		if(version.indexOf('12.') !== false) return true;
		return false;
	}
	return false;
}

function isIE() {
	var myNav = navigator.userAgent.toLowerCase();
	return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

function getScrollbarWidth() {
	var outer = document.createElement('div');
	outer.style.visibility = 'hidden';
	outer.style.width = '100px';
	outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
	document.body.appendChild(outer);
	var widthNoScroll = outer.offsetWidth;
	outer.style.overflow = 'scroll';
	var inner = document.createElement('div');
	inner.style.width = '100%';
	outer.appendChild(inner);
	var widthWithScroll = inner.offsetWidth;
	outer.parentNode.removeChild(outer);
	return widthNoScroll - widthWithScroll;
}

mobile  = isMobile();
tablet  = isTablet();
desktop = (isMobile() || isTablet()) ? false: true;
apple   = isApple();
opera12 = isOpera12();
ie      = isIE();
scrollWidth = getScrollbarWidth();

if (desktop === true && ie === true && ie <= 10) {
	document.getElementById('browserUnsupportedPlaceholder').style.display = '';
}

var viewport = document.getElementById('viewport');

if (tablet === true) {
	viewport.setAttribute('content', 'width=device-width user-scalable=no');
}

if (mobile === true) {
	viewport.setAttribute('content', 'width=device-width user-scalable=no');
}

windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
windowHeight = window.innerHeight ? window.innerHeight : $(window).height();

if (desktop === false) {
	$('body').removeClass('desktop');
	$('body').addClass('device');
}

if (opera12 === true) {
	$('body').addClass('opera12');
}

if (isAndroid()) {
	$('body').addClass('android');
}

if (apple === true) {
	$('body').addClass('apple');
}

if (desktop === true) {
	$('body').addClass('desktop');
}

if (tablet === true && mobile === false) {
	$('body').addClass('tablet');
}

if (mobile === true) {
	$('body').addClass('mobile');
}

$(window).scroll(function() {
	scrolltop = $(window).scrollTop();
});

function resizeHandler() {
	windowWidth = (document.documentElement.clientWidth) ? document.documentElement.clientWidth : $(window).width();
	windowHeight = (document.documentElement.clientHeight) ? document.documentElement.clientHeight : $(window).height();
}

$(window).resize(function() {
	resizeHandler();
});

if (desktop === false) {
	window.addEventListener('orientationchange', function() {
		resizeHandler();
	});
}

var Popup = {};

$(document).ready(function() {

	// checkNewSiteCookie();

	if ($('#fullpage').length > 0) {
		fullpage();
	}

	mobmenu();

	if (ie === false && $('.l-header-inner').length > 0) {
		$('.l-header-inner').stickybits({
			useStickyClasses: true
		});
	}

	if (mobile === false && ie === false && $('.filter').length > 0) {
		$('.filter').stickybits({
			useStickyClasses: true
		});
	}

	$(function() {
		$('.fitvid').fitVids();
	});

	$(function() {
		objectFitImages();
	});

	$(function() {
		objectFitVideos(document.querySelectorAll('video'));
	});

	if (document.querySelector('[data-select]') !== null) {
		customSelect();
	}

	// var currentRegion = 'Уругвай';

	// if (currentRegion) {
	// 	jsRegion(currentRegion);
	// }

	if ($('.js-contact-app').length > 0) {
		contactApp();
	}

	if ($('.js-wideslider').length > 0) {
		wideSlider();
	}

	if ($('.js-history').length > 0) {
		historySlider();
	}

	if ($('.js-title-mob-slider').length > 0) {
		titleMobSlider()
	}

	if ($('.js-fb-slider').length > 0) {
		fbSlider();
	}

	if ($('.js-prod-slider-single').length > 0) {
		productSliderSingle();
	}

	if ($('.js-sbs-slider').length > 0) {
		sbsSlider();
	}

	if ($('.js-graph-node').length > 0) {
		graphSlider();
	}

	if ($('.app-dealer').length > 0) {
		dealerApp.init();
	}

	if ($('.js-product-list').length > 0) {
		productListApp();
	}

	if ($('.js-tabs').length > 0) {
		var tabs = new Tabs($('.js-tabs'));
	}

	if ($('.js-portfolio-list').length > 0) {
		portfolioApp();
	}

	if ($('.js-cu-form').length > 0) {
		cuForm();
	}

	if ($('.js-devslider').length > 0) {
		deviceSlider();
	}

	if ($('.js-form').length > 0) {
		jsForm();
	}

	if ($('.js-reg').length > 0) {
		regForm();
	}

	// if ($('.js-personal-basket').length > 0) {
	// 	new PersonalBasket();
	// }

	if ($('.js-personal-history').length > 0) {
		personalHistory();
	}

	if ($('.js-personal-data').length > 0) {
		personalData();
	}

	if ($('.js-number-input').length > 0) {
		jsInputNumber();
	}

	if ($('.js-subscribe-form').length > 0) {
		subscribeForm();
	}

	if ($('.js-news-filter').length > 0) {
		newsFilter();
	}

	if ($('.js-card-slider').length > 0) {
		cardSlider();
	}

	if ($('.js-quality').length > 0) {
		qualityTable();
	}

	// lazy loads elements with default selector as ".lozad"
	var observer = lozad();
	observer.observe();



	// if (desktop === false) {
	$('.js-product-touch').on('click', function(event) {
		event.preventDefault();

		var product = $(this).parents('.product');

		product.toggleClass('product-touch-active');

	});
	// }

	if ($('.js-card-slider').length > 0) {
		cardSlider();
	}

	topnavCatalog();

	filterConfig();

	tippy('.tooltip', {
		arrow: true,
		maxWidth: '200px',
		distance: 20,
		animation: 'shift-toward'
	});

	$('.js-goto').on('click', function(event) {
		event.preventDefault();

		var num = $(this).data('goto'),
			shift = $(this).data('shift') || false,
			deltaY = 0;

		if (shift) {
			deltaY = 0 - parseInt($('.l-header').height());
		}

		$.scrollTo(num, 700, {
			easing: 'easeInOutCubic',
			offset: deltaY
		});
	});

	if ($('.features-list').length > 0) {
		featureListVisual();
	}

	if ($('.js-appear').length > 0) {
		(function(){

			var el = $('.js-appear');

			el.appear();

			el.on('appear', function(event, $all_appeared_elements) {
				$(this).addClass('is-visible');
			});

			el.on('disappear', function(event, $all_appeared_elements) {
				$(this).removeClass('is-visible');
			});

		}());
	}


	if ($('.js-appear-video').length > 0) {
		(function(){

			var el = $('.js-appear-video');

			var video = $('.js-appear-video')[0];

			el.appear();

			el.on('appear', function(event, $all_appeared_elements) {
				video.play();
			});

			el.on('disappear', function(event, $all_appeared_elements) {
				video.pause();
			});

		}());
	}

	if ($('.js-hs-slider').length > 0) {
		hsSlider();
	}

	$(function(){

		var options = {
			animationSpeed: 500,
			history: false,
		};

		var lightbox = $('.js-image-open').simpleLightbox(options);

		lightbox.on('shown.simplelightbox', function () {
			if (fullpage instanceof Object) {
				fullpageScrolling(false);
			}
		});

		lightbox.on('closed.simplelightbox', function () {
			if (fullpage instanceof Object) {
				fullpageScrolling(true);
			}
		});

	});

	$(function(){
		var $lightGallery = $('.js-lightgallery');

		if ($lightGallery.length > 0) {

			$.each($lightGallery, function () {
				var gallery = $(this);
				lightGalleryImages(gallery);
			});

			function lightGalleryImages($gallery, elems) {
				$gallery.lightGallery({
					thumbnail: false,
					animateThumb: false,
					showThumbByDefault: false,
					download: false,
					counter: true,
					hash: false,
					share: false,
					zoom: false,
					preload: 1,
					fullScreen: false,
					autoplay: false,
					autoplayControls: false,
					prevHtml: '<svg viewBox="0 0 50 50"><use xlink:href="#ico-left"></use></svg>',
					nextHtml: '<svg viewBox="0 0 50 50"><use xlink:href="#ico-right"></use></svg>',
				});
			}
		}

		$('.js-lightgallery-opener').on('click', function(event) {
			event.preventDefault();
			var $this = $(this);

			$this.next().children().eq(0).trigger('click');
		});
	});


	$(function(){

		if ($('.js-imgpopup-list').length > 0) {

			var $images = $('.js-imgpopup-list');

			var $imagesGrouped = $images.filter('[data-group]');

			var $imagesAlone = $images.not($imagesGrouped);

			var options = {
				// your params
			};

			console.log($imagesAlone);
			console.log($imagesGrouped);

			$imagesAlone.each(function (index, element) {
				console.log('imagesAlone');
				$(element).simpleLightbox(options);
			});

			if ($imagesGrouped.length > 0) {

				console.log('imagesGrouped');

				var groupNames = $imagesGrouped.map(function() {
					return $(this).data('group');
				}).get();

				groupNames = $.unique(groupNames);

				$.each(groupNames, function(key, value) {
					$imagesGrouped.filter(function () {
						return $(this).data('group') == value;
					})
					.simpleLightbox(options);
				});
			}
		}

	});


	$(function(){

		var video = $('.html5-video');

		$.each(video, function(index, val) {

			$(val).lightGallery({
				thumbnail: false,
				autoplay: false,
				controls: true,
				download: false,
				counter: false,
				hash: false,
				share: false,
				zoom: false,
				fullScreen: false,
				videoMaxWidth: '90%'
			});

		});

	});


	$(function(){

		var video = $('.youtube-video');

		$.each(video, function(index, val) {

			$(val).lightGallery({
				selector: 'this',
				thumbnail: false,
				autoplay: false,
				controls: true,
				download: false,
				counter: false,
				hash: false,
				share: false,
				zoom: false,
				fullScreen: false,
				closable: false,
				videoMaxWidth: '980px',

				youtubePlayerParams: {
					modestbranding: 0,
					showinfo: 0,
					loop: 0,
					rel: 0,
					controls: 1,
					mute: 1
				},

				// videojs: true,
				// videojsOptions: {
				// 	defaultMuted: true
				// }

			});

		});

	});

	$(function(){
		if ($('.l-faq').length > 0) {

			function faqHandler() {

				var $question = $('.faq-q');
				var $container = $question.parent();

				$.each($container, function(index, val) {
					var $container = $(val);

					var $feedback = $container.find('.js-faq__is_usefull');

					var $feedbackLink = $feedback.find('a').not('.button');
					var $feedbackText = $feedback.find('span');

					$question.off('click');

					$question.on('click', function(event) {
						event.preventDefault();
						$question = $(this);
						$question.toggleClass('active').next().slideToggle(200);
					});

					$feedbackLink.on('click', function(event) {
						event.preventDefault();
						var link = $(this);
						var href = link.attr('href');
						$.post(href, function(data, textStatus, xhr) {
							var data = $.parseJSON(data);
							$feedbackLink.hide();
							$feedbackText.text(data.text);
						});
					});
				});
			};

			faqHandler();
		}
	});


	Popup = {

		open: function(url, title) {

			$('.js-popup').fadeIn(200);

			freeze('popup', true);

			switch (url[0]) {
				case '#':
					var id = url;
					popupTemplate(id, title);
					break;
				default:
					console.error('Контент не найден');
			}
		},

		close: function() {

			freeze('popup', false);

			setTimeout(function(){
				$('.js-popup').fadeOut(200, function(){
					$('.js-popup-content').html('');
					$('.js-popup-title').html('');
				});
			},200)

		}
	};

	function popupTemplate(id, title) {

		var content = $(id).html();

		if (content !== undefined) {

			$('.js-popup-title').text(title);

			$('.js-popup-content').html(content);

		} else {

			$('.js-popup-title').text('Ошибка загрузки окна');

			$('.js-popup-content').html('Контент для попапа не найден. Проверьте наличие ссылки <pre>id</pre> и шаблона <pre>x-template</pre>');
		}

	}

	popupEvents();

	Parsley.addMessages('ru', {
		defaultMessage: "Некорректное значение.",
		type: {
			email: "Введите адрес электронной почты.",
			url: "Введите URL адрес.",
			number: "Введите число.",
			integer: "Введите целое число.",
			digits: "Введите только цифры.",
			alphanum: "Введите буквенно-цифровое значение."
		},
		notblank: "Заполните поле.",
		required: "Обязательное поле.",
		pattern: "Это значение некорректно.",
		min: "Это значение должно быть не менее чем %s.",
		max: "Это значение должно быть не более чем %s.",
		range: "Это значение должно быть от %s до %s.",
		minlength: "Это значение должно содержать не менее %s символов.",
		maxlength: "Это значение должно содержать не более %s символов.",
		length: "Это значение должно содержать от %s до %s символов.",
		mincheck: "Выберите не менее %s значений.",
		maxcheck: "Выберите не более %s значений.",
		check: "Выберите от %s до %s значений.",
		equalto: "Это значение должно совпадать.",
		dateiso: "Это значение должно быть корректной датой (ГГГГ-ММ-ДД).",
		minwords: "Это значение должно содержать не менее %s слов.",
		maxwords: "Это значение должно содержать не более %s слов.",
		words: "Это значение должно содержать от %s до %s слов.",
		gt: "Это значение должно быть больше.",
		gte: "Это значение должно быть больше или равно.",
		lt: "Это значение должно быть меньше.",
		lte: "Это значение должно быть меньше или равно.",
		notequalto: "Это значение должно отличаться."
	});

	Parsley.setLocale('ru');

	if ($('.js-product').length > 0) {
		producsList();
	}

});


function customSelect() {

	var select = document.querySelector('[data-select]');

	$.each(select, function(index, val) {
		var isPlaceholder = (val.value.length == 0);
		if (isPlaceholder) {
			val.setAttribute('placeholder', '');
		}
	});

	if (select !== null) {
		var genericExamples = new Choices('[data-select]', {
			placeholder: false,
			placeholderValue: null,
			searchPlaceholderValue: null,
			searchEnabled: false,
			shouldSort: false,
			shouldSortItems: false,
			itemSelectText: '',

			callbackOnInit: function() {
			}
		});

		genericExamples.passedElement.addEventListener('change', function(value) {
			if (this.value.length > 0) {
				$(this).removeClass('input--error');
			}
		});
	}

	var multiple = document.querySelector('[data-multiple]');

	if (multiple !== null) {
		var genericExamples = new Choices('[data-multiple]', {
			renderChoiceLimit: 5,
			maxItemCount: 5,
			placeholder: false,
			placeholderValue: null,
			searchPlaceholderValue: null,
			searchEnabled: false,
			shouldSort: false,
			shouldSortItems: false,
			itemSelectText: '',
			removeItemButton: true,

			callbackOnInit: function() {
				// console.log(this);
			}
		});

		genericExamples.passedElement.addEventListener('change', function(value) {
			if (this.value.length > 0) {
				$(this).removeClass('input--error');
			}
		});
	}


	var editable = document.querySelector('[data-editable]');

	if (editable !== null) {
		var genericExamples = new Choices('[data-editable]', {
			renderChoiceLimit: 5,
			maxItemCount: 5,
			placeholder: false,
			placeholderValue: null,
			searchPlaceholderValue: null,
			searchEnabled: false,
			shouldSort: false,
			shouldSortItems: false,
			// itemSelectText: '',
			delimiter: ',',
			editItems: true,
			maxItemCount: 5,
			removeItemButton: true,

			callbackOnInit: function() {
				// console.log(this);
			}
		});
	}
}

var currentSection;
var currentIndex;

function fullpage() {

	$fullpage  = $('#fullpage');
	var header = $('.l-header');
	var topnav = $('.topnav');
	var cnav   = $('.cnav');
	var gonext   = $('.js-nav-gonext');
	var cnav_link = $('.cnav-link', cnav);

	var length = $('#fullpage .section').length;

	var bg;
	var next;

	var setCnavColor = function(bg) {
		//make inverse
		if (bg === 'light') {
			cnav.addClass('cnav-is-dark');
		} else {
			cnav.removeClass('cnav-is-dark');
		}
	};

	var setCnavLine = function(index) {
		var num = index;

		var pos = $('.js-cnav-line, .js-cnav-dots');

		if (num === 0) {
			pos.removeClass('cnav-pos-0');
			pos.removeClass('cnav-pos-1');
			pos.removeClass('cnav-pos-2');
		}

		else if (num === 1) {
			pos.addClass('cnav-pos-0');
			pos.removeClass('cnav-pos-1');
			pos.removeClass('cnav-pos-2');
		}

		else if (num === 2) {
			pos.addClass('cnav-pos-1');
			pos.removeClass('cnav-pos-0');
			pos.removeClass('cnav-pos-2');

		}

		else if (num === 3) {
			pos.addClass('cnav-pos-2');
			pos.removeClass('cnav-pos-0');
			pos.removeClass('cnav-pos-1');
		}


	};

	var setCnavActive = function(num) {
		var num = num - 2;

		if (num >= 0) cnav_link.eq(num).addClass('cnav-link--active');
	};

	$fullpage.fullpage({
		sectionSelector: '.section',
		verticalCentered: false,
		controlArrows: false,
		easingcss3: 'cubic-bezier(1.000, 0.000, 0.000, 1.000)',
		easingcss3: 'ease',
		scrollingSpeed: 700,
		lazyLoading: true,
		loopBottom: false,
		// anchors:['screen-welcome', 'screen-uchet', 'screen-rollet', 'screen-house'],

		//events
		onLeave: function(index, nextIndex, direction){

			if (nextIndex > 1) {
				header.addClass('header-is-white');

				if (desktop && player !== undefined) {
					setTimeout(player.pause(), 800);
				}

			} else {
				header.removeClass('header-is-white');

				if (desktop && player !== undefined) {
					player.play();
				}

			}

			if (direction === 'up') {

				next = $(this).prev();

			} else if (direction === 'down') {

				next = $(this).next();

			} else {
				console.error('cnav error');
			}

			//цвет активного слайда owl
			bg = next.find('.owl-item.active > div').data('slide-bg');

			var index = next.index();

			// console.log(bg);

			if (bg !== undefined) {
				setCnavColor(bg);
			}

			if (index !== undefined) {
				setCnavLine(index);
			}

			cnav_link.removeClass('cnav-link--active');

		},

		afterLoad: function(anchorLink, index){

			currentSection = this;

			currentIndex = index;

			if (currentIndex === length || currentIndex === length - 1) {
				gonext.addClass('reverse');
			} else {
				gonext.removeClass('reverse');
			}

			bg = currentSection.find('.owl-item.active > div').data('slide-bg');

			if (bg !== undefined) {
				setCnavColor(bg);
			}

			setCnavActive(index);

			this.find('.owl-loaded').removeClass('owl-animated-in');

			if (index !== undefined) {
				setCnavLine(index - 1);
			}
		},

		afterRender: function(){

			$fullpage.removeClass('fullpage-preload');

			$('.cnav-link', cnav).on('click', function(event) {
				event.preventDefault();

				var num = parseInt($(this).index() + 2);

				$.fn.fullpage.moveTo(num);

				if (num !== undefined) {
					setCnavLine(num - 1);
				}
			});

			$('.js-goto-screen').on('click', function(event) {
				event.preventDefault();

				var num = $(this).data('goto');

				$.fn.fullpage.moveTo(num);
			});


			$('.logo').on('click', function(event) {
				event.preventDefault();

				$.fn.fullpage.moveTo(1);
			});

			gonext.on('click', function(event) {
				event.preventDefault();

				// console.log(currentIndex, length);

				if (currentIndex === length - 1) {
					$.fn.fullpage.moveTo(1);
					setCnavLine(0)
				} else {
					$.fn.fullpage.moveSectionDown();
				}

			});


			// owl
			var owl = $('.owl-carousel');

			var owlOptions = {
				items: 1,
				lazyLoad: true,
				nav: true,
				dots: false,
				animateOut: 'fadeOut',
				animateIn: 'fadeIn',
				mouseDrag: false,
				smartSpeed: 1000,
				navText : ['','']
			};

			$.each(owl, function(index, val) {

				if (mobile === true) return;

				var owl = $(val);

				var nav = owl.siblings('.slide-nav');

				var videoFlag = owl.hasClass('owl-carousel--video');

				var tab = $('.js-slide-tab', nav);

				var setActiveTab = function(num) {
					tab.eq(num).addClass('slide-tab--active')
						.siblings()
						.removeClass('slide-tab--active');
				};

				var setSlideNavTheme =  function(bg) {
					nav.attr('data-theme', bg);
				};

				var setActiveSlideTheme = function() {
					var currentSlide = $('.section.active .owl-item.active > div');

					var bg = currentSlide.data('slide-bg');

					setCnavColor(bg);

					setSlideNavTheme(bg);
				};

				var getQueuedSlideTheme = function(num) {
					var queuedSlide = $('.section.active .owl-item:nth-child(' + parseInt(num + 1) + ') > div');

					var bg = queuedSlide.data('slide-bg');

					setCnavColor(bg);

					setSlideNavTheme(bg);
				};

				var video = function(num) {
					var queuedSlide = $('.section.active .owl-item:nth-child(' + parseInt(num + 1) + ') > div');

					var video = queuedSlide.find('video');

					return video;
				};

				owl.on('initialized.owl.carousel', function(event) {
					// console.log('initialized', videoFlag);

					var currentSlide = event.item.index;

					setActiveTab(currentSlide);

					if (desktop && videoFlag) {

						playTabVideo(video, currentSlide);

					}

				});

				owl.owlCarousel(owlOptions);

				tab.on('click', function(event) {
					event.preventDefault();

					var tabIndex = $(this).index();

					owl.trigger('to.owl.carousel', tabIndex);

					setActiveTab(tabIndex);

					getQueuedSlideTheme(tabIndex);

				});

				owl.on('change.owl.carousel', function(event) {
					// console.log('change.owl.carousel');

					var currentSlide = event.item.index;

					setActiveTab(currentSlide);

					if (desktop && videoFlag) {

						var playerCurrent = video(currentSlide)[0];

						if (playerCurrent !== undefined) {
							setTimeout(playerCurrent.pause(),1000);
						}


					}
				});

				owl.on('changed.owl.carousel', function(event) {
					// console.log('changed.owl.carousel');

					var currentSlide = event.item.index;

					setActiveTab(currentSlide);

					if (desktop && videoFlag) {

						playTabVideo(video, currentSlide);

					}
				});

				owl.on('translated.owl.carousel', function(event) {

					// console.log('translated.owl.carousel');

					setActiveSlideTheme();

				});


			});


		},
		afterResize: function(){
			// console.log('afterResize');
		},
		afterResponsive: function(isResponsive){},
		afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
		onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
	});

	if (mobile === true) {
		$.fn.fullpage.setAutoScrolling(false);
		$.fn.fullpage.setFitToSection(false);
	}
}


function fullpageScrolling(boolean) {
	$.fn.fullpage.setAllowScrolling(boolean);
	$.fn.fullpage.setKeyboardScrolling(boolean);
}



var mapMarker = 'i/map-marker.png';
var styleMap = [
	{
		"featureType": "all",
		"elementType": "all",
		"stylers": [
			{
				"hue": "#ff0000"
			},
			{
				"saturation": -100
			},
			{
				"lightness": -30
			}
		]
	},
	{
		"featureType": "all",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#ffffff"
			}
		]
	},
	{
		"featureType": "all",
		"elementType": "labels.text.stroke",
		"stylers": [
			{
				"color": "#353535"
			}
		]
	},
	{
		"featureType": "landscape",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#656565"
			}
		]
	},
	{
		"featureType": "poi",
		"elementType": "geometry.fill",
		"stylers": [
			{
				"color": "#505050"
			}
		]
	},
	{
		"featureType": "poi",
		"elementType": "geometry.stroke",
		"stylers": [
			{
				"color": "#808080"
			}
		]
	},
	{
		"featureType": "road",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#454545"
			}
		]
	}
];





function playTabVideo(video, currentSlide) {
	var video = video(currentSlide)[0];

	if (video !== undefined) {
		var playPromise = video.play();

		if (playPromise !== undefined) {
			playPromise.then(function (_) {
				console.log('Automatic playback started!');
			}).catch(function (error) {
				console.log('Auto-play was prevented');
			});

			video.onended = function() {
				onPlayerStateChange();
			};
		}

		var muteToggle = $('.sound-sw');

		muteToggle.off().on('click', function(event) {
			event.preventDefault();

			var video = $('.owl-carousel video');

			var muted = video.prop('muted');

			var elem = $(this);

			if (muted === false) {

				video.prop('muted', true);

				elem.addClass('muted');

			} else {

				video.prop('muted', false);

				elem.removeClass('muted');
			}

		});

	}
}

function onPlayerStateChange() {

	var box = $('#fullpage .tvideo-nav'),
		tab = $('.js-slide-tab', box),
		len = tab.length - 1,
		cur = $('.slide-tab--active', box),
		ind = cur.index(),
		nxt = cur.next('.js-slide-tab'),
		fst = $('.js-slide-tab', box).eq(0);

	if (ind === len) {
		// console.log('go first');
		fst.trigger('click');
	} else {
		// console.log('go next');
		nxt.trigger('click');
	}
}


function featureListVisual() {

	var el = $('.features-list');

	el.appear();

	el.one('appear', function(event, $all_appeared_elements) {
		$(this).addClass('is-visible');
	});

	var appeared = el.is(':appeared');

	if (!appeared) {
		el.addClass('is-hidden');
	}
}



function mobmenu() {
	var toggle = $('.js-menu-toggle'),
		body   = $('body'),
		page   = $('.page-wrap'),
		head   = $('.l-header'),
		mobmenuVisible = false;

	toggle.on('click', function(event){
		event.preventDefault();

		if (!mobmenuVisible) {

			body
				.addClass('sidebar-is-visible')
				.css({
					'overflow': 'hidden!important',
					'height': 'calc(100vh + ' + scrolltop + 'px)'
				});

			page.css({
				'padding-right':  scrollWidth + 'px'
			});

			mobmenuVisible = true;

		} else {

			body
				.removeClass('sidebar-is-visible')
				.removeAttr('style');

			page.removeAttr('style');

			mobmenuVisible = false;
		}

	});

};




function filterConfig() {

	if ($('#config-head').length > 0) {
		configBounds();
	}

	var toggle = $('.js-filter-toggle'),
		body   = $('body'),
		head   = $('#config-head'),
		page   = $('.page-wrap'),
		footer = $('.l-footer'),
		filter = $('.js-filter'),
		reset  = $('.js-reset'),
		filterFull = $('.js-filter-full'),
		filterVisible = false;

	var $ajaxContainer = $('#catalog-ajax');

	var $errorTemplate = '<div class="catalog-error"><h4>По вашему запросу ничего не найдено.</h4></div>';

	if (document.querySelector('[data-select-type]') !== null) {
		var selectType = new Choices('[data-select-type]', {
			placeholder: false,
			placeholderValue: null,
			searchPlaceholderValue: null,
			searchEnabled: false,
			shouldSort: false,
			shouldSortItems: false,
			itemSelectText: '',

			callbackOnInit: function() {
			}
		});

		selectType.passedElement.addEventListener('change', function(value) {
			var query = {'key': 'type'};
			getData(query);
		});
	}

	if (document.querySelector('[data-select-line]') !== null) {
		var selectLine = new Choices('[data-select-line]', {
			placeholder: false,
			placeholderValue: null,
			searchPlaceholderValue: null,
			searchEnabled: false,
			shouldSort: false,
			shouldSortItems: false,
			itemSelectText: '',

			callbackOnInit: function() {
			}
		});

		selectLine.passedElement.addEventListener('change', function(value) {
			var query = {'key': 'line'};
			getData(query);
		});
	}

	var isStuck = filter.hasClass('.js-is-stuck');

	var hideFilter = function() {
		body
			.removeClass('filter-is-visible')
			.removeAttr('style');

		// head.removeAttr('style');

		page.removeAttr('style');

		footer.removeAttr('style');

		filterFull.hide(0);

		toggle.removeClass('active');

		filterVisible = false;
	}

	toggle.on('click', function(event){
		event.preventDefault();

		if (!filterVisible) {

			body
				.addClass('filter-is-visible')
				.css({
					'overflow': 'hidden!important',
					'height': 'calc(100vh + ' + scrolltop + 'px)'
				});

			// head.css({
			// 	'padding-right':  scrollWidth + 'px'
			// });

			page.css({
				'padding-right':  scrollWidth + 'px'
			});

			footer.css({
				'padding-right':  scrollWidth + 'px'
			});

			filterFull.show(0);

			if (!isStuck) {
				$.scrollTo(filter, 700);
			}

			configBounds();

			toggle.addClass('active');

			filterVisible = true;

		} else {
			hideFilter();
		}

	});

	function getData(query) {
		$.ajax({
			url: './ajax-catalog.html',
			type: 'GET',
			dataType: 'html',
			data: query,
		})
		.done(function(data) {
			setHtmlContent(data);
		})
		.fail(function() {
			console.log("error");
			setHtmlContent($errorTemplate);
		})
		.always(function() {
			console.log("complete");
		});
	}

	function setHtmlContent(data) {
		$ajaxContainer.html(data);
	}

}

function configBounds() {

	var head = document.getElementById('config-head'),
		main = document.getElementById('config-main'),
		foot = document.getElementById('config-foot');

	var delta = parseInt(head.offsetHeight + foot.offsetHeight);

	main.style.maxHeight = 'calc(100vh - ' + (delta - 10) + 'px)';
}






/**
	* Swiper c автошириной слайдов и смещением. Не уверен, что получится сделать lazyload,
	* т.к. для пересчета размеров нужны загруженные картинки.
	* @returns Created [a.gusev]
*/

function wideSlider() {
	var sizer = $('#wideslider_sizer');
	var sizerWidth = sizer.width();
	var delta = (windowWidth - sizerWidth) / 2;

	var swiper = new Swiper('.js-wideslider', {
		slidesOffsetBefore: delta,
		slidesOffsetBefore: 10,
		slidesOffsetAfter: 10,

		slidesPerView: 'auto',
		spaceBetween: 10,
		preloadImages: true,
		// centeredSlides: true,

		lazy: false,

		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

		on: {

			resize: function() {
				sizerWidth = sizer.width();

				delta = (windowWidth - sizerWidth) / 2;

				delta = delta < 10 ? 10 : delta;

				this.params.slidesOffsetBefore = delta;
			}
		}
	});
}






/**
	* Swiper для блока "История компании".
	* @returns Created [a.gusev]
*/

function historySlider() {
	var swiperMain = new Swiper('.js-history', {
		slidesPerView: 1,
		lazy: false,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		}
	});

	var swiperNav = new Swiper('.js-history-nav', {
		spaceBetween: 10,
		centeredSlides: true,
		slidesPerView: 'auto',
		touchRatio: 0.2,
		slideToClickedSlide: true,
	});

	swiperMain.controller.control = swiperNav;
	swiperNav.controller.control = swiperMain;
}






/**
	* Ховер-блок на странице О компании
	* @returns Created [a.gusev]
*/

function hsSlider() {

	if (mobile === false) {

		var $slider = $('.js-hs-slider'),
			slide = $('.hs-slide', $slider);

		slide.on('mouseenter', function() {
			$(this).addClass('hs-hover').siblings().removeClass('hs-hover');
		});

	}

}






/**
	* Swiper в лендинг: карточки - а-ля фейсбук-галерея,
	* слева картинка - справа описание
	* @returns Created [a.gusev]
*/

function fbSlider() {

	var swiper = new Swiper('.js-fb-slider', {
		slidesPerView: 1,
		lazy: false,
		autoHeight: true,

		roundLengths: true,
		simulateTouch: false,

		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		},
	});
}



/**
	* Swiper в лендинг: карточки товаров,
	* слева картинка - справа описание
	* @returns Created [a.gusev]
*/

function productSliderSingle() {

	var swiper = new Swiper('.js-prod-slider', {
		slidesPerView: 4,
		lazy: false,

		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

		breakpoints: {
			1400: {
				slidesPerView: 3,
			},
			1024: {
				slidesPerView: 2,
			},
			640: {
				slidesPerView: 1,
			}
		}
	});
}







/**
	* Swiper в лендинг Учета: 50 на 50 текст и картинки,
	* слева картинка - справа описание
	* @returns Created [a.gusev]
*/

function sbsSlider() {

	var nav = $('.js-sbs-slider').find('.js-bullet-tabs');
	var tab = $('.js-bullet-tab', nav);
	var active = 'bullet-tab--active';

	var swiperContainer = '.js-sbs-slider';
	var preloader = $(swiperContainer).find('.swiper-preloader');

	var swiper = new Swiper('.js-sbs-slider', {
		slidesPerView: 1,
		lazy: false,
		autoHeight: true,
		init: false,
		roundLengths: true,
		simulateTouch: false,

		pagination: {
			el: nav,
			type: 'custom',
			clickable: true,
			renderCustom: function (swiper, current, total) {
				tab
					.eq(current - 1)
					.addClass(active)
					.siblings().removeClass(active);
			},
		},

	});

	swiper.on('init', function () {
		setTimeout(function(){
			$(swiperContainer).removeClass('swiper-is-loading');
			preloader.remove();
		},1000);

	});

	tab.on('click', function(event) {
		event.preventDefault();
		var num = $(this).index();
		swiper.slideTo(num);
		$.scrollTo(swiperContainer, 500,  {
			offset: {
				top: -120,
			}
		});
	});

	swiper.init();
}







/**
	* Swiper в лендинг Учета: слайдер для радио-plc,
	* @returns Created [a.gusev]
*/

function graphSlider() {
	var box = $('.js-graph-node'),
		nav = $('.js-bullet-tabs', box),
		tab = $('.js-bullet-tab', nav),
		tabContent = $('.graph-content', box),
		active = 'bullet-tab--active';

	tabContent.eq(0).show();
	tab.eq(0).addClass(active);

	tab.on('click', function(event) {
		event.preventDefault();
		var tab = $(this);
		var num = tab.index();

		tabContent.eq(num).fadeIn(500).siblings('.graph-content').fadeOut(500);
		tab.addClass(active).siblings().removeClass(active);
	});
}





/**
	* Swiper для главной, моб. версия.
	* @returns Created [a.gusev]
*/

function titleMobSlider() {
	var swiperMain = new Swiper('.js-title-mob-slider', {
		slidesPerView: 1,
		lazy: true,
		loop: true,
		autoplay: {
			delay: 5000,
		}
	});
}


function productListApp() {

	var app = $('.js-product-list'),
		tab = $('.tabs-row a', app),

		tabActive = $('.tabs-item--active', app).index() || 0,

		tabContentWrap = $('.product-list', app),
		tabContent     = $('.js-product-slider', app),

		length= $('.js-product-slider', app).length,
		initialized = 0;

	var loader = $('.product-list-loading');

	var swiper = new Swiper('.js-product-slider', {
		// init: false,
		slidesPerView: 4,
		initialSlide: tabActive,
		lazy: false,

		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

		breakpoints: {
			1400: {
				slidesPerView: 3,
			},
			1024: {
				slidesPerView: 2,
			},
			640: {
				slidesPerView: 1,
			}
		},

		on: {
			init: function() {

				initialized++;
				if (initialized == length) {

					tabContent.hide();

					tabContentWrap.css('height', 'auto');

					loader.slideUp(300);

					tabContent.eq(tabActive).fadeIn(500);

				}

			}
		}
	});

	tab.on('click', function(event) {
		event.preventDefault();

		var tab = $(this),
			index = tab.index(),
			active = 'tabs-item--active';

		tab.addClass(active).siblings().removeClass(active);

		tabContent.eq(index).fadeIn(500).siblings().hide();

	});

}



function Tabs($elem) {

	var instance = this;
	var $app = $elem;
	var $labels = $app.find('.js-labels');
	var $label  = $labels.find('a');

	var current = ($label.hasClass('is-active') === false) ? 0 : $labels.find('.is-active').data('label');

	var $tabList = $app.find('.js-tabs-list');
	var $tab = $tabList.find('.js-tab');
	var $currentTab;

	var $mobileLabel = $tabList.find('.mobile-label');

	var $header = $('.l-header');

	this.showTab = function(current) {
		event.preventDefault();
		$tab.hide();
		$tabList.find('.js-tab[data-tab="' + current +'"]').show();
	}

	this.showTabMobile = function(current) {
		event.preventDefault();

		$tab.slideUp('700');

		$tab.eq(current).slideDown('700', instance.scrollToTab);

		$currentTab = $tab.eq(current);
	}

	this.hideTabMobile = function() {
		event.preventDefault();
		$tab.slideUp('700');
		$mobileLabel.removeClass('is-active');
	}

	this.setActive = function(current) {
		event.preventDefault();
		$label.removeClass('is-active');
		$mobileLabel.removeClass('is-active');

		$labels.find('a[data-label="' + current + '"]').addClass('is-active');

		if ($currentTab) {
			$currentTab.prev().addClass('is-active');
		}
	}

	this.scrollToTab = function() {
		var offset = $header.height();
		$.scrollTo($mobileLabel.eq(current), 200, {
			offset: -offset
		});
	}

	this.init = function() {
		instance.showTab(current);
	}

	$label.on('click', function(){
		current = $(this).data('label');
		instance.showTab(current);
		instance.setActive(current);
	});

	$mobileLabel.on('click', function(){
		var $el = $(this);
		current = $el.data('mobile-label');

		if ($el.hasClass('is-active') === false) {
			instance.showTabMobile(current);
			instance.setActive(current);
		} else {
			instance.hideTabMobile();
		}

	});

	$tab.find('.fitvid').fitVids();

	this.init();
}





var portfolioSwiper;

function portfolioApp() {

	var app = $('.js-portfolio-list'),
		tab = $('.tabs-row a', app),

		tabContentWrap = $('.portfolio-list', app),
		tabContent     = $('.js-portfolio-slider', app),

		loader = $('.portfolio-list-loading'),

		slide = $('.swiper-slide', app);

	portfolioSwiper = new Swiper('.js-portfolio-slider', {
		// init: false,
		slidesPerView: 4,
		slidesPerColumn: 2,
		lazy: false,
		observer: true,

		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

		breakpoints: {
			1400: {
				slidesPerView: 3,
			},
			1024: {
				slidesPerView: 2,
			},
			640: {
				slidesPerView: 1,
				slidesPerColumn: 1,
			}
		},

		on: {
			init: function() {
				loader.slideUp(300);
			}
		}
	});

	tab.on('click', function(event) {
		event.preventDefault();

		var tab = $(this),
			index = tab.index(),
			type = tab.data('type'),
			active = 'tabs-item--active';

		tab.addClass(active).siblings().removeClass(active);

		if (type !== undefined) {

			$.each(slide, function(index, val) {

				var slide = $(val);

				if (slide.data('type') !== type) {
					slide.addClass('is-hidden');
				} else {
					slide.removeClass('is-hidden');
				}
			});

		} else {

			slide.removeClass('is-hidden');

		}

		function update() {
			portfolioSwiper.slideTo(0, 200, false);
			portfolioSwiper.update();
		}

		update();

	});

	tab.eq(0).click();

}






/**
	* Страница Дилеров,
	* dealer.csv - файл с данными, разделитель - точка с запятой,
	* парсинг данных в papaparse.js
	* работа с массивами в underscore.js
	* кастомные селекты Choices.js
	*
	* @returns Created [a.gusev]
*/

var selectCountries;
var selectCities;
var selectDirections;
var selectStreets;
var filteredCountries;
var filteredCities;
var storesCount;

var currentCity;

var tempArray = [];
var mapItems = [];

var dealerApp = {

	filterOptional: $('.filter-node-optional'),

	init: function() {

		var file = './dealers.csv';

		var countries = [],
			cities = [];

		storesCount = $('.js-stores-count');

		Papa.parse(file, {
			download: true,
			header: true,
			delimeter: ";",
			encoding: "UTF-8",
			skipEmptyLines: true,
			complete: function(results) {

				var array = getDealers.items;
				var countries;
				var countriesObj = [];

				if (_.isArray(array)) {

					countries = _.uniq(_.pluck(array, 'country'));

					$.each(countries, function(index, val) {

					// *Формируем объект для кастомного селекта
						var item = {value: val, label: val};

						if (index === 0) item.selected = true;

						countriesObj.push(item);
					});

					dealerApp.setupCountries(array, countriesObj);
				}

			}
		});

		this.getCurrentTab()

	},

	getCurrentTab: function() {
		var tabs = $('.js-dealers-tabs');

		var tab = tabs.find('input');

		var checked = tabs.find('input:checked');

		var currentID = '#' + checked.attr('id') + '-content';

		this.showCurrentTab(currentID);

		tab.on('change', function(event) {
			event.preventDefault();

			currentID = '#' + $(this).attr('id') + '-content';

			dealerApp.showCurrentTab(currentID);

		});
	},

	showCurrentTab: function(id) {
		var tabContent = $('.tab-content');

		tabContent.css('height', '0');

		$(id).css('height', 'auto');

	},

	setupCountries: function(array, countries) {

		selectCountries = new Choices('[data-countries]', {
			placeholder: false,
			placeholderValue: null,
			searchPlaceholderValue: null,
			searchEnabled: false,
			shouldSort: false,
			shouldSortItems: false,
			itemSelectText: '',
			noChoicesText: 'Данных нет',

			callbackOnInit: function() {

				this.setChoices(countries, 'value', 'label', true);

				var country = this.getValue(true);

				dealerApp.setupCities(array, country);
			},

		});

		selectCountries.passedElement.addEventListener('change', function(value) {

			var country = this.value;

			dealerApp.setupCities(array, country);
		});

	},

	setupCities: function(array, country) {

		filteredCountries = _.where(array, {country: country});

		var cities = _.uniq(_.pluck(filteredCountries, 'city'));

		var citiesObj = [];

		$.each(cities, function(index, val) {
		// *Формируем объект для кастомного селекта

			var item = {value: val, label: val};

			if (index === 0) item.selected = true;

			citiesObj.push(item);
		});

		if (selectCities !== undefined) {

			selectCities.setChoices(citiesObj, 'value', 'label', true);

		} else {
			selectCities = new Choices('[data-cities]', {
				placeholder: false,
				placeholderValue: null,
				searchPlaceholderValue: null,
				searchEnabled: false,
				shouldSort: false,
				shouldSortItems: false,
				itemSelectText: '',
				noChoicesText: 'Данных нет',

				callbackOnInit: function() {

					this.setChoices(citiesObj, 'value', 'label', true);

					currentCity = this.getValue(true);

					dealerApp.setupView(filteredCountries, 'city', currentCity);

					dealerApp.setupDirections(filteredCountries, currentCity);

					dealerApp.setupStreets(filteredCountries, currentCity);

					toggleCityOptions(currentCity);
				}

			});

			selectCities.passedElement.addEventListener('addItem', function(value) {
				currentCity = this.value;
				invokeChanges(currentCity);
			});

			selectCities.passedElement.addEventListener('change', function(value) {
				currentCity = this.value;
				invokeChanges(currentCity);
			});

		}

		function invokeChanges(currentCity) {
			dealerApp.setupView(filteredCountries, 'city', currentCity);
			selectStreets.setValueByChoice('all');
			selectDirections.setValueByChoice('all');
			dealerApp.setupDirections(filteredCountries, currentCity);
			dealerApp.setupStreets(filteredCountries, currentCity);

			toggleCityOptions(currentCity);
		}

		function toggleCityOptions(currentCity) {
			if (currentCity === 'Москва' || currentCity === 'Санкт-Петербург') {
				console.log(true);
				// dealerApp.filterOptional.removeClass('is-disabled');
				$('.filter-node-optional').removeClass('is-disabled');
			} else {
				console.log(false);
				// dealerApp.filterOptional.addClass('is-disabled');
				$('.filter-node-optional').addClass('is-disabled');
			}
		}

	},

	setupDirections: function(array, city) {
		filteredCities = _.where(array, {city: city});

		var directionsObj = [{value: 'all', label: 'Все', selected: true}];

		var directions = _.uniq(_.flatten(_.pluck(filteredCities, 'description_array')));

		var uniqueList = _.uniq(directions, function(item, key, a) {
			return item.a;
		});

		_.map(uniqueList[0], function(key, value) {
			if (value) {
			directionsObj.push({value: value, label: key});
			}
		});

		if (selectDirections !== undefined) {
			selectDirections.setChoices(directionsObj, 'value', 'label', true);
		} else {
			selectDirections = new Choices('[data-directions]', {
				placeholder: 'Все',
				placeholderValue: null,
				searchPlaceholderValue: null,
				searchEnabled: false,
				shouldSort: false,
				shouldSortItems: false,
				itemSelectText: '',
				noChoicesText: 'Данных нет',

				callbackOnInit: function() {

					this.setChoices(directionsObj, 'value', 'label', true);

					var direction = this.getValue(true);
				}

			});

			selectDirections.passedElement.addEventListener('change', function(value) {
				var value = this.value;

				selectStreets.setValueByChoice('all');

				if (value !== 'all') {
					dealerApp.setupView(filteredCities, 'direction', value);
				} else {
					dealerApp.setupView(filteredCountries, 'city', currentCity);
				}
			});
		}

	},

	setupStreets: function(array, city) {
		filteredCities = _.where(array, {city: city});

		var streets = _.uniq(_.pluck(filteredCountries, 'street'));
		var streetsObj = [{value: 'all', label: 'Все', selected: true}];

		$.each(streets, function(index, val) {
			var item = {value: val, label: val};
			streetsObj.push(item);
		});

		if (selectStreets !== undefined) {
			selectStreets.setChoices(streetsObj, 'value', 'label', true);
		} else {
			selectStreets = new Choices('[data-streets]', {
				placeholder: 'Все',
				placeholderValue: null,
				searchPlaceholderValue: null,
				searchEnabled: false,
				shouldSort: false,
				shouldSortItems: false,
				itemSelectText: '',
				noChoicesText: 'Данных нет',

				callbackOnInit: function() {
					this.setChoices(streetsObj, 'value', 'label', true);
					var street = this.getValue(true);
				}
			});

			selectStreets.passedElement.addEventListener('change', function(value) {
				var value = this.value;

				selectDirections.setValueByChoice('all');

				if (value !== 'all') {
					dealerApp.setupView(filteredCities, 'street', value);
				} else {
					dealerApp.setupView(filteredCountries, 'city', currentCity);
				}
			});
		}
	},

	setupView: function(filteredArray, type, value) {

		function parseElems() {
			if (type === 'city') {
				mapItems = _.where(filteredArray, {city: value});
			}

			if (type === 'direction') {
				var objDirections = [];
				_.map(filteredArray, function(item){
					var item;
					var description_array = item.description_array;

					$.each(description_array, function(index, val) {
						if (index === value) {
							objDirections.push(item);
						}
					});
				});

				mapItems = objDirections;
			}

			if (type === 'street') {
				mapItems = _.where(filteredArray, {street: value});
			}
		}

		parseElems();

		storesCount.html(mapItems.length);

		var template = $('#tmpl-place').html();

		var target   = $('#places-list');

		var rendered = $.tmpl(template, mapItems);

		target.html(rendered);

		this.getLatLng(mapItems);

		target.delegate('.place-map-label', 'click', function() {
			event.preventDefault();
			var currentID = '#tab-2-content';

			var latlng = $(this).data('latlng');

			$('.js-dealers-tabs').find('#tab-1').prop('checked', false);
			$('.js-dealers-tabs').find('#tab-2').prop('checked', true);

			dealerApp.showCurrentTab(currentID);
			dealerApp.zoomTo(latlng);
		});

	},

	getLatLng: function(mapItems) {

		locations = [];

		$.each(mapItems, function(index, val) {

			var latlng = [];

			var lat = parseFloat(val.latlng.split(',', 2)[0]);
			var lng = parseFloat(val.latlng.split(',', 2)[1]);

			latlng.push(lat);
			latlng.push(lng);

			locations.push(latlng);
		});

		if (dealersMap !== undefined) {
			this.setLocations(locations, mapItems);
		}

	},

	setLocations: function(locations, mapItems) {

		var marker, i;

		var bounds = new google.maps.LatLngBounds();

		var infowindow = new google.maps.InfoWindow({
			maxWidth: 300,
			content: "Загрузка..."
		});

		for (i = 0; i < locations.length; i++) {

			marker = new google.maps.Marker({
				position: new google.maps.LatLng(locations[i][0], locations[i][1]),
				map: dealersMap,
				icon: dealersMarkerImage,
				html: '<p>' + mapItems[i].name + '</p><p>' + mapItems[i].description + '</p><p><a href="http://' + mapItems[i].url + '" target="_blank">' + mapItems[i].url + '</a></p><p>' + mapItems[i].phones + '</p>'
			});

			google.maps.event.addListener(marker, "click", function () {
				infowindow.open(dealersMap, this);
				infowindow.setContent(this.html);
			});

			bounds.extend(new google.maps.LatLng(locations[i][0], locations[i][1]));
		}

		dealersMap.setCenter(bounds.getCenter());

		dealersMap.fitBounds(bounds, {padding: [50, 50] });
	},

	zoomTo: function(latlng) {
		var latlng = latlng.split(',');

		dealersMap.setZoom(16);
		dealersMap.panTo(new google.maps.LatLng(latlng[0], latlng[1]));

		$.scrollTo($('.app-dealer'), 500, {
			easing: 'easeInOutCubic',
			offset: 0
		});
	}
}









var directionsDisplay;
var directionsService

function mapsInit() {

	if ($('#contact_map').length > 0){

		$(function(){

			directionsService = new google.maps.DirectionsService();

			google.maps.visualRefresh = true;

			function initialize_map() {

				directionsDisplay = new google.maps.DirectionsRenderer();

				var mapOptions = {
					scrollwheel: false,
					zoom: 15,
					center: new google.maps.LatLng(ctPos[0], ctPos[1]),
					styles: styleMap
				};
				contactMap = new google.maps.Map(document.getElementById('contact_map'), mapOptions);

				var image = new google.maps.MarkerImage('i/map-marker.png',

				new google.maps.Size(67, 80),

				new google.maps.Point(0,0),

				new google.maps.Point(30, 80));

				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(ctPos[0], ctPos[1]),
					map: contactMap,
					icon:image
				});

				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(contactMap, marker);
				});
			}

			google.maps.event.addDomListener(window, 'load', initialize_map);

		}());

	}


	if ($('#dealersMap').length > 0){

		$(function(){

			google.maps.visualRefresh = true;

			function initialize_map() {

				var mapOptions = {
					scrollwheel: false,
					zoom: 3,
					maxZoom: 17,
					center: new google.maps.LatLng(53.898396, 27.542926),
					styles: styleMap
				};

				dealersMap = new google.maps.Map(document.getElementById('dealersMap'), mapOptions);

				dealersMarkerImage = {
					url: 'i/map-marker.png',
					size: new google.maps.Size(67, 70),
					anchor: new google.maps.Point(27, 70),
					labelOrigin: new google.maps.Point(27, 35),
				};

				dealerApp.setLocations(locations, mapItems);

			}

			google.maps.event.addDomListener(window, 'load', initialize_map);

		}());

	}

}

function topCalcRoute() {
	var start = mypos;
	var end = new google.maps.LatLng(ctPos[0], ctPos[1]);

	console.log(end);
	var request = {
		origin: start,
		destination: end,
		travelMode: 'DRIVING'
	};
	directionsService.route(request, function(result, status) {
		if (status == 'OK') {
			directionsDisplay.setDirections(result);
		}
	});

	directionsDisplay.setMap(contactMap);
}

function topDisableRoute() {
	var end = new google.maps.LatLng(ctPos[0], ctPos[1]);
	if (directionsDisplay) {
		directionsDisplay.setMap(null);
		contactMap.panTo(end);
		contactMap.setZoom(15);
	}
}


function checkNewSiteCookie(){

	var popup = $('.js-newsite');

	var close = $('.js-newsite-close');

	var status = Cookies.get('newsite') || 'true';

	if (status === "false") {

		popup.remove();

	} else {

		Cookies.set('newsite', "false");

		popup.addClass('show');

		close.on('click', function(event) {
			event.preventDefault();

			popup.removeClass('show');

		});

	}

};



function cuForm() {
	var form = $('.js-cu-form'),
		url = form.attr('action'),
		submit = form.find('.js-cu-form-submit');

	var successScreen = form.siblings('.cu-form-success');

	var $name = form.find('[name="name"]'),
		$email = form.find('[name="email"]'),
		$message = form.find('[name="message"]'),
		$subject = form.find('[name="category"]');

	formValidate(form);

	submit.on('click', function(event) {
		event.preventDefault();

		var isValid = form.parsley().validate();

		if (isValid) {

			$.post(url, form.serialize(), function(data, textStatus, xhr) {

				form.slideUp();

				successScreen.slideDown();

			});

		}

	});

}



function formValidate(form) {

	form.parsley({
		trigger: 'keypress',
		errorClass: 'input--error',
		successClass: 'input--success',
		errorsWrapper: '<span class="input-note-error"></span>',
		errorTemplate: '<span></span>'
	});
}




function topnavCatalog() {
	var link = $('#topnav-catalog-link'),
		menu = $('#topnav-catalog'),
		trigger = link.parent().siblings(),
		timer;

	link.on('mouseenter', function() {

		menu.addClass('topnav-catalog--show');

	});

	link.on('mouseleave', function() {

		timer = setTimeout(function(){
			menu.removeClass('topnav-catalog--show');
		},300);

	});

	trigger.on('mouseenter', function() {
		clearTimeout(timer);
		menu.removeClass('topnav-catalog--show');
	});

	menu.on('mouseenter', function() {

		clearTimeout(timer);

	});

	menu.on('mouseleave', function() {

		menu.removeClass('topnav-catalog--show');

	});
}






function regForm() {

	var $reg     = $('.js-reg'),
		$loading = $reg.find('.js-reg-loading'),
		$regform = $reg.find('.js-reg-form'),
		$success = $reg.find('.js-reg-form-success'),
		$error   = $reg.find('.js-reg-form-error');

	$regform.parsley({
		trigger: 'keypress',
		errorClass: 'input--error',
		successClass: 'input--success',
		errorsWrapper: '<span class="input-note-error"></span>',
		errorTemplate: '<span></span>'
	});

	if ($('.reg-form-step').length > 0) {

		var $sections = $('.reg-form-step'),
			$steps    = $('.js-reg-steps'),
			$step_num = $steps.find('.reg-step'),
			$navigation = $('.form-navigation'),
			$prev = $navigation.find('.js-reg-prev'),
			$next = $navigation.find('.js-reg-next'),
			$submit = $navigation.find('.js-reg-submit'),
			$submitButton = $submit.find('input'),
			active = 'reg-step--active';

		function navigateTo(index) {
			var atTheEnd = index >= $sections.length - 1;

			$sections.removeClass('current').slideUp('300');

			$sections.eq(index).addClass('current').slideDown('300');

			$prev.css('visibility', index > 0 ? 'visible' : 'hidden');

			$next.toggle(!atTheEnd);

			$submit.toggle(atTheEnd);

			$step_num.removeClass(active).eq(index).addClass(active);

		}

		function curIndex() {
			return $sections.index($sections.filter('.current'));
		}

		$prev.on('click', function(event) {
			event.preventDefault();
			navigateTo(curIndex() - 1);
			$error.slideUp('300');
		});

		$next.on('click', function(event) {
			event.preventDefault();
			if ($regform.parsley().validate({group: 'block-' + curIndex()}))
				navigateTo(curIndex() + 1);
		});

		$submitButton.on('click', function(event) {
			event.preventDefault();

			if ($regform.parsley().validate({group: 'block-' + curIndex()})) {
				$regform.submit();
			}
		});

		$regform.ajaxForm({
			beforeSubmit: function (formData, $form, options) {
				console.log(formData);
				return true;
			},
			success: function (data, statusText, xhr, $form) {

				console.log(data, statusText);
				data = $.parseJSON(data);

				if (data.result > 1) {
				$steps.slideUp('300');
				$regform.slideUp('300');
				$success.slideDown('300');

				} else {
					$error.slideDown('300');
				}
			}
		});

		$.each($sections, function(index, section) {
			$(section).find(':input').attr('data-parsley-group', 'block-' + index);
		});

		navigateTo(0);

		$success.hide();
		$error.hide();
		$loading.hide();
		$reg.show();
		$steps.show();
		$navigation.show();
	}
}


function freeze(type, state) {

	var body = $('body'),
		page = $('.page-wrap');

	if (state === true) {

		body
			.addClass(type + '-is-visible')
			.css({
				'overflow': 'hidden',
				'height': 'calc(100vh + ' + scrolltop + 'px)'
			});

		page.css({
			'padding-right': scrollWidth + 'px'
		});

	} else {

		body
			.removeClass(type + '-is-visible')
			.removeAttr('style');

		page.removeAttr('style');
	}
}


function popupEvents() {

	$('.popup').off().on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
	});

	$('.js-popup-open').off().on('click', function(event) {
		event.preventDefault();

		var link = $(this);

		var url =   link.attr('href') || link.data('href'),
			title = link.data('popup-title') || link.text();

		Popup.open(url, title);
	});

	$('.js-popup-close').off().on('click', function(event) {
		event.preventDefault();
		Popup.close();
	});

	$('.js-popup').off().on('click', function(event) {
		event.preventDefault();
		Popup.close();
	});

	$(document).off().on('keyup', function(e) {
		if (e.keyCode === 27) Popup.close();
	});
}

(function($){
	$.fn.focusTextToEnd = function(){
		this.focus();
		var $thisVal = this.val();
		this.val('').val($thisVal);
		return this;
	}
}(jQuery));

function personalData() {

	var form = $('.js-personal-data'),
		editable = $('.js-editable', form),
		input = editable.find('input'),
		inputSave = editable.find('.field-editable-save'),
		buttonSaveForm = $('.js-button-save', form);

	$.each(input, function(index, val) {

		var input = $(this),
			value = this.value;

		$('<div class="input-ghost"><span>' + value + '</span></div>').insertAfter(input);

	});

	var clearFormStatus = function() {
		form.removeClass('edited');

		$.each(editable, function(index, val) {
			$(this).removeClass('edited');
		});

		buttonSaveForm.prop('disabled', true);
		buttonSaveForm.attr('disabled');
	}

	editable.on('click', function(event) {
		event.preventDefault();

		var box = $(this),
			input = box.find('input'),
			ghost = box.find('.input-ghost span');

		box.addClass('active');
		input.focusTextToEnd();

		input
		.on('keyup', function(event) {

			var keycode = (event.keyCode ? event.keyCode : event.which);
			if (keycode == '13') {
				event.preventDefault();
				$(this).blur();
				return false;
			}

			box.addClass('edited');

			form.addClass('edited');

			ghost.text(this.value);

			buttonSaveForm.removeAttr('disabled');
		})
		.on('blur', function(event) {
			box.removeClass('active');
			input.off('keypress');
		});

	});

	inputSave.on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();

		// var box = $(this).parent('.js-editable'),
		// 	input = box.find('input'),
		// 	ghost = box.find('.input-ghost span');

		// box.removeClass('active');
		// input.off('keypress');
	});

	buttonSaveForm.on('click', function(event) {
		event.preventDefault();

		var data = form.serialize();

		console.log(data);

		$.post('/path/to/file', {save: 'yes'}, function(data, textStatus, xhr) {
			console.log('success');
			clearFormStatus();
		})
		.fail(function() {
			console.log('error sending form');
			clearFormStatus();
		});

	});

	form.addClass('show');
}


function personalHistory() {
	var $entry = $('.personal-basket-item');

	$entry.on('click', '.js-history-toggle', function(event) {
		event.preventDefault();
		var $content = $(this).parents('.js-history-head').next();
		$content.slideToggle(100);
	});
}

function jsInputNumber() {
	var $input = $('.js-number-input');

	$.each($input, function(index, val) {
		var $input = $(this);
		var $wrap = $input.parent();
		var $button = $wrap.find('button');
		var value = $input.val();
		var maxlength = 999;
		var delta;
		var result;

		$button.on('click', function(event) {
			event.preventDefault();
			var $button = $(this);
			delta = $button.data('delta');

			if ((delta < 0 && value <= 1) || (delta > 0 && value >= maxlength)) return false;

			result = parseInt(value) + parseInt(delta);
			value = result;
			$input.val(result);
			$input.trigger('change');
		});

		$input.on('input', function(event) {
			event.preventDefault();
			var input = this;
			if (this.value < 1) {
				value = 1;
				this.value = 1;
			} else if (this.value > maxlength) {
				value = maxlength;
				this.value = maxlength;
			} else {
				value = $input.val();
			}
			$input.trigger('change');
		});
	});
}


function personalBasket2() {

	var $basketCleanup = $('.js-basket-cleanup');

	var $item = $('.js-basket-item');
	var $basketPrice = $('.js-basket-price');
	var $basketDiscount = $('.js-basket-discount');

	var $total = $('.js-total');
	var total;

	var basketDiscount = $('.js-basket-discount').val();
	var overallDis = 0;

	var basketSum = 0;
	var basketObj = [];

	function getItems() {
		$item = $('.js-basket-item');
		console.log($item);
	}

	function init() {
		$.each($item, function(index, val) {
			var $item = $(this);
			var $itemRemove = $item.find('.js-basket-item-remove');
			var $quantityInput = $item.find('.js-number-input');
			var quantity = $quantityInput.val();
			sumItems(index, $item, quantity);

			$quantityInput.on('change', function(event) {
				event.preventDefault();
				quantity = this.value;
				sumItems(index, $item, quantity);
			});

			$itemRemove.on('click', function(event) {
				event.preventDefault();
				$item.slideUp();
				getItems();
			});
		});
	}

	function sumItems(index, $item, quantity) {
		var price = $item.find('.js-basket-item-price').data('price');
		var result = parseInt(quantity) * price;
		var $sumEl = $item.find('.js-basket-item-sum');

		basketObj[index] = result;

		$sumEl.text(result);
		basketCount();
	}

	function basketCount() {
		basketSum = basketObj.reduce(function(accumulator, currentValue) {
			return accumulator + currentValue;
		});

		$basketPrice.text(basketSum);
	}

	init();
}



var personalBasket;
var personalBasketList = [];
(function($){
	if ($('.js-personal-basket').length > 0) {
		personalBasket = new PersonalBasket();
	}
})(jQuery);

function PersonalBasket() {
	var instance = this;

	var $basket = $('.js-personal-basket');
	var $basketCleanup = $('.js-basket-cleanup');
	var $product = $basket.find('.js-basket-product');
	var $productCount = $('.js-basket-products-count');

	var $basketEmpty = $('.js-basket-is-empty');

	this.productCount = function() {
		$product = $basket.find('.js-basket-product');
		count = $product.length;
		$productCount.text(count);

		if (count < 1) {
			instance.hideBasket();
		}
	}

	this.hideBasket = function() {
		$basket.slideUp(200, $basket.remove);
		$basketEmpty.slideDown(200);
	}

	this.basketCleanup = function() {
		$product.slideUp(200, function(){
			$product.remove();
			instance.productCount();
		});
	}

	this.initProducts = function() {
		$.each($product, function(index, val) {
			new BasketProduct($basket, index, val);
			instance.productCount();
		});
	}

	this.initProducts();

	$basketCleanup.on('click', instance.basketCleanup);
}

function BasketProduct($basket, index, elem) {
	var instance = this;
	var $product = $(elem);
	var $remove = $product.find('.js-basket-product-remove')
	var $numberInput = $product.find('.js-number-input');

	var productPrice = $product.find('.js-basket-product-price').data('price');
	var $productSum = $product.find('.js-basket-product-sum');

	var $basketPrice = $basket.find('.js-basket-price');
	var basketPrice = 0;

	var discountValue = $basket.find('.js-basket-discount-value').val();
	var $discount = $basket.find('.js-basket-discount');
	var discount = 0;

	var $total = $basket.find('.js-total');
	var total = 0;

	personalBasketList.push(productPrice);

	this.update = function() {
		var number = $numberInput.val();
		instance.productSum(number);
	}

	this.remove = function() {
		$product.slideUp(200, function(){
			$product.remove();
			personalBasketList[index] = 0;
			instance.basketCalc();
			personalBasket.productCount();
		});
	}

	this.productSum = function(number) {
		var productSum = productPrice * number;
		$productSum.text(productSum);
		personalBasketList[index] = productSum;
		instance.basketCalc();
	}

	this.basketCalc = function() {
		basketPrice = personalBasketList.reduce(function(accumulator, currentValue) {
			return accumulator + currentValue;
		});

		$basketPrice.text(basketPrice);

		discount = instance.discountCalc();
		total = basketPrice - discount;

		$total.text(total);
		$discount.text(discount);
	}

	this.discountCalc = function() {
		var percent = discountValue;
		return (basketPrice * (percent/100)).toFixed(0);
	}

	$remove.on('click', instance.remove);

	$numberInput.on('change', instance.update);

	function init() {
		instance.update();
	}

	init();
}

/**
	* Слайдер для блока "Продукт".
	* @returns Created [a.gusev]
*/

function cardSlider() {

	// pCardItems defined @template
	//
	var pCardItemsFiltered = undefined;

	var slider_items = pCardItemsFiltered || pCardItems;

	var slider = $('.js-card-slider'),
		nav    = $('.js-card-slider-nav');

	var colors = $('.js-device-colors li'),
		link     = colors.find('a'),
		filtered = colors.length > 0,
		active   = colors.parent().find('.active a').attr('href');

	var priceEl = $('.json-price');
	var priceOldEl = $('.json-price-old');
	var button = $('.json-button');

	var slider_markup = '<div data-filter="${skin}"><img data-lazy="${src}"></div>';

	var currentSlide = 0;

	var filterByColor = function() {

		slider
			.slick('slickUnfilter')
			.slick('slickFilter', '[data-filter="'+active+'"]');

		nav
			.slick('slickUnfilter')
			.slick('slickFilter', '[data-filter="'+active+'"]');

		slider_items = _.where(pCardItems, {'skin' : active });

		var id = slider_items[0].id;
		var price = slider_items[0].price;
		var priceOld = slider_items[0]['price-old'];

		if (price) setPrice(price, priceOld);
		if (id) setButtonId(id);

		openerHandler();
	}

	var opener = $('.js-cardgallery-opener');

	var openerHandler =  function() {
		opener.off('click');

		if (opener.data('lightGallery')) {
			opener.data('lightGallery').destroy(true);
		}

		opener.on('click', function(event) {
			event.preventDefault();

			var $lg = $(this);

			$lg.lightGallery({
				closable: false,
				dynamic: true,
				dynamicEl: slider_items,
				backdropDuration: 500,
				download: false,
				counter: true,
				hash: false,
				share: false,
				zoom: false,
				fullScreen: false,
				preload: 1
			});

			opener.on('onAfterOpen.lg',function(event){
				opener.data('lightGallery').slide(currentSlide);
			});
		});
	}

	$.template('sliderTemplate', slider_markup);

	$.tmpl('sliderTemplate', slider_items).appendTo(slider);

	$.tmpl('sliderTemplate', slider_items).appendTo(nav);

	slider.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		arrows: false,
		centerPadding: '0px',
		asNavFor: '.js-card-slider-nav',
		vertical: true,
		lazyLoad: 'ondemand',
		prevArrow: '<div class="card-slider-arrow"><svg viewBox="0 0 128 128"><use xlink:href="#ico-up"></use></svg></div>',
		nextArrow: '<div class="card-slider-arrow"><svg viewBox="0 0 128 128"><use xlink:href="#ico-down"></use></svg></div>',
		// infinite: false,
		responsive: [
			{
				breakpoint: 767,
				settings: {
					arrows: true
				}
			}
		]
	});

	slider.on('afterChange', function() {
		currentSlide = slider.slick('slickCurrentSlide');
	});

	nav.slick({
		asNavFor: '.js-card-slider',
		centerMode: true,
		vertical: true,
		centerPadding: '0px',
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		focusOnSelect: true,
		prevArrow: '<div class="card-slider-arrow"><svg viewBox="0 0 128 128"><use xlink:href="#ico-up"></use></svg></div>',
		nextArrow: '<div class="card-slider-arrow"><svg viewBox="0 0 128 128"><use xlink:href="#ico-down"></use></svg></div>',
		lazyLoad: 'ondemand',
		// infinite: false,
		responsive: [
			{
				breakpoint: 767,
				settings: {
					vertical: false,
					adaptiveHeight: true
				}
			}
		]
	});

	if (active !== undefined) {

		filterByColor(active);

		link.on('click', function(event) {
			event.preventDefault();
			var el = $(this);

			el.parent()
				.addClass('active')
				.siblings()
				.removeClass('active');

			active = el.attr('href');

			filterByColor(active);
		});
	}

	function setPrice(price, priceOld) {
		priceEl.text(price);
		priceOldEl.text(priceOld);
	}

	function setButtonId(id) {
		button.attr('data-id', id);
	}

	openerHandler();
}

function subscribeForm() {

	var $box = $('.js-subscribe');
	var $header = $box.find('.js-subscribe-header');
	var $form = $box.find('.js-subscribe-form');
	var $submit = $box.find('.js-submit');
	var $successScreen = $box.find('.js-subscribe-success');
	var $errorScreen = $box.find('.js-subscribe-error');
	var data;

	$form.parsley({
		trigger: 'keypress',
		errorClass: 'input--error',
		successClass: 'input--success',
		errorsWrapper: '<span class="input-note-error"></span>',
		errorTemplate: '<span></span>'
	});

	$form.ajaxForm({
		beforeSubmit: function (formData, $form, options) {
			$errorScreen.slideUp();
			return true;
		},
		success: function (data, statusText, xhr, $form) {
			data = $.parseJSON(data);

			if (data.result > 1) {

			$form.slideUp();
			$header.slideUp();
				$successScreen.slideDown();
				$successScreen.html(data.text);

			setTimeout(function(){
				$box.slideUp();
				}, 5000);

			} else {
				$errorScreen.slideDown();
				$errorScreen.html(data.text);
			}
		}
	});
}

function producsList() {
	var $product = $('.js-product');

	$.each($product, function(index, val) {
		var product = new ProductListCard(val);
	});
}

function ProductListCard(elem) {
	var $elem = $(elem);
	var data = $elem.data('json');

	var $url = $('.json-url', $elem);
	var $image = $('.json-image', $elem);
	var $button = $('.json-button', $elem);
	var $price = $('.json-price', $elem);
	var $priceOld = $('.json-price-old', $elem);

	var $colors = $('.json-colors', $elem);
	var $color = $('.json-color', $colors);
	var $parent = $color.parent();

	var $info = $('.js-product-touch', $elem);

	var tmpl = '';
	var $preloader = $('.js-preloader', $elem);

	function setElement(index) {

		$preloader.css('opacity', '1');
		$image.css('opacity', '0');

		if (data[index]) {
			$image.attr('data-src', data[index].image);
			$url.attr('href', data[index].url);
			$button.attr('href', data[index].button);
			$button.attr('data-id', data[index].id);
			$price.text(data[index].price);
			$priceOld.text(data[index]['price-old']);
		}

		$image.unveil(0, function() {
			$image.load(function() {
				$image.css('opacity', '1');
				$preloader.css('opacity', '0');
			});
		});
	}

	function templateColors(index) {
		$.each(data, function(index, val) {
			tmpl = tmpl + '<li><a href="' + val.color +'" style="background-color: ' + val.color +';" class="json-color"></a></li>';
		});

		$colors.html($(tmpl));
		$color = $('.json-color', $colors);

		if ($color.length > 1) {
			$color.off('click').on('click', function(event) {
				event.preventDefault();
				var index = $(this).parent().index();
				setActiveColor(index);
				setElement(index, true);
			});

			setActiveColor(index);
		}
	}

	function setActiveColor(index) {
		$parent = $color.parent();
		$parent.siblings('.active').removeClass('active');
		$parent.eq(index).addClass('active');
	}

	function toggleInfo() {
		$elem.toggleClass('product-touch-active');
	}

	$info.off().on('click', toggleInfo);

	function init() {
		setElement(0);
		templateColors(0);
	}

	init();
}

(function($){
	var $product = $('.js-product');
	$.each($product, function(index, val) {
		var product = new ProductListCard(val);
	});
})(jQuery);



function newsFilter() {
	var $form = $('.js-news-filter');
	var $select = $form.find('select');

	$select.on('change', function(event) {
		$form.submit();
	});
}

function jsForm() {

	var $wrap    = $('.form-wrap'),
		$loading = $wrap.find('.js-form-loading'),
		$form    = $wrap.find('.js-form'),
		$success = $wrap.find('.js-form-success'),
		$error   = $wrap.find('.js-form-error');

	$form.parsley({
		trigger: 'keypress',
		errorClass: 'input--error',
		successClass: 'input--success',
		errorsWrapper: '<span class="input-note-error"></span>',
		errorTemplate: '<span></span>'
	});

	if ($('.form-step').length > 0) {

		var $sections = $('.form-step'),
			$steps    = $('.js-form-steps'),
			$step_num = $steps.find('.form-step'),
			$navigation = $('.form-navigation'),
			$prev = $navigation.find('.js-prev'),
			$next = $navigation.find('.js-next'),
			$submit = $navigation.find('.js-submit'),
			$submitButton = $submit.find('input'),
			active = 'form-step--active';

		function navigateTo(index) {
			var atTheEnd = index >= $sections.length - 1;

			$sections.removeClass('current').slideUp('300');

			$sections.eq(index).addClass('current').slideDown('300');

			$prev.css('visibility', index > 0 ? 'visible' : 'hidden');

			$next.toggle(!atTheEnd);

			$submit.toggle(atTheEnd);

			$step_num.removeClass(active).eq(index).addClass(active);

		}

		function curIndex() {
			return $sections.index($sections.filter('.current'));
		}

		$prev.on('click', function(event) {
			event.preventDefault();
			navigateTo(curIndex() - 1);
			$error.slideUp('300');
		});

		$next.on('click', function(event) {
			event.preventDefault();
			if ($form.parsley().validate({group: 'block-' + curIndex()}))
				navigateTo(curIndex() + 1);
		});

		$submitButton.on('click', function(event) {
			event.preventDefault();

			if ($form.parsley().validate({group: 'block-' + curIndex()})) {
				$form.submit();
			}
		});

		$form.ajaxForm({
			beforeSubmit: function (formData, $form, options) {
				console.log(formData);
				return true;
			},
			success: function (data, statusText, xhr, $form) {

				console.log(data, statusText);
				data = $.parseJSON(data);

				if (data.result > 1) {
				$steps.slideUp('300');
				$form.slideUp('300');
				$success.slideDown('300');

				} else {
					$error.slideDown('300');
				}
			}
		});

		$.each($sections, function(index, section) {
			$(section).find(':input').attr('data-parsley-group', 'block-' + index);
		});

		navigateTo(0);

		$success.hide();
		$error.hide();
		$loading.hide();
		$form.show();
		$steps.show();
		$navigation.show();
	}
}

function jsRegion(region) {

	var $box = $('.js-region-select'),
		$dialog = $box.find('.js-region-dialog'),
		$submit = $box.find('.js-button-submit'),
		$switch = $box.find('.js-button-switch'),
		$list   = $box.find('.js-region-list'),
		$name   = $box.find('.js-name'),
		$result = $box.find('.js-result'),
		$suggest = $box.find('.js-region-suggest');

	var $buttonSelectClose = $box.find('.js-region-select-close');
	var $buttonListClose = $box.find('.js-region-list-close');

	var cookie = getCookie();

	if (region === 'undefined') {
		showList(true);
	} else {
		showDialog(true);
	}

	$suggest.text(region);

	$switch.on('click', function(event) {
		event.preventDefault();
		showList();
	});

	$name.on('click', function(event) {
		event.preventDefault();
		var url = this.getAttribute('href');

		$name.removeClass('is-active');
		$(this).addClass('is-active');

		setResultUrl(url);
	});

	$submit.on('click', function(event) {
		event.preventDefault();
		var url = this.getAttribute('href');
		setCookie();
		gotoUrl(url);
	});

	$buttonSelectClose.on('click', function(event) {
		event.preventDefault();
		hideSelect();
	});

	$buttonListClose.on('click', function(event) {
		event.preventDefault();
		if (region === 'undefined') {
			hideSelect();
		} else {
			showDialog();
		}
	});

	$result.on('click', function(event) {
		event.preventDefault();
		var url = this.getAttribute('href');
		setCookie();
		gotoUrl(url);
	});


	function setCookie() {
		Cookies.set('RegionCheck', 'true', {path: '/'});
	}

	function getCookie() {
		return Cookies.get('RegionCheck');
	}

	function setResultUrl(url) {
		$result.attr('href', url);
	}

	function gotoUrl(url) {
		window.location.href = url;
	}

	function showList(fast) {
		if (fast) {
			$dialog.hide();
			$list.show();
		} else {
			$dialog.slideUp();
			$list.slideDown();
		}
		$box.addClass('wide');
	}

	function showDialog(fast) {
		if (fast) {
			$dialog.show();
			$list.hide();
		} else {
			$dialog.slideDown();
			$list.slideUp();
		}
		$box.removeClass('wide');
	}

	function hideSelect() {
		$box.removeClass('show');
	}

	function showSelect() {
		$box.addClass('show');
	}

	function init() {
		showSelect();
	}

	init();
}

var geolocationStatus, mypos;

function contactApp() {

	var $app = $('.js-contact-app'),
		$top = $('.js-bc-top', $app),
		$buttonToggle   = $app.find('.js-bc-view-toggle'),
		$buttonTopRoute = $top.find('.js-top-route-open'),

		$cardLocation  = $app.find('.card-location'),
		$buttonPlace = $cardLocation.find('.js-card-map-open'),
		$buttonRoute = $cardLocation.find('.js-card-route-open');

	var $template = $('#card-map');
	var placeHTML  = '<div class="card-map"><iframe width="100%" height="100%" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBQL00FgROUCp6WZvnPdEdiyhE3f49hYew&q=js_destination" allowfullscreen></iframe></div>'
	var routeHTML  = '<div class="card-map"><iframe width="100%" height="100%" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/directions?origin=js_origin&destination=js_destination&key=AIzaSyBQL00FgROUCp6WZvnPdEdiyhE3f49hYew" allowfullscreen></iframe></div>';

	$buttonToggle.on('click', function(event) {
		event.preventDefault();
		bcMapToggle();
		topDisableRoute();
	});

	$buttonTopRoute.on('click', function(event) {
		event.preventDefault();
		bcMapToggle();
		topCalcRoute();
	});

	$buttonPlace.on('click', function(event) {
		event.preventDefault();
		var $this = $(this);
		openCardMap('place', $this);

	});

	$buttonRoute.on('click', function(event) {
		event.preventDefault();
		var $this = $(this);
		openCardMap('route', $this);
	});

	function openCardMap(type, elem) {
		var url = elem.attr('href');
		var pos = elem.data('pos');

		if (type === 'place') {
			var $tmpl = placeHTML.replace("js_destination", pos);
			$template.html($tmpl);
		}

		if (type === 'route') {
			var $tmpl = routeHTML.replace("js_origin", mypos);
			var $tmpl = $tmpl.replace("js_destination", pos);
			$template.html($tmpl);
		}

		Popup.open(url, pos);
	}

	function setCardLocationLink(route) {
		if (route) {
			$buttonPlace.hide();
			$buttonRoute.show();
		}
	}

	function checkLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationFailure);
		}
		else {
			geolocationStatus = false;
			setCardLocationLink(false);
			console.log('Ваш браузер не поддерживает геолокацию');
		}
	}

	function geolocationSuccess(position) {
		var place, latlng, distance;
			mypos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);


		geolocationStatus = true;
		setCardLocationLink(true);
		$buttonTopRoute.show();
	}

	function geolocationFailure(positionError) {
		geolocationStatus = false;
		setCardLocationLink(false);
		console.log('Не удалось определить ваше местоположение');
	}

	function bcMapToggle() {
		$app.toggleClass('bc-map-is-visible');
	}

	checkLocation();
}

function qualityTable() {
	var $box = $('.js-quality'),
		$btn = $box.find('.js-quality-toggle'),
		$row = $box.find('.hidden');

	$btn.on('click', function(event) {
		event.preventDefault();
		$row.toggleClass('hidden');
		$btn.toggleClass('button--arrow-up');

		if ($btn.hasClass('button--arrow-up')) {
			$btn.find('span').text('Свернуть');
		} else {
			$btn.find('span').text('Все характеристики');
		}
	});
}