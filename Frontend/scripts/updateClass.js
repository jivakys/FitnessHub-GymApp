let baseURL = "https://fitnesshub-backend.onrender.com";

let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
if (!loggedInUser) {
  window.location.href = "../index.html";
}
let loggedInUserEmail = loggedInUser.email;

const urlParams = new URLSearchParams(window.location.search);
const classId = urlParams.get("id");

let loding_container = document.getElementById("loding_container");
// .......................................Navbar........................................................

let menu = document.querySelector("#menu-btn");
let navbar = document.querySelector(".header .navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
};

document.getElementById("user_name").innerText = loggedInUser.name;
// ................................................Create Class Form...................................................................

let form = document.querySelector("form");

let venue = document.getElementById("venue");
let locationOrLink = document.getElementById("locationOrLink");
let activity = document.getElementById("activity");
let left_img_part = document.querySelector("#left_img_part img");

getAllClass(classId);
async function getAllClass(classId) {
  try {
    loding_container.style.display = "block";
    let dataFetch = await fetch(`${baseURL}/class/${classId}`, {
      headers: {
        authorization: `Bearer ${loggedInUserEmail}`,
      },
    });
    if (dataFetch.ok) {
      let temp = dataFetch.json().then((res) => {
        loding_container.style.display = "none";
        renderValue(res.classes);
      });
    } else {
      loding_container.style.display = "none";
      swal({
        text: "Classes Not Fetched",
        icon: "error",
        button: "ok",
        timer: 1000,
      });
    }
  } catch (error) {
    loding_container.style.display = "none";
    console.log(error);
  }
}

function renderValue(classes) {
  (form.title.value = classes.title),
    (form.price.value = classes.price),
    (form.activity.value = classes.activity),
    (form.seatTotal.value = classes.seatTotal),
    (form.venue.value = classes.venue),
    (form.locationOrLink.value = classes.locationOrLink),
    (form.duration.value = classes.duration);
}

locationOrLink.readOnly = true;

venue.addEventListener("input", () => {
  if (venue.value == "offline") {
    locationOrLink.readOnly = false;
    locationOrLink.placeholder = "Enter City name";
    locationOrLink.value = "";
  } else {
    locationOrLink.readOnly = true;
    locationOrLink.placeholder =
      "Select Class Date & Time to generate class link";
    locationOrLink.value = "Select Class Date & Time to generate class link";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let obj = {
    title: form.title.value,
    price: form.price.value,
    activity: form.activity.value,
    seatTotal: form.seatTotal.value,
    venue: form.venue.value,
    locationOrLink: form.locationOrLink.value,
    duration: form.duration.value,
    // Check Session Storage Key names
  };
  classUpdateInDB(obj);
  // console.log(obj)
});

async function classUpdateInDB(obj) {
  try {
    let url = baseURL + `/class/update/${classId}`;
    loding_container.style.display = "block";
    let res = await fetch(url, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${loggedInUserEmail}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    let data = await res.json();
    if (res.status == 400) {
      // alert(data.message)
      loding_container.style.display = "none";
      swal({ text: data.message, icon: "error", button: "ok", timer: 1000 });
      console.log(data.error);
    } else {
      // alert(data.message);
      loding_container.style.display = "none";
      swal({
        text: data.message,
        icon: "success",
        button: "ok",
        timer: 1000,
      }).then(() => {
        window.location.assign("../html/trainerDashboard.html");
      });
      console.log(data.classes);
    }
  } catch (error) {
    // alert("Server not responding");
    loding_container.style.display = "none";
    swal({
      text: "Server not responding",
      icon: "error",
      button: "ok",
      timer: 1000,
    });
    console.log(error.message);
  }
}

function renderImages(actname) {
  let allImagesData = {
    yoga: [
      "../images/Classes_Images/yoga1.jpg",
      "../images/Classes_Images/yoga2.jpg",
      "../images/Classes_Images/yoga3.jpg",
    ],
    cardio: [
      "../images/Classes_Images/boxing1.jpg",
      "../images/Classes_Images/aerobics2.jpg",
      "../images/Classes_Images/crossfit1.jpg",
    ],
    running: [
      "../images/Classes_Images/football1.jpg",
      "../images/Classes_Images/football2.jpg",
      "../images/Classes_Images/football3.jpg",
    ],
    zumba: [
      "../images/Classes_Images/zumba1.jpg",
      "../images/Classes_Images/zumba2.jpg",
      "../images/Classes_Images/zumba3.jpg",
    ],
    aerobics: [
      "../images/Classes_Images/aerobics1.jpg",
      "../images/Classes_Images/aerobics2.jpg",
      "../images/Classes_Images/aerobics3.jpg",
    ],
    ballet: [
      "../images/Classes_Images/ballet1.jpg",
      "../images/Classes_Images/ballet2.jpg",
      "../images/Classes_Images/ballet3.jpg",
    ],
    basketball: [
      "../images/Classes_Images/basketball1.jpg",
      "../images/Classes_Images/basketball2.jpg",
      "../images/Classes_Images/basketball3.jpg",
    ],
    boxing: [
      "../images/Classes_Images/boxing1.jpg",
      "../images/Classes_Images/boxing3.jpg",
      "../images/Classes_Images/boxing2.jpg",
    ],
    crossfit: [
      "../images/Classes_Images/crossfit1.jpg",
      "../images/Classes_Images/crossfit3.jpg",
      "../images/Classes_Images/crossfit2.jpg",
    ],
    cycling: [
      "../images/Classes_Images/cycling1.jpg",
      "../images/Classes_Images/cycling2.jpg",
      "../images/Classes_Images/cycling3.jpg",
    ],
    football: [
      "../images/Classes_Images/football1.jpg",
      "../images/Classes_Images/football2.jpg",
      "../images/Classes_Images/football3.jpg",
    ],
    weighttraining: [
      "../images/Classes_Images/weighttraining1.jpg",
      "../images/Classes_Images/weighttraining2.jpg",
      "../images/Classes_Images/weighttraining3.jpg",
    ],
    dance: [
      "../images/Classes_Images/dance1.jpg",
      "../images/Classes_Images/dance2.jpg",
      "../images/Classes_Images/dance3.jpg",
    ],
  };
  let newactname = actname.toLowerCase();
  let name = allImagesData[`${newactname}`];

  let imgLink = getRandomItem(name);
  return imgLink;
}

function getRandomItem(arr) {
  let randomIndex = Math.floor(Math.random() * 2);
  let item = arr[randomIndex];
  return item;
}

function logoutFun() {
  sessionStorage.clear();
  window.location.href = "../index.html";
}
