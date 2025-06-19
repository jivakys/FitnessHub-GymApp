const baseURL = "https://fitnesshub-backend.onrender.com";

let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
if (!loggedInUser) {
  window.location.href = "../index.html";
}
let loggedInUserEmail = loggedInUser.email;

const urlParams = new URLSearchParams(window.location.search);
const classId = urlParams.get("id");

let loding_container = document.getElementById("loding_container");

// .....................................................................................................

document.getElementById("user_name").innerText = loggedInUser.name;

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

// .....................Render Class and Trainer details............................................

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
        let trainerID = res.classes.trainerID;
        let trainerInfo = getTrainer(trainerID);
        trainerInfo.then((temp) => {
          renderAllData(res.classes, temp);
        });
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

async function getTrainer(trainerID) {
  try {
    loding_container.style.display = "block";
    let dataFetch = await fetch(`${baseURL}/user/${trainerID}`, {
      headers: {
        authorization: `Bearer ${loggedInUserEmail}`,
      },
    });
    if (dataFetch.ok) {
      loding_container.style.display = "none";
      let temp = await dataFetch.json();
      return temp.user;
    } else {
      // alert("Trainer Not Fetched")
      loding_container.style.display = "none";
      swal({
        text: "Trainer Not Fetched",
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

let mainDiv = document.getElementById("renderallinfo");

async function renderAllData(classes, trainerInfo) {
  // console.log(classes,trainerInfo)
  mainDiv.innerHTML = `

   <div id="classalldesc">
      <div id="imgandjoinbtn">
       <div id="descimg">
           <img src=${
             classes.activity
               ? renderImages(classes.activity)
               : renderImages("Dance")
           } alt="" id="trainerimg">
       </div>
       <div id="descjoin">
           <button id="joinclassdesc" data-id=${classes._id}>Join Class</button>
       </div>
      </div>
       <div id="descdesc">
           <p>${
             classes.activity
               ? rederActDesc(classes.activity)
               : rederActDesc("Dance")
           }</p>
       </div>
   </div>

   <div id="infoall">
       <div id="infoclass">
           <h3 id="" class="heading" ><span>Class Details</span></h3>
           <div id="onlyclassinfo">
               <div id="classheads">
                   <h4>Name : ${classes.title}</h4>
                   <h4>Activity : ${classes.activity}</h4>
                   <h4>Date : ${classes.classDate}</h4>
                   <h4>Time : ${classes.classTime}</h4>
                   <h4>Mode: ${classes.venue}</h4>
                   <h4 id="linkH4Key">Link/Location : ${
                     classes.locationOrLink
                   }</h4>
                   <h4>Duration: ${classes.duration}</h4>
                   <h4>Total Seats : ${classes.seatTotal}</h4>
                   <h4>Seats Occupied : ${classes.seatOccupied}</h4>
                   <button class="cancel-btn" onclick="DeleteClass(event)" data-id=${
                     classes._id
                   }>Cancel</button>
                   <button class="update-btn options" onclick="updateClass(event)"  data-id=${
                     classes._id
                   } >Update</button>
               </div>
              
           </div>
       </div>
       <div id="infomode">
           <h3 id="" class="heading"><span>Mode of Class</span></h3>
           <img src=${rendermode(classes.venue)} alt="" id="modeimg">
       </div>
       <div id="infotrainer">
           <h3 id="" class="heading" ><span>Trainer Information</span></h3>
           <div id="trainermaininfo">
               <img src=${renderTrainerProfile()} alt="" id="trainerimg">
               <div id="trainerdetails">
                   <div id="trainerhead">
                       <h4>Trainer:</h4>
                       <h4>Coutry:</h4>
                       <h4>Contact:</h4>
                       <h4>Email:</h4>
                   </div>
                   <div id="trainerheadinfo">
                       <h4>${trainerInfo.name}</h4>
                       <h4>India</h4>
                       <h4>${
                         trainerInfo.phone ? trainerInfo.phone : "Not Provided"
                       }</h4>
                       <h4>${trainerInfo.email}</h4>
                   </div>
               </div>
           </div>
       </div>

   </div>
   <img src=${
     classes.activity ? renderImages(classes.activity) : renderImages("Dance")
   } alt="" id="activityimg">
   `;
}

function renderTrainerProfile() {
  let prfileImg = [
    "../images/Profile_Images/1680420864318.png",
    "../images/Profile_Images/1680420887007.png",
    "../images/Profile_Images/1680420927232.png",
    "../images/Profile_Images/1680420953188.png",
    "../images/Profile_Images/1680420980976.png",
    "../images/Profile_Images/1680421002568.png",
    "../images/Profile_Images/1680421096922.png",
  ];

  let imgLink = getRandomItem(prfileImg);
  return imgLink;
}

function rendermode(mode) {
  mode = mode.toLowerCase();
  if (mode == "online") {
    return "https://img.freepik.com/free-vector/flat-design-online-yoga-class_23-2148533685.jpg?w=740&t=st=1680414651~exp=1680415251~hmac=a791e4c418b3b87a3c821274b4fd5e98ae8bfc2d8176b40799a2826cd4123ca6https://img.freepik.com/free-vector/flat-design-online-yoga-class_23-2148533685.jpg?w=740&t=st=1680414651~exp=1680415251~hmac=a791e4c418b3b87a3c821274b4fd5e98ae8bfc2d8176b40799a2826cd4123ca6";
  } else {
    return `https://img.freepik.com/free-vector/pregnant-women-doing-exercises-with-big-ball-cartoon-illustration_74855-14492.jpg?w=740&t=st=1680414881~exp=1680415481~hmac=ad34b4302c74a73603a5534be8a88d00b0ec9e2c6633babb1d4a3318868db729`;
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
  const randomIndex = Math.floor(Math.random() * arr.length);
  const item = arr[randomIndex];
  return item;
}

function rederActDesc(activity) {
  let obj = {
    yoga: "Yoga is a practice that connects the body, breath, and mind. It uses physical postures, breathing exercises, and meditation to improve overall health. Yoga was developed as a spiritual practice thousands of years ago. Today, most Westerners who do yoga do it for exercise or to reduce stress.",
    cardio:
      "Cardiovascular exercise is any vigorous activity that increases heart rate and respiration and raises oxygen and blood flow throughout the body while using large muscle groups of the body repetitively and rhythmically.",
    zumba:
      "Zumba is a powerful exercise with a 600 to 1,000-calorie burn in just an hour. Tones your entire body. You may feel sore in places you never knew existed, but it gets results. Zumba targets lots of different muscle groups at once for total body toning.",
    aerobics:
      "Aerobics is a form of physical exercise that combines rhythmic aerobic exercise with stretching and strength training routines with the goal of improving all elements of fitness. It is usually performed to music and may be practiced in a group setting led by an instructor (fitness professional), although it can be done solo and without musical accompaniment. With the goal of preventing illness and promoting physical fitness, practitioners perform various routines comprising a number of different dance-like exercises.",
    ballet:
      "Barre and Stretch VIRTUAL is a hybrid of pilates, stretch, strength and core training .High reps  and low weights. No Impact . Light weights, towel and ,mat required",
    basketball:
      "While not renowned as an aerobic sport, it is still a great workout that can help you: burn calories (an hour of basketball can burn 630–750 calories) build endurance. improve balance and coordination.",
    boxing:
      "Boxing requires speed, agility, strength, power, and cardiovascular fitness. The focus of strength training workouts is usually on improving coordination, power, and speed of force development rather than on building muscle mass and gaining size.",
    crossfit:
      "A form of high intensity interval training, CrossFit is a strength and conditioning workout that is made up of functional movement performed at a high intensity level. These movements are actions that you perform in your day-to-day life, like squatting, pulling, pushing etc.",
    football:
      "Playing football is equivalent to muscular strength exercises (anaerobic) such as running at high speed and lifting weights. As these types of exercises help to burn body fat as much as possible, the risk of heart disease and the accumulation of fat in the blood vessels are eliminated.",
    cycling:
      "Cycling is mainly an aerobic activity, which means that your heart, blood vessels and lungs all get a workout. You will breathe deeper, perspire and experience increased body temperature, which will improve your overall fitness level. ",
    weighttraining:
      "Weight training is an important part of any fitness program. Combined with aerobic exercise, weight training can increase your strength and muscle tone, increase muscle mass, improve your bone density, help maintain weight, and help you lose fat.",
    dance:
      "Dance is an art form consisting of sequences of body movements with aesthetic and often symbolic value, either improvised or purposefully selected. Dance can be categorized and described by its choreography, by its repertoire of movements or by its historical period or place of origin.",
  };
  activity = activity.toLowerCase();
  let desc = obj[`${activity}`];
  return desc;
}

// ........................Delete Class.............................................
async function DeleteClass(event) {
  let classid = event.target.getAttribute("data-id");
  try {
    loding_container.style.display = "block";
    let data = await fetch(baseURL + `/class/delete/${classid}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${loggedInUserEmail}`,
      },
    });
    if (data.ok) {
      // alert("Class Deleted Successfully")
      loding_container.style.display = "none";
      swal({
        text: "Class Deleted Successfully",
        icon: "success",
        button: "ok",
        timer: 1000,
      });
      window.location.assign(`./trainerDashboard.html`);
    } else {
      // alert("Class not deleted")
      loding_container.style.display = "none";
      swal({
        text: "Class not deleted",
        icon: "error",
        button: "ok",
        timer: 1000,
      });
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

function updateClass(event) {
  let classid = event.target.getAttribute("data-id");
  window.location.href = `updateClass.html?id=${classid}`;
}

function logoutFun() {
  sessionStorage.clear();
  window.location.href = "../index.html";
}
