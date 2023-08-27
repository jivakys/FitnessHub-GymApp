import baseURL from "./baseURL.js";

let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
let loding_container = document.getElementById("loding_container");
let logoimg_nav = document.getElementById("logoimg_nav");
logoimg_nav.addEventListener("click", () => {
  window.location.assign("./userDashboard.html");
});
if (!loggedInUser) {
  window.location.href = "../index.html";
}
let loggedInUserEmail = loggedInUser.email;
let orderDetailObj = {};

// showing user's name on nav bar
let user_name = document.getElementById("user_name");

user_name.innerText = loggedInUser.name;

function logoutFun() {
  sessionStorage.clear();
  window.location.href = "../index.html";
}

let form = document.querySelector("form");
let checkAvailablity_btn = document.querySelector(".checkAvailablity_btn");
let next_btn = document.querySelector(".next_btn");
next_btn.style.display = "none";

let left_img_part = document.querySelector("#left_img_part img");

const urlParams = new URLSearchParams(window.location.search);
const classId = urlParams.get("id");

getClass(classId);
async function getClass(classId) {
  try {
    loding_container.style.display = "block";
    let res = await fetch(`${baseURL}/class/${classId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${loggedInUserEmail}`,
      },
    });
    let data = await res.json();
    loding_container.style.display = "none";
    if (res.status == 400) {
      swal({ text: data.message, icon: "error", button: "ok", timer: 1000 });
    } else {
      displayDataInForm(data.classes);
    }
  } catch (error) {
    loding_container.style.display = "none";
    swal({
      text: "Server not responding",
      icon: "error",
      button: "ok",
      timer: 1000,
    });
  }
}

function displayDataInForm(classes) {
  let date_time = classes.classDate + "T" + classes.classTime;
  form.title.value = classes.title;
  form.price.value = classes.price;
  form.activity.value = classes.activity;
  form.seatTotal.value = classes.seatTotal;
  form.venue.value = classes.venue;
  form.duration.value = classes.duration;
  form.trainerName.value = classes.trainerName;
  form.date_time.value = date_time;
  form.date_time.min = date_time;
  form.date_time.max = classes.classDate + "T" + "22:59:59";
  if (classes.venue == "online") {
    form.locationOrLink.value = "Complete booking to  get class link";
  } else {
    form.locationOrLink.value = classes.locationOrLink;
  }
  left_img_part.src = renderImages(classes.activity);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let obj = {
    price: form.price.value,
    selectedDate_Time: form.date_time.value,
    classID: classId,
    userID: loggedInUser._id,
  };
  checkAvailablity(obj);
});
async function checkAvailablity(obj) {
  console.log(obj);
  try {
    loding_container.style.display = "block";
    let url = baseURL + "/order/checkAvailablity";
    let res = await fetch(url, {
      method: "POST",
      headers: {
        authorization: `Bearer ${loggedInUserEmail}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    let data = await res.json();
    loding_container.style.display = "none";
    if (res.status == 400) {
      swal({ text: data.message, icon: "error", button: "ok", timer: 1000 });
    } else if (res.status == 401) {
      // alert(data.message)
      swal({ text: data.message, icon: "error", button: "ok", timer: 1000 });
    } else {
      // alert(data.message);
      swal({
        text: data.message + "\n",
        icon: "success",
        button: "ok",
        timer: 1000,
      }).then(() => {
        orderDetailObj = obj;
        checkAvailablity_btn.style.display = "none";
        next_btn.style.display = "block";
      });
    }
  } catch (error) {
    loding_container.style.display = "none";
    // alert("Server not responding");
    swal({
      text: "Server not responding",
      icon: "error",
      button: "ok",
      timer: 1000,
    });
    console.log(error.message);
  }
}

next_btn.addEventListener("click", (e) => {
  // console.log(orderDetailObj)
  sessionStorage.setItem(
    "classDetailsForOrder",
    JSON.stringify(orderDetailObj)
  );
  window.location.assign("./payment.html");
});

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
