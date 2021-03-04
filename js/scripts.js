const pokemonRepository = (function() {

  let pokemonList = [
    {name: 'Squirtle', height: 0.5, type: ['Monster', 'Water'], hp: 44},
    {name: 'Charmander', height: 0.6, type: ['Monster', 'Dragon'], hp: 39},
    {name: 'Bulbasaur', height: 0.7, type: ['Grass', 'Monster'], hp: 45},
    {name: 'Pikachu', height: 0.4, type: ['Electric', 'Fairy'], hp: 35}
  ];

  function add(pokemon) {
    pokemonList.push(pokemon);
    document.write(pokemonList);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

pokemonRepository.add({name: pichu, height: 0.4, type: "electric"});

// gets list of pokemon
pokemonRepository.getAll().forEach(function(pokemon) {
    document.write(pokemon.name + " height: " + pokemon.height + " m" + "<br>" );
    if (pokemon.height > 0.6) {
     document.write(" - Wow, that's big! <br>");
}
});
