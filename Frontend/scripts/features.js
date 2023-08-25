let url = "http://localhost:3456/";

let boxContainer = document.querySelector("#trainers .box-container");

let loding_container = document.getElementById("loding_container");

async function getTrainerData() {
  try {
    let res = await fetch(`${url}/alltrainer`);
    let data = await res.json();
    console.log(data);
    displayTrainerData(data.trainers);
  } catch (error) {
    console.log(error);
  }
}
getTrainerData();

function displayTrainerData(data) {
  boxContainer.innerHTML = "";
  boxContainer.innerHTML = `
     
      ${data
        .map((elem) => {
          return `
        <div class="box">
            <img src=https://img.freepik.com/free-photo/young-sports-people-training-morning-gym_1157-28954.jpg alt="">
            <div class="content">
                <span>expert trainer</span>
                <h3>${elem.name}</h3>
                <a href="../html/login.html" class="btn" data-id=${elem._id}>Book Appointment</a>
                <div class="share">
                    <a href="#" class="fab fa-facebook-f"></a>
                    <a href="#" class="fab fa-twitter"></a>
                    <a href="#" class="fab fa-pinterest"></a>
                    <a href="#" class="fab fa-linkedin"></a>
                </div>
            </div>
       </div>
          `;
        })
        .join("")}`;

  let appointmentBtns = document.querySelectorAll(".btn");

  for (let appointmentBtn of appointmentBtns) {
    appointmentBtn.addEventListener("click", (e) => {
      let id = e.target.dataset.id;
      sessionStorage.setItem("trainerId", id);
    });
  }
}
