"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var $ = jQuery;
var btnToggle = document.querySelectorAll(".toggle-menu-mobile--js");
var menu = document.querySelector(".menu-mobile--js");
var link = document.querySelectorAll(".menu-mobile--js ul li a");
var body = document.querySelector("body");
var JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	// функции для запуска lazy
	// /LazyFunction
	modalCall: function modalCall() {
		// $('.popup-with-move-anim').magnificPopup({
		// 	type: 'inline',
		// 	fixedContentPos: true,
		// 	fixedBgPos: true,
		// 	overflowY: 'auto',
		// 	closeBtnInside: true,
		// 	preloader: false,
		// 	midClick: true,
		// 	removalDelay: 300,
		// 	mainClass: 'my-mfp-zoom-in',
		// 	tClose: 'Закрыть (Esc)',
		// }); 
		// // / modal window 
		// // modal галерея
		// $(".gal").each(function () {
		// 	$(this).find("a").magnificPopup({
		// 		type: 'image',
		// 		closeOnContentClick: false,
		// 		closeBtnInside: false,
		// 		mainClass: 'mfp-with-zoom mfp-img-mobile',
		// 		tClose: 'Закрыть (Esc)',
		// 		image: {
		// 			verticalFit: true,
		// 			// titleSrc: function(item) {
		// 			//   return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
		// 			// }
		// 		},
		// 		gallery: {
		// 			enabled: true,
		// 			tPrev: 'Назад (Кнопка влева)', // title for left button
		// 			tNext: 'Вперед (Кнопка вправа)', // title for right button
		// 			tCounter: '<span class="mfp-counter">%curr% из %total%</span>',
		// 		}
		// 	});
		// })
		// // /modal галерея
		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад" // PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"

				}
			}
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		});
	},
	// /magnificPopupCall
	toggleMenu: function toggleMenu() {
		btnToggle.forEach(function (element) {
			element.onclick = function () {
				btnToggle.forEach(function (element) {
					element.classList.toggle("on");
				});
				menu.classList.toggle("active");
				body.classList.toggle("fixed");
				return false;
			};
		});
	},
	closeMenu: function closeMenu() {
		btnToggle.forEach(function (element) {
			element.classList.remove("on");
		});
		menu.classList.remove("active");
		body.classList.remove("fixed");
	},
	mobileMenu: function mobileMenu() {
		// закрыть/открыть мобильное меню
		JSCCommon.toggleMenu();
		link.forEach(function (element) {
			element.onclick = function () {
				JSCCommon.toggleMenu();
			};
		});

		document.onmouseup = function (event) {
			var container = event.target.closest(".menu-mobile--js.active"); // (1)

			if (!container) {
				JSCCommon.closeMenu();
			}
		};
	},
	// /mobileMenu
	// табы  . 
	tabscostume: function tabscostume(tab) {
		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this).addClass('active').siblings().removeClass('active').closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active').eq($(this).index()).fadeIn().addClass('active');
		});
	},
	// /табы  . 
	// /nlineSVG
	// CustomInputFileCustomInputFile() {
	// 	const file = $(".add-file input[type=file]");
	// 	file.change(function () {
	// 		const filename = $(this).val().replace(/.*\\/, "");
	// 		const name = $(".add-file__filename  ");
	// 		name.text(filename);
	// 	});
	// },
	// /CustomYoutubeBlock
	inputMask: function inputMask() {
		// mask for input
		$('input[type="tel"]').attr("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}").inputmask("+9(999)999-99-99");
	} // /inputMask

};

