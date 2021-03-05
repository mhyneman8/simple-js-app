const pokemonRepo = (function() {

  let pokemonList =
    [{name: 'Squirtle', height: 0.5, type: ['Water'], hp: 44},
    {name: 'Charmander', height: 0.6, type: ['Fire'], hp: 39},
    {name: 'Bulbasaur', height: 0.7, type: ['Grass', 'Monster'], hp: 45},
    {name: 'Pikachu', height: 0.4, type: ['Electric', 'Fairy'], hp: 35}
  ];

  return {
    // add a pokemon, as long as it's an object
    add: function(pokemon) {
      if (typeof(pokemon) === 'object' && typeof(pokemon) !== null) {
        pokemonList.push(pokemon);
      } else {
        console.log('you need an object');
      }
    },
    // retuns list of all pokemonList array
    getAll: function() {
      return pokemonList;
    }
  };
//  filter(arr, query) {
  //  return arr.filter(funcion(el))
    //  return el.toLowerCase().indexOf(query.toLowerCase()) !== -1
//  };
})();

//console.log(pokemonRepo.filter(pokemonRepo, 'grass'));

// adds pichu to pokemonList
pokemonRepo.add({name: 'Pichu', height: 0.4, type: ["electric"]});

// gets list of pokemon
pokemonRepo.getAll().forEach(function(pokemon) {
    document.write(pokemon.name + " height: " + pokemon.height + " m" + "<br>" );
    if (pokemon.height > 0.6) {
     document.write(" - Wow, that's big! <br>");
}
});
