// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }
const $ = jQuery;
const JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	body: document.querySelector("body"),

	modalCall() {
		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$(".sServises__btn").click(function () {
			$("#modal-servise .order").val("Заявка на " + $(this).parents(".sServises__wrap").find(".sServises__title--js").text())
			$("#modal-servise .servise-modal__row").html($(this).next().html())
		})
	},
	// /magnificPopupCall
	toggleMenu() {
		let _this = this;
		if (_this.btnToggleMenuMobile) {
			_this.btnToggleMenuMobile.forEach(function (element) {
				element.addEventListener('click', function () {

					_this.btnToggleMenuMobile.forEach(function (element) {
						element.classList.toggle("on");
					});
					_this.menuMobile.classList.toggle("active");
					_this.body.classList.toggle("fixed");

					return false;
				});
			});
		}
	},

	closeMenu() {
		let _this = this;
		if (_this.btnToggleMenuMobile && _this.menuMobile) {
			_this.btnToggleMenuMobile.forEach(function (element) {
				element.classList.remove("on");

			});
			_this.menuMobile.classList.remove("active");
			_this.body.classList.remove("fixed");
		}
	},

	mobileMenu() {
		// закрыть/открыть мобильное меню
		let _this = this;
		if (_this.btnToggleMenuMobile) {
			_this.toggleMenu();
			_this.menuMobileLink.forEach(function (element) {
				element.addEventListener('click', function (e) {
					console.log(element);
					_this.closeMenu();

				});
			})
			document.addEventListener('mouseup', function (event) {
				let container = event.target.closest(".menu-mobile--js.active"); // (1)
				if (!container) {
					_this.closeMenu();

				}
			});
		}
	},
	// /mobileMenu

	// табы  . 
	tabscostume(tab) {
		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).show().addClass('active');

		});
	},
	// /табы  
	inputMask() {
		// mask for input
		$('input[type="tel"]').attr("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}").inputmask("+9(999)999-99-99");
	}
	// /inputMask

};

