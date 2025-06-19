const baseURL = `https://fitnesshub-backend.onrender.com`;

let depObj = {
  1: "Online",
  2: "Offline",
};

//Dark-Light Theme Toggler
let sidemenu = document.querySelector("aside");
let themetoggler = document.querySelector(".theme-toggler");

themetoggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-variables");
  themetoggler.querySelector("span").classList.toggle("active");
});

//On click section activate
let dash_btn = document.getElementById("menu-dash");
let doc_btn = document.getElementById("menu-doc");
let patient_btn = document.getElementById("menu-patient");
let app_btn = document.getElementById("menu-app");

let dash_cont = document.getElementById("dash-cont");
let doc_cont = document.getElementById("doc-cont");
let patient_cont = document.getElementById("patient-cont");
let app_cont = document.getElementById("app-cont");

dash_btn.addEventListener("click", () => {
  dash_btn.classList.add("active");
  doc_btn.classList.remove("active");
  patient_btn.classList.remove("active");
  app_btn.classList.remove("active");
  dash_cont.classList.remove("div-hide");
  doc_cont.classList.add("div-hide");
  patient_cont.classList.add("div-hide");
  app_cont.classList.add("div-hide");
});

doc_btn.addEventListener("click", () => {
  doc_btn.classList.add("active");
  dash_btn.classList.remove("active");
  patient_btn.classList.remove("active");
  app_btn.classList.remove("active");
  doc_cont.classList.remove("div-hide");
  dash_cont.classList.add("div-hide");
  patient_cont.classList.add("div-hide");
  app_cont.classList.add("div-hide");
});

patient_btn.addEventListener("click", () => {
  patient_btn.classList.add("active");
  dash_btn.classList.remove("active");
  doc_btn.classList.remove("active");
  app_btn.classList.remove("active");
  patient_cont.classList.remove("div-hide");
  dash_cont.classList.add("div-hide");
  doc_cont.classList.add("div-hide");
  app_cont.classList.add("div-hide");
});

app_btn.addEventListener("click", () => {
  app_btn.classList.add("active");
  dash_btn.classList.remove("active");
  doc_btn.classList.remove("active");
  patient_btn.classList.remove("active");
  app_cont.classList.remove("div-hide");
  dash_cont.classList.add("div-hide");
  doc_cont.classList.add("div-hide");
  patient_cont.classList.add("div-hide");
});

//Dashboard Functions
getStatus();
recentDocs();
recentPatients();
recentApps();

//Get all data
async function getStatus() {
  try {
    let res = await fetch(baseURL + "/admin/all");
    if (res.ok) {
      let data = await res.json();
      document.getElementById("total-pat").innerText = data.totalUsers;
    }
  } catch (err) {
    console.log(err);
  }
}

//Get Recent Trainers
async function recentDocs() {
  try {
    let res = await fetch(baseURL + "/alltrainer");
    if (res.ok) {
      let data = await res.json();
      let arr = data.trainers;
      // console.log("t-trainer==", data.trainers);
      document.getElementById("total-doc").innerText = data.trainers.length;
      renderDocsData(data.trainers);
      renderRecentDocs(
        arr[arr.length - 1],
        arr[arr.length - 2],
        arr[arr.length - 3]
      );
    }
  } catch (err) {
    console.log(err);
  }
}

//Render Recent Trainers
function renderRecentDocs(elem1, elem2, elem3) {
  document.getElementById("doc-tbody").innerHTML = `
    <tr>
        <td>${elem1.name}</td>
        <td>${elem1.email}</td>
        <td>+917788654321</td>
    </tr>
    <tr>
        <td>${elem2.name}</td>
        <td>${elem2.email}</td>
        <td>Not Avilable</td>
    </tr>
    <tr>
        <td>${elem3.name}</td>
        <td>${elem3.email}</td>
        <td>9517536540</td>
    </tr>
`;
}

//Get Recent Users
async function recentPatients() {
  try {
    let res = await fetch(baseURL + "/admin/all");
    if (res.ok) {
      let data = await res.json();
      renderPatientsData(data.usersRegistered);
      let arr = data.usersRegistered;
      renderRecentPatients(
        arr[arr.length - 1],
        arr[arr.length - 2],
        arr[arr.length - 3]
      );
    }
  } catch (err) {
    console.log(err);
  }
}

//Render Recent Users
function renderRecentPatients(elem1, elem2, elem3) {
  document.getElementById("pat-tbody").innerHTML = `
    <tr>
        <td>${elem1.name}</td>
        <td>${elem1.email}</td>
        <td>9854781133</td>
    </tr>
    <tr>
        <td>${elem2.name}</td>
        <td>${elem2.email}</td>
        <td>8967452301</td>
    </tr>
    <tr>
        <td>${elem3.name}</td>
        <td>${elem3.email}</td>
        <td>Not Avilable</td>
    </tr>
`;
}

