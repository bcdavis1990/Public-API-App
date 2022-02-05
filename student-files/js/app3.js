//global variables
const peopleURL =
  "https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&nat=us";
const gallery = document.getElementById("gallery");

// generic fetch function
fetch(peopleURL)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.results);
    generateEmployees(data.results);
    generateModal(data.results);
  })
  .catch((err) => console.error("problems fetching data"));

//generate employee cards
function generateEmployees(data) {
  gallery.insertAdjacentHTML(
    "beforeend",
    data
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
}

//generate the modal
function generateModal(data) {
  const elements = document.getElementsByClassName("card");
  console.log(elements);
  for (let i = 0; i < data.length; i++) {
    elements[i].addEventListener("click", (e) => {
      let currentPerson = data.indexOf(data[i]);
      console.log(currentPerson);
      createModal(data[currentPerson]);
    });
  }
}

//layout the modal
function createModal(data) {
  let modal = `<div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
        <img class="modal-img" src=${data.picture.large} alt="profile picture">
            <h3 id="name" class="modal-name cap">${data.name.first} ${
    data.name.last
  }</h3>
            <p class="modal-text">${data.email}</p>
            <p class="modal-text cap">${data.location.city}</p>
            <hr>
            <p class="modal-text">${data.phone}</p>
            <p class="modal-text">${data.location.street.number} ${
    data.location.street.name
  }, ${data.location.city}, ${data.location.state}, ${
    data.location.postcode
  }</p>
            <p class="modal-text">Birthday: ${data.dob.date.slice(
              5,
              7
            )}/${data.dob.date.slice(8, 10)}/${data.dob.date.slice(0, 4)}</p>
        </div>
    </div>`;

  gallery.insertAdjacentHTML("beforeend", modal);
}
