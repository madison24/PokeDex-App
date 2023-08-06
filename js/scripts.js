let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
    { name: "Butterfree", height: 1.2, types: ["bug", "flying"] },
    { name: "Slowbro", height: 0.8, types: ["water", "psychic"] },
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
  };
})();

console.log(pokemonRepository.getAll());
pokemonRepository.getAll().forEach(function (pokemon) {
  if (pokemon.height >= 1) {
    document.write(
      "<p>" +
        pokemon.name +
        " " +
        "(Height:" +
        " " +
        pokemon.height +
        ") - Wow! that is a big pokemon! " +
        "</p>"
    );
  } else if (pokemon.height) {
    document.write(
      "<p>" +
        pokemon.name +
        " " +
        "(Height:" +
        " " +
        pokemon.height +
        ")  " +
        "</p>"
    );
  }
});
