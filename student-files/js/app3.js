//global variables
const peopleURL =
  "https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&nat=us";
const gallery = document.getElementById("gallery");

// generic fetch function
function fetchData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => data.results.map((data) => data))
    .then((info) => generateEmployees(info))
    .catch((err) => console.log(err));
}

fetchData(peopleURL);

//generate employees fetched data and create modal element on them
function generateEmployees(info) {
  gallery.insertAdjacentHTML(
    "beforeend",
    info
      .map(
        (item) => `<div class="card"> <div class="card-img-container">
  <img class="card-img" src=${item.picture.large} alt="profile picture">
  </div>
  <div class="card-info-container">
  <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last} </h3>
  <p class="card-text">${item.email}</p>
  <p class="card-text cap">${item.location.city}, ${item.location.state}</p>
  </div>
  </div>`
      )
      .join("")
  );
  const elements = document.getElementsByClassName(".card");

  function generateModal() {
    const div = document.createElement("div");
    gallery.appendChild(div);

    div.innerHTML = `<div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
        <img class="modal-img" src= alt="profile picture">
            <h3 id="name" class="modal-name cap">${item.name.first}</h3>
            <p class="modal-text">email</p>
            <p class="modal-text cap">city</p>
            <hr>
            <p class="modal-text">(555) 555-5555</p>
            <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
            <p class="modal-text">Birthday: 10/21/2015</p>
        </div>
    </div>`;
  }

  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", generateModal);
  }
}
