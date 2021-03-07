const pokemonRepo = (function() {

  let pokemonList =
    [{name: 'Squirtle', height: 0.5, type: ['Water'], hp: 44},
    {name: 'Charmander', height: 0.6, type: ['Fire'], hp: 39},
    {name: 'Bulbasaur', height: 0.7, type: ['Grass', 'Monster'], hp: 45},
    {name: 'Pikachu', height: 0.4, type: ['Electric', 'Fairy'], hp: 35}
  ];

  // che cks for specific objects and pushes new pokemon into list
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      "name" in pokemon &&
      "height" in pokemon &&
      "type" in pokemon &&
      "hp" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.error("pokemon is not correct")
    }
  }

//returns all pokemon
function getAll() {
  return pokemonList;
}

// filters pokemon by searched name
function find(queryName) {
  let pokemonMatch = pokemonList.filter(pokemon => pokemon.name === queryName);
  return pokemonMatch;
}

function showDetails(pokemon) {
  console.log(pokemon);
}

function addListItem(pokemon) {
  // selects the pokemon-list class
  let pokeList = document.querySelector('.pokemon-list');
  // creates li in ul from index.html
  let listPokemon = document.createElement('li');
  let button = document.createElement('button');
    button.innerText = pokemon.name;
    //adds css class
    button.classList.add('button-class');
    listPokemon.appendChild(button);
    pokeList.appendChild(listPokemon);

    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
    }


return {
  add: add,
  getAll: getAll,
  addListItem: addListItem
};

})();

//console.log(pokemonRepo.filter(pokemonRepo, 'grass'));

// adds pichu to pokemonList
pokemonRepo.addListItem({name: 'Pichu', height: 0.4, type: ["electric"]});

// gets list of pokemon
console.log(pokemonRepo.getAll());

pokemonRepo.getAll().forEach(function (pokemon) {
  pokemonRepo.addListItem(pokemon);
});




//document.write(pokemon.name + " height: " + pokemon.height + " m" + "<br>" );
//if (pokemon.height > 0.6) {
 //document.write(" - Wow, that's big! <br>");
