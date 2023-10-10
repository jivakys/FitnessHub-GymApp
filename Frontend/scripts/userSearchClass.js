import baseURL from "./baseURL.js";

let menu = document.querySelector("#menu-btn");
let navbar = document.querySelector(".header .navbar");
let loding_container = document.getElementById("loding_container");
menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
};
let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
if (!loggedInUser) {
  window.location.href = "../index.html";
}
let loggedInUserEmail = loggedInUser.email;

//  Displaying Username In Navbar
let user_name = document.getElementById("user_name");

user_name.innerText = loggedInUser.name;

function logoutFun() {
  sessionStorage.clear();
  window.location.href = "../index.html";
}

getAllClass();
let newData;
async function getAllClass() {
  try {
    loding_container.style.display = "block";
    let dataFetch = await fetch(baseURL + "/class/all", {
      headers: {
        authorization: `Bearer ${loggedInUserEmail}`,
      },
    });
    if (dataFetch.ok) {
      let temp = dataFetch.json().then((res) => {
        loding_container.style.display = "none";
        newData = res.classes;
        console.log(newData);
        renderAllData(res.classes);
      });
    } else {
      swal({
        text: "Classes Not Fetched",
        icon: "error",
        button: "ok",
        timer: 1000,
      });
    }
  } catch (error) {
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

let allclassescard = document.getElementById("cardcontainer");
function renderAllData(data) {
  let allData = data;
  allclassescard.innerHTML = "";
  let map_allData = allData.map((elem) => {
    return `  <div class="card">
   
<div class="information">
<div class="second">
    <img src=${renderImages(elem.activity)} alt=${
      elem.activity
    } class="classimages"></img>
    <h4> <a href=./classDetails.html?id=${elem._id} >${elem.title}</a></h4>
    </div>
   <div class="third">
    <span>${elem.seatOccupied} Seats Booked in ${elem.seatTotal} Seats </span>
    <br>
    <span>Total Price: ₹ ${elem.price}</span>
    </div>
</div>
<div class="classinfo">
    <span class="classinfoname">Class: ${elem.title}</span>
</div>
<a class="joinclassbutton " data-id=${elem._id}>Book</a>
</div>
`;
  });

  allclassescard.innerHTML = map_allData.join("");

  let joicClassbtn = document.querySelectorAll(".joinclassbutton");
  joicClassbtn.forEach((elem) => {
    elem.addEventListener("click", (event) => {
      let id = event.target.dataset.id;
      window.location.assign(`./bookingClass.html?id=${id}`);
    });
  });
}

function checkvenue(venue, locationOrLink) {
  if (venue === "online") {
    return "Online-via Zoom";
  } else {
    return `Venue - At ${locationOrLink}`;
  }
}

let searchbar = document.getElementById("searchBox");
searchbar.addEventListener("input", (event) => {
  let searchdata = searchalldata(event);
  renderAllData(searchdata);
});

function searchalldata(event) {
  let searchdata = event.target.value;
  let temp = newData.filter(function (elem) {
    let ans =
      elem.locationOrLink.toLowerCase().includes(searchdata.toLowerCase()) ||
      elem.activity.toLowerCase().includes(searchdata.toLowerCase()) ||
      elem.activity.toLowerCase().includes(searchdata.toLowerCase()) ||
      elem.venue.toLowerCase().includes(searchdata.toLowerCase());
    return ans;
  });
  return temp;
}

let activitiname = document.getElementById("acttype");
activitiname.addEventListener("change", (event) => {
  let searchactivity = searchactivityfun(event.target.value);
  if (searchactivity) {
    return renderAllData(searchactivity);
  } else {
    allclassescard.innerHTML = `<h2>Data Not Found</h3>`;
  }
});

function searchactivityfun(activity) {
  if (activity == "all") {
    getAllClass();
  } else {
    let temp = newData.filter(function (elem) {
      console.log(elem);
      let ans =
        elem.title.toLowerCase().includes(activity.toLowerCase()) ||
        elem.venue.toLowerCase().includes(activity.toLowerCase());
      return ans;
    });
    return temp;
  }
}

let attendacesearch = document.getElementById("atttype");
attendacesearch.addEventListener("change", (event) => {
  let searchattendace = searchactivityfun(event.target.value);
  if (searchattendace) {
    renderAllData(searchattendace);
  } else {
    allclassescard.innerHTML = `<h2>Data Not Found</h3>`;
  }
});

let pricecomp = document.getElementById("location");
pricecomp.addEventListener("change", (event) => {
  let searchlocation = event.target.value;
  if (searchlocation == "low") {
    let lowtohigh = newData.sort(function (a, b) {
      return a.price - b.price;
    });
    renderAllData(lowtohigh);
  } else if (searchlocation == "high") {
    let lowtohigh = newData.sort(function (a, b) {
      return b.price - a.price;
    });
    renderAllData(lowtohigh);
  } else {
    getAllClass();
  }
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
