let url = "https://fitnesshub-backend.onrender.com";

let boxContainer = document.querySelector("#trainers .box-container");

let loding_container = document.getElementById("loding_container");

async function getTrainerData() {
  try {
    let res = await fetch(`${url}/alltrainer`);
    let data = await res.json();
    console.log("trainerData", data);
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
            <img src=https://im.rediff.com/getahead/2018/dec/28sonali-swami2.jpg?w=670&h=900 alt="">
            <div class="content">
                <span>Personal Trainer</span>
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
