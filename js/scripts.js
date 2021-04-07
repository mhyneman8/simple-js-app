const pokemonRepo = (function() {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
  let searchInput = $('#search-bar');

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
    let modalContainer = $('#pokedex');
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');

    modalTitle.empty();
    modalBody.empty();

    let createImg = $('<img class="modal-img img-fluid">');
    createImg.attr('src', pokemon.imageUrl);

    let createName = $('<h1>' + cap(pokemon.name) + '</h1>');

    let createHeight = $('<h2>' + "Height: " + pokemon.height*10 + " cm" +'</h2>');


    let createAbility = $('<h2>' + "Ability: " + pokemon.abilities + '</h2>');

    let createType = $('<h2>' + "Type: " + pokemon.types[0] + '</h2>');

    // modalContainer.append(modalTitle);
    // modalContainer.append(modalBody);

    modalTitle.append(createName);
    modalBody.append(createImg);
    modalBody.append(createType);
    modalBody.append(createHeight);
    modalBody.append(createAbility);
  });
}

  //create modal and content
  // function container () {
  //   let createDiv = document.querySelector('.list-group');
  //   createDiv.classList.add('modal-foreground');

    // let createButton = document.createElement('button');
    // createButton.classList.add('close');
    // createButton.innerText = 'X';
    // createButton.addEventListener('click', hide);

    // let createImg = document.createElement('img');
    // createImg.classList.add('pokemon-img');
    // createImg.src = pokemon.imageUrl;
    // createImg.alt = "Image of " + pokemon.name;

    // let createName = document.createElement('h1');
    // createName.classList.add('h1');
    // createName.innerHTML = cap(pokemon.name);

    // let createHeight = document.createElement('h2');
    // createHeight.classList.add('h2');
    // createHeight.innerHTML = "Height: " + pokemon.height*10 + "cm";

    // let createAbility = document.createElement('h2');
    // createAbility.classList.add('h2');
    // createAbility.innerHTML = "Ability: " + pokemon.abilities;

    // let createType = document.createElement('h2');
    // createType.classList.add('h2');
    // createType.innerHTML = "Type: " + pokemon.types;

    //switch to change background with type
    // let types = pokemon.types[0];
    // console.log(types);
    //
    // switch (types) {
    //   case "Grass":
    //     types.classList.add('green');
    //     break;
    //   case "Electric":
    //     types.classList.add('yellow');
    //     break;
    //   case "Water":
    //     types.classList.add('blue');
    //     break;
    // }

    // how to change background based on types
    //  function changeBackground() {
      //  return new Promise((resolve, reject) => {
        //  if (createType.innerHTML === "grass") {
          //  resolve({createDiv.addClass('green')});
          //} else if (createType.innerHTML === 'electric') {
          //  resolve({createDiv.addClass('yellow')});
        //  } else if (createType.innerHTML === 'fire') {
          //  resolve({createDiv.addClass('red')});
          //} else {
          //  resolve(console.log('nope'));
          //}
      //  })
      //}



    //appends all created elements
  //   createDiv.appendChild(createButton);
  //   createDiv.appendChild(createImg);
  //   createDiv.appendChild(createName);
  //   createDiv.appendChild(createHeight);
  //   createDiv.appendChild(createAbility);
  //   createDiv.appendChild(createType);
  //   modalContainer.prepend(createDiv);
  //
  //   createDiv.classList.add('visible');
  // }

  // function hide() {
  //   let x = modalContainer.querySelector('div');
  //   x.classList.remove('visible');
  // }

//   window.addEventListener('keydown', (event) => {
//     let y = modalContainer.querySelector('div');
//     if (event.key === 'Escape' && y.classList.contains('visible')) {
//       hide();
//     }
//   })
//   container();
//   });
// }

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
  let pokemonList = document.querySelector('.list-group');
  // creates li in ul from index.html
  let listPokemon = document.createElement('li');
  listPokemon.classList.add('list-group-item');
  listPokemon.classList.add('list-group-action');

  let button = document.createElement('button');
    button.innerText = cap(pokemon.name);
    //adds css class
    button.classList.add('btn');
    button.classList.add('btn-secondary');
    button.classList.add('btn-lg');
    button.setAttribute('data-target', '#modal');
    button.setAttribute('data-toggle', 'modal');

    listPokemon.append(button);
    pokemonList.append(listPokemon);


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


    // Search bar listener
  searchInput.addEventListener('input', function () {
    let pokemonList = $('.list-group-item');
    let filterValue = searchInput.value.toUpperCase();

    pokemonList.forEach(function(pokemon){
      console.log(pokemon.innerText);
      if(pokemon.innerText.toUpperCase().indexOf(filterValue) > -1) {
        pokemon.style.display = '';
      }else {
        pokemon.style.display = 'none';
      }
    })
  });

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
