let baseURL = "https://fitnesshub-backend.onrender.com";

let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
// console.log("user==", loggedInUser);
if (!loggedInUser) {
  window.location.href = "../index.html";
}
let loggedInUserEmail = loggedInUser.email;

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

// .......................................Trainer Info........................................................

let trainerinfo = document.getElementById("userInfo");
trainerinfo.innerText = `Hi, ${loggedInUser.name}`;

let totallength;

getAllClassLength();

async function getAllClassLength() {
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
        renderClassInfo(newData.length);
        renderClasses(res.classes);
        renderTables();
      });
    } else {
      // alert("Classes Not Fetched")
      loding_container.style.display = "none";
      swal({
        text: "Classes Not Fetched",
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

// async function getOneTrainerClassLength(event) {
//   try {
//     let id = event.target.getAttribute("data-id");
//     loding_container.style.display = "block";
//     let dataFetch = await fetch(baseURL + `/searchByTrainerID/${id}`, {
//       headers: {
//         authorization: `Bearer ${loggedInUserEmail}`,
//       },
//     });
//     if (dataFetch.ok) {
//       let temp = dataFetch.json().then((res) => {
//         loding_container.style.display = "none";
//         newData = res.classes;
//         renderClassInfo(newData.length);
//       });
//     } else {
//       // alert("Classes Not Fetched")
//       loding_container.style.display = "none";
//       swal({
//         text: "Classes Not Fetched",
//         icon: "error",
//         button: "ok",
//         timer: 1000,
//       });
//     }
//   } catch (error) {
//     // alert("Server not responding");
//     loding_container.style.display = "none";
//     swal({
//       text: "Server not responding",
//       icon: "error",
//       button: "ok",
//       timer: 1000,
//     });
//     console.log(error.message);
//   }
// }

function renderClassInfo(totallength) {
  document.getElementById("total-class").innerText = totallength;
}

function renderClasses(res) {
  let tablebody = document.querySelector(".responsive-table__body");

  let BodyContent = res.map((el) => {
    return createRow(el);
  });

  tablebody.innerHTML = BodyContent.join(" ");
}

function createRow(el) {
  const id = el._id;
  return `<tr class="responsive-table__row">
		<td class="responsive-table__body__text responsive-table__body__text--name" data-id=${
      el._id
    } onclick="RedirectClassPage(${el._id})">
			<img src=${
        el.activity
          ? renderImages(el.activity)
          : "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
      }  class="user-icon">
			${el.title}
		</td>
		<td class="responsive-table__body__text responsive-table__body__text--price">${
      el.price
    }</td>
		<td class="responsive-table__body__text responsive-table__body__text--seats">${
      el.seatOccupied
    }/${el.seatTotal}</td>
		<td class="responsive-table__body__text responsive-table__body__text--date">${
      el.classDate
    },${el.classTime}</td>
		<td class="responsive-table__body__text responsive-table__body__text--venue">${
      el.venue == "offline" ? el.locationOrLink : el.venue
    }</td>
		<td class="responsive-table__body__text responsive-table__body__text--delete"><div class="allbtns"><div class="twobtns">
		<button class="cancel-btn options" onclick="DeleteClass(event)" data-id=${
      el._id
    }>Cancel</button><button class="update-btn options" onclick="updateClass(event)"  data-id=${
    el._id
  } >Update</button></div>
		<a href="./trainerSingleClass.html?id=${id}"> <button class="detail-btn options" > Details </button></a>
		</div></td>
	</tr>`;
}

function updateClass(event) {
  let classid = event.target.getAttribute("data-id");
  window.location.href = `updateClass.html?id=${classid}`;
}

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
      loding_container.style.display = "none";
      swal({
        text: "Class Deleted Successfully",
        icon: "success",
        button: "ok",
        timer: 1000,
      });
      getAllClassLength();
    } else {
      loding_container.style.display = "none";
      swal({
        text: "Class not deleted",
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

function RedirectClassPage(id) {
  window.location.assign(`./trainerSingleClass.html?id=${id}`);
}

// Classes List
renderTables();
function renderTables() {
  const headTitleName = document.querySelector(
    ".responsive-table__head__title--name"
  );
  const headTitleStatus = document.querySelector(
    ".responsive-table__head__title--price"
  );
  const headTitleTypes = document.querySelector(
    ".responsive-table__head__title--seats"
  );
  const headTitleUpdate = document.querySelector(
    ".responsive-table__head__title--date"
  );
  const headTitleCountry = document.querySelector(
    ".responsive-table__head__title--venue"
  );

  const headTitleDelete = document.querySelector(
    ".responsive-table__head__title--delete"
  );

  // Select tbody text from Dom
  const bodyTextName = document.querySelectorAll(
    ".responsive-table__body__text--name"
  );
  const bodyTextStatus = document.querySelectorAll(
    ".responsive-table__body__text--price"
  );
  const bodyTextTypes = document.querySelectorAll(
    ".responsive-table__body__text--seats"
  );
  const bodyTextUpdate = document.querySelectorAll(
    ".responsive-table__body__text--date"
  );
  const bodyTextCountry = document.querySelectorAll(
    ".responsive-table__body__text--venue"
  );

  const bodyTextDelete = document.querySelectorAll(
    ".responsive-table__body__text--delete"
  );

  // Select all tbody table row from Dom
  const totalTableBodyRow = document.querySelectorAll(
    ".responsive-table__body .responsive-table__row"
  );

  // Get thead titles and append those into tbody table data items as a "data-title" attribute
  for (let i = 0; i < totalTableBodyRow.length; i++) {
    bodyTextName[i].setAttribute("data-title", headTitleName.innerText);
    bodyTextStatus[i].setAttribute("data-title", headTitleStatus.innerText);
    bodyTextTypes[i].setAttribute("data-title", headTitleTypes.innerText);
    bodyTextUpdate[i].setAttribute("data-title", headTitleUpdate.innerText);
    bodyTextCountry[i].setAttribute("data-title", headTitleCountry.innerText);
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
