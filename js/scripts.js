const pokemonRepo = (function() {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // checks for specific objects and pushes new pokemon into list
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      "name" in pokemon &&
      "height" in pokemon &&
      "type" in pokemon
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
  button.classList.add('button-search');
  button.addEventListener('click', function(event) {
    let element = document.querySelector('.search_input');
    //element.classList.contains('search_input');
    element.classList.toggle('search_input');
  });

  //   let pokemonMatch = pokemonList.filter(pokemon => pokemon.name === queryName);
    // return pokemonMatch;
   //});
}

function addListItem(pokemon) {
  // selects the pokemon-list class
  let pokemonList = document.querySelector('.pokemon-list');
  // creates li in ul from index.html
  let listPokemon = document.createElement('li');
  let button = document.createElement('button');
    button.innerText = pokemon.name;
    //adds css class
    button.classList.add('button-class');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);

    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
    }
  // loads pokemon list from api
  function loadList() {
    //return showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          height: item.height,
          type: item.type,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
  // gets details from url from api
  function loadDetails(item) {
    return showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      //add details to the item
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
  }).catch(function (e) {
    console.error(e);
  });
  }

function showDetails(pokemon) {
  pokemonRepo.loadDetails(pokemon).then (function () {
    console.log(pokemon);
  });
}

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails
};
})();

// adds pichu to pokemonList
//pokemonRepo.addListItem({name: 'Pichu', height: 0.4, type: ["electric"]});

// gets list of pokemon
console.log(pokemonRepo.getAll());

//loads pokemon from api then add them to the pokemonList
pokemonRepo.loadList().then(function() {
  pokemonRepo.getAll().forEach(function (pokemon) {
    pokemonRepo.addListItem(pokemon);
  });
});




//document.write(pokemon.name + " height: " + pokemon.height + " m" + "<br>" );
//if (pokemon.height > 0.6) {
 //document.write(" - Wow, that's big! <br>");
