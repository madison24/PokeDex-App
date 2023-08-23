let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    listItem.classList.add(
      "list-group-item",
      "row",
      "bg-transparent",
      "border-0"
    );
    button.classList.add("btn", "btn-primary", "btn-lg", "button-custom");
    button.innerText = pokemon.name;
    button.setAttribute("data-target", "#modal-container");
    button.setAttribute("data-toggle", "modal");

    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon);
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //adds pokemon details
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = [];
        for (let i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
        item.abilities = [];
        for (let i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }
        showModal(item);
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //modal for pokemon
  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    // let modalHeader = $(".modal-header");

    // clear exisiting content
    modalTitle.empty();
    modalBody.empty();

    let titleElement = $("<h1>" + pokemon.name + "</h1>");
    let imageElement = $('<img class="modal-img">');
    imageElement.attr("src", pokemon.imageUrl);
    let heightElement = $("<p>" + "Height: " + pokemon.height + "</p>");
    let weightElement = $("<p>" + "Weight: " + pokemon.weight + "</p>");
    let typesElement = $("<p>" + "Types: " + pokemon.types.join(", ") + "</p>");
    let abilitiesElement = $(
      "<p>" + "Abilities: " + pokemon.abilities.join(", ") + "</p>"
    );

    typesElement.addClass("arrary-item");
    abilitiesElement.addClass("arrary-item");

    modalTitle.append(titleElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

function hideModal() {
  let modalContainer = document.querySelector("#modal-container");
  modalContainer.classList.remove("is-visible");
}

//contact form
let nameError = document.getElementById("name-error");
let emailError = document.getElementById("email-error");
let messageError = document.getElementById("message-error");
let sumbitError = document.getElementById("sumbit-error");

//name validation
function validateName() {
  let name = document.getElementById("contact-name").value;

  if (name.length == 0) {
    nameError.innerHTML = "Name is required";
    return false;
  }
  if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    nameError.innerHTML = "Write full name";
    return false;
  }
  nameError.innerHTML = '<i class="fa-solid fa-check"></i>';
  return true;
}

//email validation
function validateEmail() {
  let email = document.getElementById("contact-email").value;

  if (email.length == 0) {
    emailError.innerHTML = "Email is required";
    return false;
  }
  if (!email.match(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm)) {
    emailError.innerHTML = "Email Invalid";
    return false;
  }
  emailError.innerHTML = '<i class="fa-solid fa-check"></i>';
  return true;
}

//message validation
function validateMessage() {
  let message = document.getElementById("contact-message").value;
  let required = 15;
  let left = required - message.length;

  if (left > 0) {
    messageError.innerHTML = left + "more characters required";
    return false;
  }
  messageError.innerHTML = '<i class="fa-solid fa-check"></i>';
  return true;
}

//sumbit validate form
function validateForm() {
  if (!validateName() || !validateEmail() || !validateMessage()) {
    sumbitError.style.display = "block";
    sumbitError.innerHTML = "Please fix error to sumbit";
    setTimeout(function () {
      sumbitError.style.display = "none";
    }, 3000);
    return false;
  }
  if (validateName() && validateEmail() && validateMessage()) {
    // const div = document.querySelector("button");
    // div.classList.remove("disabled");
    alert("Message sent!");
    return true;
  }
}

/* Old JS
  modal 
    let modalContainer = document.querySelector("#modal-container");
  
    clear existing content
    modalContainer.innerHTML = " ";
    let modal = document.createElement("div");
    modal.classList.add("modal");

  closes modal
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

  modal content
   let titleElement = document.createElement("h1");
    titleElement.classList.add("pokemon-name");
    titleElement.innerText = pokemon.name;

    let imageElement = document.createElement("img");
    imageElement.classList.add("modal-img");
    imageElement.src = pokemon.imageUrl;

    let contentElement = document.createElement("p");
    contentElement.classList.add("pokemon-height");
    contentElement.innerText = "Height: " + pokemon.height;

 modal.appendChild(closeButtonElement);
    modal.appendChild(imageElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");

    modalContainer.addEventListener("click", (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
    window.addEventListener("keydown", (e) => {
      let modalContainer = document.querySelector("#modal-container");
      if (
        e.key === "Escape" &&
        modalContainer.classList.contains("is-visible")
      ) {
        hideModal();
      }
*/