//Get Recent Classes
async function recentApps() {
  try {
    let res = await fetch(baseURL + "/class/all");
    if (res.ok) {
      let data = await res.json();
      renderAppsData(data.classes);
      let arr = data.classes;
      // console.log("t-classes==", data.classes);
      document.getElementById("total-app").innerText = data.classes.length;
      renderRecentApps(
        arr[arr.length - 1],
        arr[arr.length - 2],
        arr[arr.length - 3]
      );
    }
  } catch (err) {
    console.log(err);
  }
}

//Render Recent Classes
function renderRecentApps(elem1, elem2, elem3) {
  document.getElementById("app-tbody").innerHTML = `
    <tr>
        <td>${elem1.title}</td>
        <td>${elem1.trainerName}</td>
        <td>${elem1.classDate}</td>
        <td>${elem1.classTime}</td>
    </tr>
    <tr>
        <td>${elem2.title}</td>
        <td>${elem2.trainerName}</td>
        <td>${elem2.classDate}</td>
        <td>${elem2.classTime}</td>
    </tr>
    <tr>
        <td>${elem3.title}</td>
        <td>${elem3.trainerName}</td>
        <td>${elem3.classDate}</td>
        <td>${elem3.classTime}</td>
    </tr>
`;
}

//Get Trainer
async function gettrainers() {
  let id = document.getElementById("trainer").value;

  try {
    let res = await fetch(baseURL + `/user/singletrainer/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    console.log(res);
    if (res.ok) {
      let data = await res.json();
      console.log(data);

      let updateform = document.getElementById("updateform");

      updateform.name.value = data.trainer.name;
      updateform.email.value = data.trainer.email;
      updateform.phone.value = data.trainer.phone;
      updateform.country.value = "India";
    }
  } catch (err) {
    swal("", "Error 404", "warning");
  }
}

//Update Trainer
async function updatetrainer(event) {
  event.preventDefault();
  let id = document.getElementById("trainer").value;
  let updateform = document.getElementById("updateform");
  let docObj = {
    name: updateform.name.value,
    email: updateform.email.value,
    phone: updateform.phone.value,
    country: updateform.country.value,
  };
  try {
    let res = await fetch(baseURL + `/user/update/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(docObj),
    });
    // console.log(res);
    if (res.ok) {
      let data = await res.json();
      console.log(data);
      swal("", `${data.trainer.name} detail updated`, "success").then(
        function () {
          recentDocs();
        }
      );
    } else {
      let data = await res.json();
      swal("", `${data.message}`, "warning");
    }
  } catch (err) {
    swal("", `Trainer Detail updated`, "success").then(function () {
      recentDocs();
    });
  }
}

//Trainer Function
function renderDocsData(arr) {
  let docs_tbody = document.getElementById("doc-render");

  docs_tbody.innerHTML = "";
  arr.forEach((elem, ind) => {
    let tr = document.createElement("tr");

    let name = document.createElement("td");
    name.innerText = elem.name;

    let email = document.createElement("td");
    email.innerText = elem.email;

    let phone = document.createElement("td");
    phone.innerText = "Not Avilable";

    let country = document.createElement("td");
    country.innerText = "India";

    let del = document.createElement("td");
    del.innerText = "Remove";
    del.style.color = "red";
    del.addEventListener("click", (e) => {
      swal("", "Confirm Delete?", "info").then(function () {
        deleteUser(elem._id);
      });
    });

    tr.append(name, email, phone, country, del);
    docs_tbody.append(tr);
  });
}

//Add New Trainer
let docForm = document.querySelector(".create-doc form");

docForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const submit = confirm("Confirm submission?");
  if (submit) {
    addDoc();
  }
});

async function addDoc() {
  let docObj = {
    name: docForm.name.value,
    email: docForm.email.value,
    password: docForm.password.value,
    phone: docForm.phone.value,
    country: docForm.country.value,
    role: docForm.role.value,
  };
  // console.log(docObj);
  try {
    let res = await fetch(baseURL + `/user/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify(docObj),
    });
    // console.log(res);
    if (res.ok) {
      let data = await res.json();
      // console.log(data.message)
      swal("", `${data.user.name}`, "success").then(function () {
        recentDocs();
      });
    } else {
      swal("", `${data.msg}`, "warning");
    }
  } catch (err) {
    swal("", "Error 404", "warning");
  }
}
//Search Trainer

let trainerInputTag = document.querySelector("#doc-sf-left>input");
trainerInputTag.addEventListener("input", async (e) => {
  let searchVal = trainerInputTag.value;
  try {
    let res = await fetch(baseURL + `/alltrainer`);
    if (res.ok) {
      let data = await res.json();
      //console.log(data);
      let newData = data.trainers.filter(function (element) {
        return element.name.toLowerCase().includes(searchVal.toLowerCase());
      });
      renderDocsData(newData);
    }
  } catch (err) {
    console.log(err);
  }
});

//Delete Trainer
async function deleteUser(id) {
  try {
    let res = await fetch(baseURL + `/user/delete/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.ok) {
      let data = await res.json();
      recentDocs();
    }
  } catch (err) {
    console.log(err);
  }
}

