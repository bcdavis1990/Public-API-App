/**
 * Going for a Meets Expectations Grade. I started on the search bar functionality for the "Exceeds" portion and will continue to work on that with my own time.
 */

/**
 * Global Variables
 */
const peopleURL =
  "https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&nat=us";
const gallery = document.getElementById("gallery");

/**
 * Functions
 */

// Generic Fetch Function
fetch(peopleURL)
  .then(checkStatus)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.results);
    generateEmployees(data.results);
    generateModal(data.results);
  })
  .catch((error) => console.log("problems fetching data"));

//Function that checks to make sure the request went through successfully. **Change the .catch error to display to the page eventually
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

//Function that generates the 12 returned employees from the data fetched
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

//Function that grabs a user that is selected and creates and index for the data to be inserted in the modal
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

//Function that creates and displays the modal to the page
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

  /**
   * Closing out of the modal
   */
  const xButton = document.querySelector(".modal-close-btn");
  const modalContainer = document.querySelector(".modal-container");

  xButton.addEventListener("click", () => {
    modalContainer.remove;
  });
}

/**
 * Extra Credit
 * Going to work on this later
 */

//Search Bar
const search = document.querySelector(".search-container");
const searchHTML = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;
search.insertAdjacentHTML("beforeend", searchHTML);
const searchBar = document.getElementById("search-input");
searchBar.addEventListener("input", searchFunction);

function searchFunction(event) {
  const searchName = event.target.value.toLowerCase(); //targets what is being typed into the search bar
  const employeeName = document.querySelectorAll(".card-name"); //targets all 12 employee cards
  console.log(employeeName.length); //returns 12
}
