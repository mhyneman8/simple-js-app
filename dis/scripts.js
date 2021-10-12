// IIFE
const pokemonRepo = (function() {

  // load pokemon from external API
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
  
  //returns all pokemon data
  function getAll() {
    return pokemonList;
    // return pokemonList.sort(byId);
  }

  //  function getAll(sortBy) {
       
  //           switch(sortBy) {
  //             case 'type':
  //               console.log('type');
  //               return pokemonList;
  
  //             case 'evolution':
  //               console.log('evolution');
  //               return pokemonList;
              
  //             case 'number':
  //               console.log('number');
  //                 return pokemonList;
                
  //             default:
  //               console.log('default');
  //           }
  //         }
  
  $(document).ready(function () {
    $('#modal').on('show.bs.modal', function () {
      var mod = $('.modal');
      $('.pokedex-window-scrollbox').append(mod);
    });
  })
  
  
  // $(document).ready(function () {
  //   $('#modal').on('show.bs.modal', function () {
  //     var mod = $('.modal');
  //     $('.pokedex-window-scrollbox').append(mod);
  //   });
  // })
  
  
  // display pokemon in modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');
      let modalHead = $('.modal-content');
      let createImg = $('<img>');
        createImg.addClass('modal-img');
        createImg.addClass('img-fluid');
      let createName = $('<h2>');
        createName.addClass('center');
        createName.innerHTML(cap(pokemon.name));
      let createHeight = $('<h2>' + 'Height: ' + pokemon.height*10 + ' cm' +'</h2>');
      let createAbility = $('<h2>' + 'Ability: ' + pokemon.abilities + '</h2>');
      let createType = $('<h2>' + 'Type: ' + pokemon.types[0] + '</h2>');

      modalTitle.empty();
      modalBody.empty();
      
      createImg.attr('src', pokemon.imageUrl);
  
  
      // switch to change background with type
      // let types = pokemon.types[0];
  
      // $(modalBody).addClass(`${types.toLowerCase()}-bg`);
      // $(modalHead).addClass(`${types.toLowerCase()}-bg`);
  
      // $('#close').on('click', function() {
      //   $(modalHead).removeClass(`${types.toLowerCase()}-bg`);
      //   $(modalBody).removeClass(`${types.toLowerCase()}-bg`);
      // });

      // types lowercase for the background image
      // modalBody.addClass('${types.toLowerCase()-bg}')
      // modalHead.append(modalTitle);
  
      modalHead.append(modalBody);
      modalBody.append(createName);
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
    //set timeout
    window.setTimeout(function () {
      $('.msg-board').remove();
    }, 500)
  }
  
  // display pokemon from webpage
  function addListItem(pokemon) {
  
    // selects the pokemon-list class
    let pokemonList = $('.list-group');
    // creates li in ul from index.html
    let listPokemon = $('<li></li>');
      listPokemon.addClass('list-group-item');
      listPokemon.addClass('list-group-action');
  
    let button = $('<button></button>');
      button.text(cap(pokemon.name));
      //adds css class
      button.addClass('btn');
      button.addClass('btn-secondary');
      button.addClass('btn-lg');
      button.addClass('btn-pokemon');
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

      // filter pokemon by ID
      // function byId(a, b) {
      //   return parseInt(a.ed, 10) - parseInt(b.id, 10);
      // }

      // function byEvolution(a, b) {
      //   return parseInt(a.ed, 10) - parseInt(b.id, 10)
      // }

      // function byType(a, b) {
      //   return parseInt(a.ed, 10) - parseInt(b.id, 10);
      // }

      // filter pokemon by alpha
      // const btn = document.querySelector('#type');
      // handle button click
      // btn.onclick = function () {
      //   const rbs = document.querySelectorAll('input[name="filter"]');
      //   let selectedValue;
      //   for (const rb of rbs) {
      //     if (rb.checked) {
      //       selectedValue = rb.value;
      //       break;
      //     }
      //   }
      //   alert(selectedValue);
      // };

  // function getAll() {
  function filterPokemon(value) {
    // value=this.value
    // var rad = document.filterOptions.filter;
    // for(var i=0; i<rad.length; i++) {
      // if(rad[i].checked) {
        // switch(rad[i].value) {
    switch(value){
    case 'type':
      console.log('type');
      showLoading();
      hideLoading();
      return pokemonList;
      
    case 'evolution':
      console.log('evolution');
      showLoading();
      hideLoading();
      return pokemonList;

    case 'number':
      console.log('number');
      showLoading();
      hideLoading();
      return pokemonList;
      
    default:
      console.log('default');
      return pokemonList
    }
  }
//     }
// }
  
  //power down
  function powerDown() {
    let powerButton = $('.header-powerbtn');
    powerButton.on('click', function() {
      if($('#overlay')[0].style.display === 'none') {
        if (window.confirm('Are you sure you want to power down?')) {
          $('#overlay')[0].style.display = 'block';
      }} else {
          $('#overlay')[0].style.display = 'none';
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
      item.base_stat = details.base_stat;
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
    hideLoading: hideLoading,
    filterPokemon: filterPokemon,
  };
  })();
  
  //loads pokemon from api then add them to the pokemonList
  pokemonRepo.loadList().then(function() {
    pokemonRepo.getAll().forEach(function (pokemon) {
      pokemonRepo.addListItem(pokemon);
    });
  });
  
  // pokemonRepo.powerDown();
  pokemonRepo.filterPokemon(this.value);
  