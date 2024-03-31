AOS.init({
  duration: 800,
  easing: "slide",
});

(function ($) {
  "use strict";

  $(function () {
    $(window).stellar({
      responsive: true,
      parallaxBackgrounds: true,
      parallaxElements: true,
      horizontalScrolling: false,
      hideDistantElements: false,
      scrollProperty: "scroll",
    });

    var logo = $(".navbar-logo");
    var updateImageSource = function () {
      if ($(window).width() <= 992) {
        logo.attr("src", "images/logo_2.png");
      } else {
        logo.attr("src", "images/logo_1.png");
      }
    };
    updateImageSource();

    $(window).resize(function () {
      updateImageSource();
    });

    var fullHeight = function () {
      $(".js-fullheight").css("height", $(window).height());
      $(window).resize(function () {
        $(".js-fullheight").css("height", $(window).height());
      });
    };
    fullHeight();

    // Scrollax
    $.Scrollax();

    var carousel = function () {
      $(".home-slider").owlCarousel({
        loop: true,
        autoplay: true,
        margin: 10,
        animateOut: "fadeOut",
        animateIn: "fadeIn",
        nav: false,
        autoplayHoverPause: false,
        items: 1,
        navText: [
          "<span class='ion-md-arrow-back'></span>",
          "<span class='ion-chevron-right'></span>",
        ],
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 1,
          },
          1000: {
            items: 1,
          },
        },
      });
      $(".services-slider").owlCarousel({
        autoplay: true,
        autoHeight: true,
        center: true,
        loop: true,
        items: 1,
        margin: 30,
        stagePadding: 0,
        nav: false,
        dots: true,
        navText: [
          '<span class="ion-ios-arrow-back">',
          '<span class="ion-ios-arrow-forward">',
        ],
        responsive: {
          0: {
            items: 1,
          },
          900: {
            items: 2,
          },
          1200: {
            items: 3,
          },
        },
      });
      $(".testimonies-slider").owlCarousel({
        autoplay: true,
        autoHeight: true,
        center: true,
        loop: true,
        items: 1,
        margin: 30,
        stagePadding: 0,
        nav: false,
        dots: true,
        navText: [
          '<span class="ion-ios-arrow-back">',
          '<span class="ion-ios-arrow-forward">',
        ],
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 1,
          },
          1000: {
            items: 1,
          },
        },
      });
    };
    carousel();

    // scroll
    var scrollWindow = function () {
      $(window).scroll(function () {
        var $w = $(this),
          st = $w.scrollTop(),
          navbar = $(".navbar-scrolled"),
          sd = $(".js-scroll-wrap");

        if (st > 150) {
          if (!navbar.hasClass("scrolled")) {
            navbar.addClass("scrolled");
            logo.attr("src", "images/logo_2.png");
          }
        }
        if (st < 150 && $(window).width() > 992) {
          if (navbar.hasClass("scrolled")) {
            navbar.removeClass("scrolled sleep");
            logo.attr("src", "images/logo_1.png");
          }
        }
        if (st > 400) {
          if (!navbar.hasClass("awake")) {
            navbar.addClass("awake");
          }

          if (sd.length > 0) {
            sd.addClass("sleep");
          }
        }
        if (st < 400) {
          if (navbar.hasClass("awake")) {
            navbar.removeClass("awake");
            navbar.addClass("sleep");
          }
          if (sd.length > 0) {
            sd.removeClass("sleep");
          }
        }
      });
    };
    scrollWindow();

    var counter = function () {
      $(".counter-wrap").waypoint(
        function (direction) {
          if (
            direction === "down" &&
            !$(this.element).hasClass("ftco-animated")
          ) {
            var comma_separator_number_step =
              $.animateNumber.numberStepFactories.separator(",");
            $(".number").each(function () {
              var $this = $(this),
                num = $this.data("number");
              console.log(num);
              $this.animateNumber(
                {
                  number: num,
                  numberStep: comma_separator_number_step,
                },
                3000
              );
            });
          }
        },
        { offset: "95%" }
      );
    };
    counter();

    var contentWayPoint = function () {
      var i = 0;
      $(".ftco-animate").waypoint(
        function (direction) {
          if (
            direction === "down" &&
            !$(this.element).hasClass("ftco-animated")
          ) {
            i++;

            $(this.element).addClass("item-animate");
            setTimeout(function () {
              $("body .ftco-animate.item-animate").each(function (k) {
                var el = $(this);
                setTimeout(
                  function () {
                    var effect = el.data("animate-effect");
                    if (effect === "fadeIn") {
                      el.addClass("fadeIn ftco-animated");
                    } else if (effect === "fadeInLeft") {
                      el.addClass("fadeInLeft ftco-animated");
                    } else if (effect === "fadeInRight") {
                      el.addClass("fadeInRight ftco-animated");
                    } else {
                      el.addClass("fadeInUp ftco-animated");
                    }
                    el.removeClass("item-animate");
                  },
                  k * 50,
                  "easeInOutExpo"
                );
              });
            }, 100);
          }
        },
        { offset: "95%" }
      );
    };
    contentWayPoint();
  });
})(jQuery);
