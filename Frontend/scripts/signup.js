document.querySelector("#back-to-login").addEventListener("click", () => {
  window.location = "login.html";
});

function validateFirstName() {
  const firstNameInput = document.getElementById("firstName");
  const firstNameValue = firstNameInput.value.trim();

  if (firstNameValue.length < 3) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "First Name must have at least 3 Letters.",
    });
    firstNameInput.focus();
    return false;
  }
  return true;
}

function validateLastName() {
  const lastNameInput = document.getElementById("lastName");
  const lastNameValue = lastNameInput.value.trim();

  if (lastNameValue.length < 3) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Last Name must have at least 3 Letters.",
    });
    lastNameInput.focus();
    return false;
  }

  return true;
}

function validateEmail() {
  const emailInput = document.getElementById("Email");
  const emailValue = emailInput.value.trim();
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!emailPattern.test(emailValue)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please Enter a Valid Email Address.",
    });
    emailInput.focus();
    return false;
  }

  return true;
}

function validatePassword() {
  const passwordInput = document.getElementById("signup-password");
  const passwordValue = passwordInput.value;
  if (
    passwordValue.length < 6 ||
    !/[A-Z]/.test(passwordValue) ||
    !/[a-z]/.test(passwordValue) ||
    !/\d/.test(passwordValue)
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password must be 6 characters with Atlist 1 Uppercase, 1 Lowercase, and 1 Number.",
    });

    passwordInput.focus();
    return false;
  }
  return true;
}

const onSignUp = () => {
  if (
    validateFirstName() &&
    validateLastName() &&
    validateEmail() &&
    validatePassword()
  ) {
    const payload = {
      name:
        document.querySelector("#firstName").value +
        " " +
        document.querySelector("#lastName").value,
      email: document.querySelector("#Email").value,
      password: document.querySelector("#signup-password").value,
      sex: document.querySelector("#gender").value,
      role: document.querySelector("#role").value,
    };

    if (
      payload.name == "" ||
      payload.email == "" ||
      payload.password == "" ||
      payload.sex == "" ||
      payload.role == ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Complete All Required Fields.",
      });
      return;
    }

    fetch("https://fitnesshub-backend.onrender.com/user/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        Swal.fire("Good job", "Signup successful!", "success");

        setTimeout(() => {
          window.location = "login.html";
        }, 1000);
      })
      .catch((err) => console.log(err));
  }
};
