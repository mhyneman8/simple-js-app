const pokemonRepo = (function() {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  // Capitalize pokemon
  function cap(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  // add to pokedex
  function add(pokemon) {
    if (typeof pokemon === 'object' &&
        typeof pokemon !== null) {
      pokemonList.push(pokemon);
  } else {
    console.log('you need an object');
  }
}

//returns all pokemon
function getAll() {
  return pokemonList;
}

// display pokemon in modal
function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    let modalContainer = document.querySelector('.pokedex-window');

  //create modal and content
  function container () {
    let createDiv = document.createElement('div');
    createDiv.classList.add('modal-foreground');

    let createButton = document.createElement('button');
    createButton.classList.add('close');
    createButton.innerText = 'X';
    createButton.addEventListener('click', hide);

    let createImg = document.createElement('img');
    createImg.classList.add('pokemon-img');
    createImg.src = pokemon.imageUrl;
    createImg.alt = "Image of " + pokemon.name;

    let createName = document.createElement('h1');
    createName.classList.add('h1');
    createName.innerHTML = cap(pokemon.name);

    let createHeight = document.createElement('h2');
    createHeight.classList.add('h2');
    createHeight.innerHTML = "Height: " + pokemon.height*10 + "cm";

    let createAbility = document.createElement('h2');
    createAbility.classList.add('h2');
    createAbility.innerHTML = "Ability: " + pokemon.abilities;

    let createType = document.createElement('h2');
    createType.classList.add('h2');
    createType.innerHTML = "Type: " + pokemon.types;

    //appends all created elements
    createDiv.appendChild(createButton);
    createDiv.appendChild(createImg);
    createDiv.appendChild(createName);
    createDiv.appendChild(createHeight);
    createDiv.appendChild(createAbility);
    createDiv.appendChild(createType);
    modalContainer.prepend(createDiv);

    createDiv.classList.add('visible');
  }

  function hide() {
    let x = modalContainer.querySelector('div');
    x.classList.remove('visible');
  }

  window.addEventListener('keydown', (event) => {
    let y = modalContainer.querySelector('div');
    if (event.key === 'Escape' && y.classList.contains('visible')) {
      hide();
    }
  })
  container();
  });
}

// loading page
function showLoading() {
  let pokemonList = document.querySelector('.pokedex-window');
  let newDiv = document.createElement('div');
  newDiv.innerText = 'Loading List!';
  newDiv.classList.add('msg-board');
  pokemonList.prepend(newDiv);
}
// hide loading page
function hideLoading() {
  let pokemonList = document.querySelector('.pokedex-window');
  let node = pokemonList.firstElementChild;
  //set timeout
  window.setTimeout(function () {
    node.parentElement.removeChild(node);
  }, 300)
}
// display pokemon from webpage
function addListItem(pokemon) {
  // selects the pokemon-list class
  let pokemonList = document.querySelector('.pokemon-list');
  // creates li in ul from index.html
  let listPokemon = document.createElement('li');
  let button = document.createElement('button');
    button.innerText = cap(pokemon.name);
    //adds css class
    button.classList.add('pokemon-list-style');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);

    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
    }
    // fix later
    // search
  //  function filter() {
  //    let search = document.querySelector('#button-search');
  //    search.addEventListener('click', function() {
  //      let button = document.querySelector('#search-container')
  //      button.classList.toggle('is-visible')
//      })
//    }

    //power down
    function powerDown() {
      let powerButton = document.querySelector('.header-powerbtn');
      powerButton.addEventListener('click', function() {
        if(document.getElementById('overlay').style.display === 'none') {
          if (window.confirm('Are you sure you want to power down?')) {
            document.getElementById('overlay').style.display = 'block';
        }} else {
            document.getElementById('overlay').style.display = 'none';
        }
      })
    }
    //load pokemon name and url
    function loadList() {
      showLoading();
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).then (function () {
        hideLoading();
      }).catch(function (e) {
      hideLoading();
      console.error(e);
    })
}
  function loadDetails(item) {
    showLoading();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // details requested
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.abilities = [];
      details.abilities.forEach(function (itemAbility) {
        item.abilities.push(" " + cap(itemAbility.ability.name));
      })
      item.types = [];
      details.types.forEach(function(itemType){
        item.types.push(" " + cap(itemType.type.name));
      })
    }).then (function () {
      hideLoading();
    }).catch(function (e) {
      console.error(e);
    });
  }

// allows use outside of IIFE
return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails,
  powerDown: powerDown,
  hideLoading: hideLoading
};
})();

//loads pokemon from api then add them to the pokemonList
pokemonRepo.loadList().then(function() {
  pokemonRepo.getAll().forEach(function (pokemon) {
    pokemonRepo.addListItem(pokemon);
  });
});

pokemonRepo.powerDown();
