var baseURL = "https://fitnesshub-backend.onrender.com";

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
console.log(loggedInUser);

let totallength;
getClasslength(loggedInUser._id);
async function getClasslength(id) {
  try {
    loding_container.style.display = "block";
    let fetchingData = await fetch(baseURL + `/class/searchByUserID/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${loggedInUserEmail}`,
      },
    });
    let temp = await fetchingData.json();
    if (fetchingData.ok) {
      loding_container.style.display = "none";
      totallength = temp.classes.length;
      renderUserInfo(totallength);
    } else {
      console.log(temp);
      alert(fetchingData.message);
    }
  } catch (error) {
    loding_container.style.display = "none";
    alert("Server Error");
    console.log(error.message);
  }
}

let allclientinfo = document.getElementById("clientinfo");

function renderUserInfo(totallength) {
  allclientinfo.innerHTML = "";
  allclientinfo.innerHTML = `<div id="clientname">
<div id="profimgdiv">
    <img src=${renderProfileImg()} alt="" id="profileimg">
</div>
<div id="clientnamediv">
    <p>Hi, <b class="loginPerson">${
      loggedInUser.name
    } </b></p> <p> - Welcome To Fitness-Hub - Let's get Started!</p>
    
</div>

</div>
`;
}

function renderTotalClass(count) {
  if (count <= 0) {
    return ` <p class="notclassrender">You didn't join any class.</p>
<p class="notclassrender">For join class <a id='searchanc' href="./userSearchClass.html">click here.</a></p>`;
  } else {
    return `<div id="notclassdiv">
    <p class="notclassrender">Total classes joind by you is ${count}.</p>
<p class="notclassrender">For join more class <a id='searchanc' href="./userSearchClass.html">click here.</a></p>
</div>`;
  }
}

getClass(loggedInUser._id);
async function getClass(id) {
  try {
    let fetchingData = await fetch(baseURL + `/class/searchByUserID/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${loggedInUserEmail}`,
      },
    });
    let temp = await fetchingData.json();
    if (fetchingData.ok) {
      console.log(temp);
      renderderAllData(temp.classes);
    } else {
      console.log(temp);
      alert(fetchingData.message);
    }
  } catch (error) {
    alert("Server Error");
    console.log(error.message);
  }
}

let divForRender = document.getElementById("cardcontainer");

async function renderderAllData(allData) {
  divForRender.innerHTML = "";
  let map_allData = allData.map((elem) => {
    return `<div class="card">
      <div class="left1">
        <p class="day">On ${elem.classDate[8]}${elem.classDate[9]}th</p>
        <span class="time">At ${elem.classTime}</span>
      </div>
      <div class="information">
        <h4><a href=./classDetails.html?id=${elem._id}>${elem.title}</h4>
        <span
          >${elem.seatOccupied} Seats Booked in ${elem.seatTotal} Seats
        </span>
        <br />
        <span>Total Price: ₹ ${elem.price}</span>
      </div>
      <div class="classinfo">
        <span class="classinfoname"><b>Class : </b>${elem.activity}</span>
      </div>
      <a class="joinclassbutton" data-id="${elem._id}">Details</a>
    </div>`;
  });
  divForRender.innerHTML = map_allData.join("");

  let joicClassbtn = document.querySelectorAll(".joinclassbutton");
  joicClassbtn.forEach((elem) => {
    elem.addEventListener("click", (event) => {
      let id = event.target.dataset.id;
      window.location.assign(`./classDetails.html?id=${id}`);
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
      "../Images/Classes_Images/boxing2.jpg",
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
  let randomIndex = Math.floor(Math.random() * arr.length);
  let item = arr[randomIndex];
  return item;
}

function renderProfileImg() {
  let arr = [
    "../images/Profile_Images/1680420864318.png",
    "../images/Profile_Images/1680420887007.png",
    "../images/Profile_Images/1680420927232.png",
    "../images/Profile_Images/1680420953188.png",
    "../images/Profile_Images/1680420980976.png",
    "../images/Profile_Images/1680421002568.png",
    "../images/Profile_Images/1680421096922.png",
  ];

  let imgLink = getRandomItem(arr);
  return imgLink;
}

// showing user's name on nav bar
let user_name = document.getElementById("user_name");

user_name.innerText = loggedInUser.name;

function logoutFun() {
  sessionStorage.clear();
  window.location.href = "../index.html";
}
