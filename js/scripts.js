let pokemonList = [
  { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
  { name: "Butterfree", height: 1.2, types: ["bug", "flying"] },
  { name: "Slowbro", height: 0.8, types: ["water", "psychic"] },
];

pokemonList.forEach(function (pokemon) {
  document.write(
    "<p>" + pokemon.name + " (height: " + pokemon.height + ")" + "</p>"
  );
});

//The list of pokemon with text next to the tallest//

/* for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 1) {
    document.write(
      "<p>" +
        pokemonList[i].name +
        " (height: " +
        pokemonList[i].height +
        ")" +
        " " +
        " - Wow, that's big!"
    );
  } else {
    document.write(
      "<p>" +
        pokemonList[i].name +
        " (height: " +
        pokemonList[i].height +
        ")" +
        "</p>"
    );
  }
}
*/