function eventHandler() {
	// полифил для object-fit


	JSCCommon.modalCall();

	JSCCommon.tabscostume('tabs');

	JSCCommon.mobileMenu();

	JSCCommon.inputMask();

	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = 'main.jpg';
	if (screenName && x === "localhost:3000") {
		$(".main-wrapper").after(`<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}

	// /закрыть/открыть мобильное меню

	function heightses() {

		const w = $(window).width();

		// $(".main-wrapper").css("margin-bottom", $('footer').height())
		// $(".otz__item .text-wrap ").height('auto').equalHeights();
		// 
		// скрывает моб меню

		const topH = $(".top-nav").innerHeight();

		$(window).scroll(function () {
			if ($(window).scrollTop() > topH) {
				$('.top-nav  ').addClass('fixed');
			} else {
				$('.top-nav  ').removeClass('fixed');
			}
		});
		// конец добавил
		if (window.matchMedia("(min-width: 992px)").matches) {
			JSCCommon.closeMenu();
		}
	}

	$(window).resize(function () {
		heightses();

	});

	heightses();

	// листалка по стр
	$(" .top-nav li a, .scroll-link").click(function () {
		const elementClick = $(this).attr("href");
		const destination = $(elementClick).offset().top;

		$('html, body').animate({ scrollTop: destination - 60 }, 1100);

		return false;
	});

	let defaultSl = {

	}

	let dur = .3;
	let delay = dur;
	$('.section-title').each(function () {

		$(this).addClass("wow fadeInUp");
		$(this).attr("data-wow-duration", dur + 's');
		// $(this).attr("data-wow-delay", delay + 's')
	})

	$(".sClients__col ").each(function (i) {
		$(this).attr("data-wow-delay", delay * .01 * (i + .5) + 's')
	})

	$(" .sAbout__item").each(function (i) {
		$(this).attr("data-wow-delay", delay * .1 * (i + .5) + 's')
	})

	var wow = new WOW({
		mobile: false
	});
	wow.init();


	// $(".top-nav").sticky({ topSpacing: 0 });
	setTimeout(() => {

		$(".sContact__map-wrap").html($(".sContact__map-wrap").data('map'));
	}, 3000);





	var gets = (function () {
		var a = window.location.search;
		var b = new Object();
		var c;
		a = a.substring(1).split("&");
		for (var i = 0; i < a.length; i++) {
			c = a[i].split("=");
			b[c[0]] = c[1];
		}
		return b;
	})();
	// form
	$("form").submit(function (e) {
		e.preventDefault();
		const th = $(this);
		var data = th.serialize();
		th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
		th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
		th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
		th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
		$.ajax({
			url: 'action.php',
			type: 'POST',
			data: data,
		}).done(function (data) {

			$.fancybox.close();
			$.fancybox.open({
				src: '#modal-thanks',
				type: 'inline'
			});
			// window.location.replace("/thanks.html");
			setTimeout(function () {
				// Done Functions
				th.trigger("reset");
				// $.magnificPopup.close();
				// ym(53383120, 'reachGoal', 'zakaz');
				// yaCounter55828534.reachGoal('zakaz');
			}, 4000);
		}).fail(function () { });

	});
	$('.resp-tabs-js').easyResponsiveTabs({
		activate: function activate() { }
	});

	//sQusetions js
	let qItem = document.querySelectorAll(".q-item-js");
	qItem.forEach(function (el) {
		el.addEventListener('click', function () {
			let allItems = document.querySelectorAll('.q-item-js');
			let self = this;

			for (let item of allItems) {
				let currContent = item.querySelector('.q-content-js');

				if (item === self) {
					item.classList.toggle('active');
					currContent.classList.toggle('active');
				}
				else {
					item.classList.remove('active');
					currContent.classList.remove('active');
				}

			}

		})
	})

	function getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
	getCurrentYear('.current-year')

	var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
	if (isIE11) {
		$("body").prepend(`<p class="browsehappy container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p>`)

	}
	const sPhotoSlider = new Swiper('.sPhoto__slider--js', {
		// Optional parameters
		loop: true,
		slidesPerView: 'auto',
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 6,
		},
	
		// If we need pagination
		// pagination: {
		// 	el: '.swiper-pagination',
		// },
	
		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	
		// And if we need scrollbar
		// scrollbar: {
		// 	el: '.swiper-scrollbar',
		// },
	});

	$('.hover-el').hover(function(){
		let index = $(this).index();
		$(`.hover-el:nth-child(${index + 1})`).addClass('bg-accent');
	}, function(){
		let index = $(this).index();
		$(`.hover-el:nth-child(${index + 1})`).removeClass('bg-accent');
	})
	// let table = document.querySelector('.s-prices table');
	// let hoverEl = document.querySelectorAll('.hover-el');
	// hoverEl.forEach(function(el, index){
	// 	el.addEventListener('mouseenter', function(){
	// 		let hoverElems = document.querySelectorAll(`.hover-el:nth-child(${index})`);
	// 		console.log(index);
	// 		hoverElems.forEach(els=>{
	// 			els.classList.add('bg-accent');
	// 		});
	// 	});
	// });
	// if (table) {
	// 	table.addEventListener('mouseover', function(event, index){
	// 		let el = event.target.closest('.hover-el');
	// 		let elems = document.querySelectorAll('.hover-el');
	// 		if (!el) return;
	// 		console.log(Array.from(elems).indexOf(el));
	// 	});
	// }


	$(".btn-cookie").click(function(){

		writeCookie('cookie-block', 'hide', 30);
		document.querySelector(".cookie-block").classList.add("d-none")
	})

	function writeCookie(name, val, expires) {
		var date = new Date;
		date.setDate(date.getDate() + expires);
		document.cookie = name + "=" + val + "; path=/; expires=" + date.toUTCString();
	}

	
	function readCookie(name) {
		var matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
			));
			return matches ? decodeURIComponent(matches[1]) : undefined;
		}
	let test = readCookie('cookie-block');
	if (!test) document.querySelector(".cookie-block").classList.remove("d-none")
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
