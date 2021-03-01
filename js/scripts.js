let pokemonList = [
  {name: 'Squirtle', height: 0.5, type: ['Monster', 'Water'], hp: 44},
  {name: 'Charmander', height: 0.6, type: ['Monster', 'Dragon'], hp: 39},
  {name: 'Bulbasaur', height: 0.7, type: ['Grass', 'Monster'], hp: 45},
  {name: 'Pikachu', height: 0.4, type: ['Electric', 'Fairy'], hp: 35}
];

// prints list of pokemon in pokemonList
for (let i = 0; i < pokemonList.length ; i++) {
  document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + " m)");

  // prints when pokemon is over 0.6 m
  if (pokemonList[i].height > 0.6) {
    document.write(" - Wow, that's big!");
  }
  // breaks line after each item
  document.write('<br>');

}
