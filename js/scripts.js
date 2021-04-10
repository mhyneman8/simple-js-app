const pokemonRepo = (function() {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  // Capitalize pokemon
  function cap(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  // add to pokedex
  function add(pokemon) {
    if (typeof pokemon === 'object') {
      pokemonList.push(pokemon);
  } else {
    /* eslint-disable no-console */
    console.error('you need an object');
    /* eslint-enable no-console */
  }
}

//returns all pokemon
function getAll() {
  return pokemonList;
}

$(document).ready(function () {
  $('#modal').on('show.bs.modal', function () {
    var mod = $('.modal');
    $('.pokedex-window-scrollbox').append(mod);
  });
})

// display pokemon in modal
function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let createImg = $('<img class="modal-img img-fluid">');
    createImg.attr('src', pokemon.imageUrl);

    let createName = $('<h1>' + cap(pokemon.name) + '</h1>');

    let createHeight = $('<h2>' + 'Height: ' + pokemon.height*10 + ' cm' +'</h2>');


    let createAbility = $('<h2>' + 'Ability: ' + pokemon.abilities + '</h2>');

    let createType = $('<h2>' + 'Type: ' + pokemon.types[0] + '</h2>');

    // switch to change background with type
    let types = pokemon.types[0];

    // $('#modal').data('bs.modal').$backdrop.css('background-color', 'orange');

    $('#modal').addClass('${types.toLowerCase()}-bg');



    modalTitle.append(createName);
    modalBody.append(createImg);
    modalBody.append(createType);
    modalBody.append(createHeight);
    modalBody.append(createAbility);
  });
}

// loading page
function showLoading() {
  let pokemonList = $('.pokedex-window');
  let newDiv = $('<div></div>');
  newDiv.text('Loading List!');
  newDiv.addClass('msg-board');
  pokemonList.prepend(newDiv);
}
// hide loading page
function hideLoading() {
  let pokemonList = document.querySelector('.pokedex-window');
  let node = pokemonList.firstElementChild;
  //set timeout
  window.setTimeout(function () {
    node.parentElement.removeChild(node);
  }, 500)
}
// display pokemon from webpage
function addListItem(pokemon) {

  // selects the pokemon-list class
  let pokemonList = $('.list-group');
  // creates li in ul from index.html
  let listPokemon = $('<li class="list-group-item list-group-action"></li>');

  let button = $('<button></button>');
    button.text(cap(pokemon.name));
    //adds css class
    button.addClass('btn');
    button.addClass('btn-secondary');
    button.addClass('btn-lg');
    button.attr('data-target', '#modal');
    button.attr('data-toggle', 'modal');

    listPokemon.append(button);
    pokemonList.append(listPokemon);


    button.on('click', function() {
      showDetails(pokemon);
    });
  }

    // search
    $(document).ready(function() {
      $('#search-bar').on('keyup', function() {
        var value = $(this)
          .val()
          .toLowerCase();
        $('.pokemon-list *').filter(function() {
          $(this).toggle(
            $(this)
              .text()
              .toLowerCase()
              .indexOf(value) > -1
          );
        });
      });
    });

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
      /* eslint-disable no-console */
      console.error(e);
      /* eslint-enable no-console */
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
        item.abilities.push(' ' + cap(itemAbility.ability.name));
      })
      item.types = [];
      details.types.forEach(function(itemType){
        item.types.push(' ' + cap(itemType.type.name));
      })
    }).then (function () {
      hideLoading();
    }).catch(function (e) {
      /* eslint-disable no-console */
      console.error(e);
      /* eslint-enable no-console */
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
