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

// ...............SIGN UP ..................................................

const onSignUp = () => {
  const payload = {
    name: document.querySelector("#signName").value,
    email: document.querySelector("#signupEmail").value,
    password: document.querySelector("#signupPassword").value,
    role: document.querySelector("#signupRole").value,
  };
  console.log(payload);
  if (
    payload.name == "" ||
    payload.email == "" ||
    payload.password == "" ||
    payload.role == ""
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill all the details....",
    });

    return;
  }
  fetch("https://tame-gray-eagle-gown.cyclic.cloud/user/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("user is register", res);
      Swal.fire("Good job", "User Registered Successful", "success");

      setTimeout(() => {
        window.location = "login.html";
      });
    })
    .catch((err) => console.log(err));
};

// document.querySelector("#create-an-account").addEventListener("click", () => {
//   window.location = "signup.html";
// });
// let loding_container = document.getElementById("loding_container");
// let google_button = document.querySelector("#login-google-button");

// google_button.addEventListener("click", async () => {
//   window.location = "https://rich-plum-barracuda-fez.cyclic.app/auth/google";
// });

const onLogin = () => {
  const payload = {
    email: document.getElementById("login-email").value,
    password: document.getElementById("login-password").value,
  };
  if (payload.email == "" || payload.password == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill all the details....",
    });

    return;
  }

  // if (payload.email == "admin@gmail.com" || payload.pass == "admin") {
  //   Swal.fire("Welcome Admin !!", "You Loggged in", "success");
  //   setTimeout(() => {
  //     window.location.href = "adminDashboard.html";
  //   }, 2000);
  //   return;
  // }

  fetch("https://tame-gray-eagle-gown.cyclic.cloud/user/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.OK == false) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${res.message || res.error}`,
        });

        setTimeout(() => {
          window.location.href = "signup.html";
        }, 4000);

        return;
      }
      sessionStorage.setItem("loggedInUser", JSON.stringify(res.user));

      Swal.fire("Good job", "You Loggged in", "success");

      setTimeout(() => {
        if (res.message == "Trainer Logged In") {
          window.location.href = "trainerDashboard.html";
        } else {
          window.location.href = "index.html";
        }
      }, 2000);
    })
    .catch((err) => {
      console.log(err);
    });
}; 