document.querySelector("#back-to-login").addEventListener("click", () => {
  window.location = "login.html";
});

const onSignUp = () => {
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
  console.log(payload);
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
      console.log(res);
      Swal.fire("Good job", "User Registered", "success");

      setTimeout(() => {
        window.location = "login.html";
      });
    })
    .catch((err) => console.log(err));
};