function eventHandler() {
	// полифил для object-fit
	objectFitImages(); // Picture element HTML5 shiv

	document.createElement("picture"); // для свг

	svg4everybody({});
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask(); // JSCCommon.CustomInputFile();
	// добавляет подложку для pixel perfect

	$(".main-wrapper").after('<div class="screen" style="background-image: url(screen/main.jpg);"></div>'); // /добавляет подложку для pixel perfect
	// const url = document.location.href;
	// $.each($(".top-nav__nav a "), function () {
	// 	if (this.href == url) {
	// 		if ($(this).hasClass("top-nav__link") == true) {
	// 			$(this).addClass('top-nav__link-active');
	// 		}
	// 		if ($(this).hasClass("footer__link") == true) {
	// 			$(this).addClass('footer__link-active');
	// 		} 
	// 	}; 
	// }); 
	// /закрыть/открыть мобильное меню

	function heightses() {
		var w = $(window).width(); // $(".main-wrapper").css("margin-bottom", $('footer').height())
		// $(".otz__item .text-wrap ").height('auto').equalHeights();
		// 
		// скрывает моб меню

		var topH = $("header ").innerHeight();
		$(window).scroll(function () {
			if ($(window).scrollTop() > topH) {
				$('.top-nav  ').addClass('fixed');
			} else {
				$('.top-nav  ').removeClass('fixed');
			}
		}); // конец добавил

		if (window.matchMedia("(min-width: 992px)").matches) {
			JSCCommon.closeMenu();
		}
	}

	$(window).resize(function () {
		heightses();
	});
	heightses(); // листалка по стр

	$(" .top-nav li a, .scroll-link").click(function () {
		var elementClick = $(this).attr("href");
		var destination = $(elementClick).offset().top;
		$('html, body').animate({
			scrollTop: destination
		}, 1100);
		return false;
	});
	var icon = '<svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 492.004 492.004" style="enable-background:new 0 0 492.004 492.004;" xml:space="preserve" ><path d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z" ></path>';
	var arrl2 = ' <div class="r">' + icon,
			arrr2 = ' <div class="l">' + icon; // // карусель

	var defaultSlide = {
		speed: 600,
		infinite: true,
		arrows: true,
		mobileFirst: true,
		prevArrow: arrr2,
		nextArrow: arrl2,
		// autoplay: true,
		autoplaySpeed: 6000,
		lazyLoad: 'progressive'
	};
	$('.s-gal__slider--js').slick(_objectSpread({}, defaultSlide, {
		slidesToShow: 1,
		responsive: [{
			breakpoint: 1200,
			settings: {
				slidesToShow: 4
			}
		}, {
			breakpoint: 992,
			settings: {
				slidesToShow: 3
			}
		}, {
			breakpoint: 576,
			settings: {
				slidesToShow: 2,
				arrows: true
			}
		}]
	})); // $('.s-gal__slider\
	// ,.slider-for2 ')
	// 	.on('lazyLoaded', function (event, slick, image, imageSource) {
	// 		image.parent().css('background-image', 'url(' + image.attr('src') + ')');
	// 	});
	// slider
	// const swiper4 = new Swiper('.color-slider', {
	// 	// slidesPerView: 5,
	// 	slidesPerView: 'auto',
	// 	watchOverflow: true,
	// 	spaceBetween: 0,
	// 	freeMode: true,
	// 	watchOverflow: true,
	// 	slidesPerGroup: 3,
	// 	// centeredSlides: true,
	// 	loop: true,
	// 	loopFillGroupWithBlank: true,
	// 	touchRatio: 0.2,
	// 	slideToClickedSlide: true,
	// 	freeModeMomentum: true,
	// 	navigation: {
	// 		nextEl: '.swiper-button-next',
	// 		prevEl: '.swiper-button-prev',
	// 	},
	// });
	// modal window
	// или
	// $(".dropzone").dropzone({
	//  url: "/file/post",
	//  addRemoveLinks: true,
	//      acceptedFiles: 'image/*',
	//      uploadMultiple: true,
	//   });
	// $(".wow-wrap").each(function () {
	// const wowAnim = $(this).find(".s-dop__col," +
	//                 ".s-pick__col," +
	//                 ".s-condition__col");
	// wowAnim.each(function(i){
	// wowAnim.eq(i).attr("data-wow-delay", i*.1*2 + "s");
	//    const wow = new WOW({ mobile: false });
	//         wow.init();
	// });
	// });

	var gets = function () {
		var a = window.location.search;
		var b = new Object();
		var c;
		a = a.substring(1).split("&");

		for (var i = 0; i < a.length; i++) {
			c = a[i].split("=");
			b[c[0]] = c[1];
		}

		return b;
	}(); // form


	$("form").submit(function (e) {
		e.preventDefault();
		var th = $(this);
		var data = th.serialize();
		th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
		th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
		th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
		th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
		$.ajax({
			url: 'action.php',
			type: 'POST',
			data: data
		}).done(function (data) {
			$.fancybox.close();
			$.fancybox.open({
				src: '#modal-thanks',
				type: 'inline'
			}); // window.location.replace("/thanks.html");

			setTimeout(function () {
				// Done Functions
				th.trigger("reset"); // $.magnificPopup.close();
				// ym(53383120, 'reachGoal', 'zakaz');
				// yaCounter55828534.reachGoal('zakaz');
			}, 4000);
		}).fail(function () {});
	});
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
} // JSCCommon.LazyFunction();

/***/