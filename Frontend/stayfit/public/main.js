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
          600: {
            items: 2,
          },
          1000: {
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

    $(".toggle-password").click(function () {
      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });

    // $(document).ready(function () {
    //   var date = new Date();
    //   var today = date.getDate();
    //   // Set click handlers for DOM elements
    //   $(".right-button").click({ date: date }, next_year);
    //   $(".left-button").click({ date: date }, prev_year);
    //   $(".month").click({ date: date }, month_click);
    //   $("#add-button").click({ date: date }, new_event);
    //   // Set current month as active
    //   $(".months-row").children().eq(date.getMonth()).addClass("active-month");
    //   init_calendar(date);
    //   var events = check_events(today, date.getMonth() + 1, date.getFullYear());
    //   show_events(events, months[date.getMonth()], today);
    // });

    // Initialize the calendar by appending the HTML dates
    // function init_calendar(date) {
    //   $(".tbody").empty();
    //   $(".events-container").empty();
    //   var calendar_days = $(".tbody");
    //   var month = date.getMonth();
    //   var year = date.getFullYear();
    //   var day_count = days_in_month(month, year);
    //   var row = $("<tr class='table-row'></tr>");
    //   var today = date.getDate();
    //   // Set date to 1 to find the first day of the month
    //   date.setDate(1);
    //   var first_day = date.getDay();
    //   // 35+firstDay is the number of date elements to be added to the dates table
    //   // 35 is from (7 days in a week) * (up to 5 rows of dates in a month)
    //   for (var i = 0; i < 35 + first_day; i++) {
    //     // Since some of the elements will be blank,
    //     // need to calculate actual date from index
    //     var day = i - first_day + 1;
    //     // If it is a sunday, make a new row
    //     if (i % 7 === 0) {
    //       calendar_days.append(row);
    //       row = $("<tr class='table-row'></tr>");
    //     }
    //     // if current index isn't a day in this month, make it blank
    //     if (i < first_day || day > day_count) {
    //       var curr_date = $("<td class='table-date nil'>" + "</td>");
    //       row.append(curr_date);
    //     } else {
    //       var curr_date = $("<td class='table-date'>" + day + "</td>");
    //       var events = check_events(day, month + 1, year);
    //       if (today === day && $(".active-date").length === 0) {
    //         curr_date.addClass("active-date");
    //         curr_date.addClass("current-day");
    //         show_events(events, months[month], day);
    //       }
    //       // If this date has any events, style it with .event-date
    //       if (events.length !== 0) {
    //         curr_date.addClass("event-date");
    //       }
    //       // Set onClick handler for clicking a date
    //       curr_date.click(
    //         { events: events, month: months[month], day: day },
    //         date_click
    //       );
    //       row.append(curr_date);
    //     }
    //   }
    //   // Append the last row and set the current year
    //   calendar_days.append(row);
    //   $(".year").text(year);
    // }

    // // Get the number of days in a given month/year
    // function days_in_month(month, year) {
    //   var monthStart = new Date(year, month, 1);
    //   var monthEnd = new Date(year, month + 1, 1);
    //   return (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
    // }

    // // Event handler for when a date is clicked
    // function date_click(event) {
    //   $(".events-container").show(250);
    //   $("#dialog").hide(250);
    //   $(".active-date").removeClass("active-date");
    //   $(this).addClass("active-date");
    //   show_events(event.data.events, event.data.month, event.data.day);
    // }

    // // Event handler for when a month is clicked
    // function month_click(event) {
    //   $(".events-container").show(250);
    //   $("#dialog").hide(250);
    //   var date = event.data.date;
    //   $(".active-month").removeClass("active-month");
    //   $(this).addClass("active-month");
    //   var new_month = $(".month").index(this);
    //   date.setMonth(new_month);
    //   init_calendar(date);
    // }

    // // Event handler for when the year right-button is clicked
    // function next_year(event) {
    //   $("#dialog").hide(250);
    //   var date = event.data.date;
    //   var new_year = date.getFullYear() + 1;
    //   $("year").html(new_year);
    //   date.setFullYear(new_year);
    //   init_calendar(date);
    // }

    // // Event handler for when the year left-button is clicked
    // function prev_year(event) {
    //   $("#dialog").hide(250);
    //   var date = event.data.date;
    //   var new_year = date.getFullYear() - 1;
    //   $("year").html(new_year);
    //   date.setFullYear(new_year);
    //   init_calendar(date);
    // }

    // // Event handler for clicking the new event button
    // function new_event(event) {
    //   // if a date isn't selected then do nothing
    //   if ($(".active-date").length === 0) return;
    //   // remove red error input on click
    //   $("input").click(function () {
    //     $(this).removeClass("error-input");
    //   });
    //   // empty inputs and hide events
    //   $("#dialog input[type=text]").val("");
    //   $("#dialog input[type=text]").val("");
    //   $("#dialog input[type=url]").val("");
    //   $(".events-container").hide(250);
    //   $("#dialog").show(250);
    //   // Event handler for cancel button
    //   $("#cancel-button").click(function () {
    //     $("#name").removeClass("error-input");
    //     $("#details").removeClass("error-input");
    //     $("#dialog").hide(250);
    //     $(".events-container").show(250);
    //   });
    //   // Event handler for ok button
    //   $("#ok-button")
    //     .unbind()
    //     .click({ date: event.data.date }, function () {
    //       var date = event.data.date;
    //       var name = $("#name").val().trim();
    //       var details = $("#details").val().trim();
    //       var link = $("#link").val().trim();
    //       var day = parseInt($(".active-date").html());
    //       // Basic form validation
    //       if (name.length === 0) {
    //         $("#name").addClass("error-input");
    //       } else if (details.length === 0) {
    //         $("#details").addClass("error-input");
    //       } else {
    //         $("#dialog").hide(250);
    //         new_event_json(name, details, link, date, day);
    //         date.setDate(day);
    //         init_calendar(date);
    //       }
    //     });
    // }

    // // Adds a json event to event_data
    // function new_event_json(name, details, link, date, day) {
    //   var event = {
    //     occasion: name,
    //     details: details,
    //     link: link,
    //     year: date.getFullYear(),
    //     month: date.getMonth() + 1,
    //     day: day,
    //   };
    //   event_data["events"].push(event);
    // }

    // // Display all events of the selected date in card views
    // function show_events(events, month, day) {
    //   // Clear the dates container
    //   $(".events-container").empty();
    //   $(".events-container").show(250);
    //   console.log(event_data["events"]);
    //   // If there are no events for this date, notify the user
    //   if (events.length === 0) {
    //     var event_card = $("<div class='event-card'></div>");
    //     var event_name = $(
    //       "<div class='event-details'>No events planned for " +
    //         month +
    //         " " +
    //         day +
    //         "</div>"
    //     );
    //     $(event_card).append(event_name);
    //     $(".events-container").append(event_card);
    //   } else {
    //     // Go through and add each event as a card to the events container
    //     for (var i = 0; i < events.length; i++) {
    //       var event_card = $("<div class='event-card'></div>");
    //       var event_name = $(
    //         "<div class='event-name'>" + events[i]["occasion"] + " : </div>"
    //       );
    //       var event_details = $(
    //         "<div class='event-details'>" + events[i]["details"] + "</div>"
    //       );
    //       var event_link =
    //         events[i]["link"] &&
    //         $("<div class='event-link'> Link: " + events[i]["link"] + "</div>");
    //       if (events[i]["cancelled"] === true) {
    //         event_details = $("<div class='event-cancelled'>Cancelled</div>");
    //         event_link = "";
    //       }
    //       $(event_card)
    //         .append(event_name)
    //         .append(event_details)
    //         .append(event_link);
    //       $(".events-container").append(event_card);
    //     }
    //   }
    // }

    // // Checks if a specific date has any events
    // function check_events(day, month, year) {
    //   var events = [];
    //   for (var i = 0; i < event_data["events"].length; i++) {
    //     var event = event_data["events"][i];
    //     if (
    //       event["day"] === day &&
    //       event["month"] === month &&
    //       event["year"] === year
    //     ) {
    //       events.push(event);
    //     }
    //   }
    //   return events;
    // }

    // // Given data for events in JSON format
    // var event_data = {
    //   events: [
    //     {
    //       occasion: "Zoom Meeting",
    //       details: "Discussion about nutrition",
    //       link: "https://zoom.us/j/123456789",
    //       year: 2023,
    //       month: 10,
    //       day: 22,
    //       cancelled: false,
    //     },
    //   ],
    // };

    // const months = [
    //   "January",
    //   "February",
    //   "March",
    //   "April",
    //   "May",
    //   "June",
    //   "July",
    //   "August",
    //   "September",
    //   "October",
    //   "November",
    //   "December",
    // ];
  });
})(jQuery);
