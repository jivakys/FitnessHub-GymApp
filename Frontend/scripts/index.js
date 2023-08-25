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

// testimonial slider ...................
// Access the testimonials
let testSlide = document.querySelectorAll(".testItem");
// Access the indicators
let dots = document.querySelectorAll(".dot");
var counter = 0;

// Add click event to the indicators
function switchTest(currentTest) {
  currentTest.classList.add("active");
  var testId = currentTest.getAttribute("attr");
  if (testId > counter) {
    testSlide[counter].style.animation = "next1 0.5s ease-in forwards";
    counter = testId;
    testSlide[counter].style.animation = "next2 0.5s ease-in forwards";
  } else if (testId == counter) {
    return;
  } else {
    testSlide[counter].style.animation = "prev1 0.5s ease-in forwards";
    counter = testId;
    testSlide[counter].style.animation = "prev2 0.5s ease-in forwards";
  }
  indicators();
}

// Add and remove active class from the indicators
function indicators() {
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  dots[counter].className += " active";
}

// Code for auto sliding
function slideNext() {
  testSlide[counter].style.animation = "next1 0.5s ease-in forwards";
  if (counter >= testSlide.length - 1) {
    counter = 0;
  } else {
    counter++;
  }
  testSlide[counter].style.animation = "next2 0.5s ease-in forwards";
  indicators();
}
function autoSliding() {
  deleteInterval = setInterval(timer, 2000);
  function timer() {
    slideNext();
    indicators();
  }
}
autoSliding();

// Stop auto sliding when mouse is over the indicators
const container = document.querySelector(".indicators");
container.addEventListener("mouseover", pause);
function pause() {
  clearInterval(deleteInterval);
}

// Resume sliding when mouse is out of the indicators
container.addEventListener("mouseout", autoSliding);

// slider end........................................
