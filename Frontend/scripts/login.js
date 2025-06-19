document.querySelector("#create-an-account").addEventListener("click", () => {
  window.location = "signup.html";
});
let loding_container = document.getElementById("loding_container");
let google_button = document.querySelector("#login-google-button");

google_button.addEventListener("click", async () => {
  window.location = "https://fitnesshub-backend.onrender.com/auth/google";
});

const onLogin = () => {
  const payload = {
    email: document.getElementById("login-email").value,
    password: document.getElementById("login-password").value,
  };
  if (payload.email == "" || payload.password == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please Complete All Required Fields.",
    });
    return;
  }

  if (payload.email == "admin@gmail.com" || payload.pass == "admin") {
    Swal.fire("Welcome Admin !!", "You Loggged in", "success");
    setTimeout(() => {
      window.location.href = "adminDashboard.html";
    }, 2000);
    return;
  }

  loding_container.style.display = "block";
  fetch("https://fitnesshub-backend.onrender.com/user/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => {
      loding_container.style.display = "none";
      console.log(res);
      if (res.OK == false) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${res.message || res.error}`,
        });

        setTimeout(() => {
          window.location.href = "login.html";
        }, 3000);

        return;
      }
      sessionStorage.setItem("loggedInUser", JSON.stringify(res.user));
      Swal.fire("Good job", "You Loggged in", "success");

      setTimeout(() => {
        if (res.user.role === "trainer") {
          window.location.href = "trainerDashboard.html";
        } else {
          window.location.href = "userDashboard.html";
        }
      }, 2000);
    })
    .catch((err) => {
      console.log(err);
      loding_container.style.display = "none";
    });
};
