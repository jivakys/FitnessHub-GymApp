$(document).ready(function () {
  $(".ham-burger, .nav ul li a").click(function () {
    $(".nav").toggleClass("open");

    $(".ham-burger").toggleClass("active");
  });
  $(".accordian-container").click(function () {
    $(".accordian-container").children(".body").slideUp();
    $(".accordian-container").removeClass("active");
    $(".accordian-container")
      .children(".head")
      .children("span")
      .removeClass("fa-angle-down")
      .addClass("fa-angle-up");
    $(this).children(".body").slideDown();
    $(this).addClass("active");
    $(this)
      .children(".head")
      .children("span")
      .removeClass("fa-angle-up")
      .addClass("fa-angle-down");
  });

  $(".nav ul li a, .go-down").click(function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;

      $("html,body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          window.location.hash = hash;
        }
      );

      // add active class in navigation
      $(".nav ul li a").removeClass("active");
      $(this).addClass("active");
    }
  });
});

// vars
("use strict");
var testim = document.getElementById("review"),
  testimDots = Array.prototype.slice.call(
    document.getElementById("testim-dots").children
  ),
  testimContent = Array.prototype.slice.call(
    document.getElementById("testim-content").children
  ),
  testimLeftArrow = document.getElementById("left-arrow"),
  testimRightArrow = document.getElementById("right-arrow"),
  testimSpeed = 4500,
  currentSlide = 0,
  currentActive = 0,
  testimTimer,
  touchStartPos,
  touchEndPos,
  touchPosDiff,
  ignoreTouch = 30;
window.onload = function () {
  // Testim Script
  function playSlide(slide) {
    for (var k = 0; k < testimDots.length; k++) {
      testimContent[k].classList.remove("active");
      testimContent[k].classList.remove("inactive");
      testimDots[k].classList.remove("active");
    }

    if (slide < 0) {
      slide = currentSlide = testimContent.length - 1;
    }

    if (slide > testimContent.length - 1) {
      slide = currentSlide = 0;
    }

    if (currentActive != currentSlide) {
      testimContent[currentActive].classList.add("inactive");
    }
    testimContent[slide].classList.add("active");
    testimDots[slide].classList.add("active");

    currentActive = currentSlide;

    clearTimeout(testimTimer);
    testimTimer = setTimeout(function () {
      playSlide((currentSlide += 1));
    }, testimSpeed);
  }

  testimLeftArrow.addEventListener("click", function () {
    playSlide((currentSlide -= 1));
  });

  testimRightArrow.addEventListener("click", function () {
    playSlide((currentSlide += 1));
  });

  for (var l = 0; l < testimDots.length; l++) {
    testimDots[l].addEventListener("click", function () {
      playSlide((currentSlide = testimDots.indexOf(this)));
    });
  }

  playSlide(currentSlide);

  // keyboard shortcuts
  document.addEventListener("keyup", function (e) {
    switch (e.keyCode) {
      case 37:
        testimLeftArrow.click();
        break;

      case 39:
        testimRightArrow.click();
        break;

      case 39:
        testimRightArrow.click();
        break;

      default:
        break;
    }
  });

  testim.addEventListener("touchstart", function (e) {
    touchStartPos = e.changedTouches[0].clientX;
  });

  testim.addEventListener("touchend", function (e) {
    touchEndPos = e.changedTouches[0].clientX;

    touchPosDiff = touchStartPos - touchEndPos;

    console.log(touchPosDiff);
    console.log(touchStartPos);
    console.log(touchEndPos);

    if (touchPosDiff > 0 + ignoreTouch) {
      testimLeftArrow.click();
    } else if (touchPosDiff < 0 - ignoreTouch) {
      testimRightArrow.click();
    } else {
      return;
    }
  });
};
