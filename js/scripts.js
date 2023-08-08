let pokemonRepository = (function () {
  let repository = [
    { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
    { name: "Butterfree", height: 1.2, types: ["bug", "flying"] },
    { name: "Slowbro", height: 0.8, types: ["water", "psychic"] },
  ];

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      repository.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return repository;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");

    button.innerText = pokemon.name;
    button.classList.add("button-class");

    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });

    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
  }
  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  };
})();

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