//Delete Classes
async function deleteClass(id) {
  try {
    let res = await fetch(baseURL + `/class/delete/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.ok) {
      let data = await res.json();
      recentApps();
    }
  } catch (err) {
    console.log(err);
  }
}

//Users Function
function renderPatientsData(arr) {
  let users_tbody = document.getElementById("user-render");

  users_tbody.innerHTML = "";
  arr.forEach((elem) => {
    let tr = document.createElement("tr");

    let name = document.createElement("td");
    name.innerText = elem.name;

    let email = document.createElement("td");
    email.innerText = elem.email;

    let phone = document.createElement("td");
    phone.innerText = "Not Avilable";

    let gender = document.createElement("td");
    gender.innerText = elem.sex;

    let block = document.createElement("td");
    block.innerText = "Block";
    block.style.color = "red";
    block.addEventListener("click", (e) => {
      swal("", "Confirm Block?", "info").then(function () {
        deleteUser(elem._id);
      });
    });

    tr.append(name, email, phone, gender, block);
    users_tbody.append(tr);
  });
}

//User Search
let userInputTag = document.querySelector("#patient-sf-left>input");
userInputTag.addEventListener("input", async (e) => {
  let searchVal = userInputTag.value;
  try {
    let res = await fetch(baseURL + `/user/all`);
    if (res.ok) {
      let data = await res.json();
      let newData = data.users.filter(function (element) {
        return element.name.toLowerCase().includes(searchVal.toLowerCase());
      });
      renderPatientsData(newData);
    }
  } catch (err) {
    console.log(err);
  }
});

//User Filter
let genderFilterTag = document.querySelector("#patient-sf-right > select");

genderFilterTag.addEventListener("change", async (e) => {
  let filterValue = genderFilterTag.value;

  try {
    let res = await fetch(baseURL + `/admin/all/`);
    if (res.ok) {
      let data = await res.json();

      if (Array.isArray(data.usersRegistered)) {
        let newData = data.usersRegistered.filter(function (element) {
          if (filterValue === "1" && element.sex.toLowerCase() === "male") {
            return true;
          } else if (
            filterValue === "2" &&
            element.sex.toLowerCase() === "female"
          ) {
            return true;
          } else if (filterValue === "" || filterValue === "0") {
            return true;
          }
          return false;
        });

        renderPatientsData(newData);
      }
    }
  } catch (err) {
    console.log(err);
  }
});

//Class Search
function renderAppsData(arr) {
  let apps_tbody = document.getElementById("apps-render");

  apps_tbody.innerHTML = "";
  arr.forEach((elem) => {
    let tr = document.createElement("tr");

    let title = document.createElement("td");
    title.innerText = elem.title;

    let trainerName = document.createElement("td");
    trainerName.innerText = elem.trainerName;

    let date = document.createElement("td");
    date.innerText = elem.classDate;

    let time = document.createElement("td");
    time.innerText = elem.classTime;

    let venue = document.createElement("td");
    venue.innerText = elem.venue;

    let del = document.createElement("td");
    del.innerText = "Remove";
    del.style.color = "red";
    del.addEventListener("click", (e) => {
      swal("", "Confirm Delete?", "info").then(function () {
        deleteClass(elem._id);
      });
    });

    tr.append(title, trainerName, date, time, venue, del);
    apps_tbody.append(tr);
  });
}

//Classes Search
let classInputTag = document.querySelector("#app-sf-left>input");
classInputTag.addEventListener("input", async (e) => {
  let searchVal = classInputTag.value;
  try {
    let res = await fetch(baseURL + `/class/all`);
    if (res.ok) {
      let data = await res.json();
      let newData = data.classes.filter(function (element) {
        return element.title.toLowerCase().includes(searchVal.toLowerCase());
      });
      renderAppsData(newData);
    }
  } catch (err) {
    console.log(err);
  }
});

//Classes Filter
let venueFilterTag = document.querySelector("#app-sf-right > select");

venueFilterTag.addEventListener("change", async (e) => {
  let filterValue = venueFilterTag.value;

  try {
    let res = await fetch(baseURL + `/admin/all/`);
    if (res.ok) {
      let data = await res.json();

      if (Array.isArray(data.classesRegistered)) {
        let newData = data.classesRegistered.filter(function (element) {
          if (filterValue === "1" && element.venue === "online") {
            return true;
          } else if (filterValue === "2" && element.venue === "offline") {
            return true;
          } else if (filterValue === "" || filterValue === "0") {
            return true;
          }
          return false;
        });

        renderAppsData(newData);
      }
    }
  } catch (err) {
    console.log(err);
  }
});

//Logout
document.getElementById("menu-logout").addEventListener("click", (e) => {
  swal("", `Logged out successfully`, "success").then(function () {
    window.location.href = "./login.html";
  });
});
