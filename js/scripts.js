//const pokemonRepository =
(function() {

  let pokemonList = [
    {name: 'Squirtle', height: 0.5, type: ['Monster', 'Water'], hp: 44},
    {name: 'Charmander', height: 0.6, type: ['Monster', 'Dragon'], hp: 39},
    {name: 'Bulbasaur', height: 0.7, type: ['Grass', 'Monster'], hp: 45},
    {name: 'Pikachu', height: 0.4, type: ['Electric', 'Fairy'], hp: 35}
  ];
  console.log(pokemonList)
})();








//  pokemonList.forEach(function(pokemon) {
  //  document.write(pokemon.name + " height: " + pokemon.height + " m" + "<br>" );
    //if (pokemon.height > 0.6) {
     //document.write(" - Wow, that's big! <br>");
//}
//});


//  function add(pokemon) {
    //pokemonList.push(pokemon);
  //}

  //function getAll() {
    //return pokemonList;
  //}

//return {
//  add: add,
//  getAll: getAll
//};
//})();
//console.log(pokemonRepository.getAll);


// prints list of pokemon in pokemonList
//for (let i = 0; i < pokemonList.length ; i++) {
  //document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + " m)");

  // prints when pokemon is over 0.6 m
  //if (pokemonList[i].height > 0.6) {
  //  document.write(" - Wow, that's big!");
  //}
  // breaks line after each item
  //document.write('<br>');
//}

// forEach loop replaces for loop. "cleans" it
//pokemonRepository.forEach(function(pokemon) {
  //document.write(pokemonRepository.getAll + " height: " + pokemon.height + " m" + "<br>");
  //if (pokemon.height > 0.6) {
    //document.write(" - Wow, that's big!");
//  }
//});
