// EDITOR DE DOM DATOS POKEMON
const pokemonNameAndNumber = document.querySelector(" .pokemon__name");
const pokemonNumber = document.querySelector(" .pokemon__number");
const pokemonImage = document.querySelector(" .pokemon__image");
const shinyGif = document.querySelector(" .shiny__effect");
const pokemonWeight = document.querySelector(" .pokemon__weight");
const pokemonHeight = document.querySelector(" .pokemon__height");
const pokemonType = document.querySelector(" .pokemon__type");
const pokemonDesc = document.querySelector(" .pokemon__desc")
const form = document.querySelector(" .form");
const input = document.querySelector(" .input__search");

// Valor por defecto sprite
let defaultSprite = true;

// BOTONES
const buttonPrev = document.querySelector(" .btn-prev");
const buttonNext = document.querySelector(" .btn-next");
const buttonShiny = document.querySelector(" .btn-shiny");

// INICIAR POKEDEX EN POKEMON 1
let searchPokemon = 1;

// FUNCION ASINCRONA DATA POKEMON
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};
// FUNCION ASINCRONA DATA CON DESCRIPCION POKEMON
const fetchPokemonDesc = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const dataDesc = await APIResponse.json();
    return dataDesc;
  }
}

// RENDER POKEMON
const renderPokemon = async (pokemon) => {
  pokemonNameAndNumber.innerHTML = "Loading... ";
  pokemonWeight.innerHTML = " ";
  pokemonHeight.innerHTML = " ";
  pokemonType.innerHTML = " ";
  pokemonDesc.innerHTML = " ";

  const data = await fetchPokemon(pokemon);
  const dataDesc = await fetchPokemonDesc(pokemon);  
  console.log(dataDesc);

  if (data) {
    pokemonImage.style.display = "block";
    pokemonNameAndNumber.innerHTML = data.id + " - " + data.name;

    pokemonWeight.innerHTML = data.weight / 10 + " KG";
    pokemonHeight.innerHTML = data.height / 10 + " meters";
    pokemonType.innerHTML = "Type: " + " " + data.types[0].type.name;  
    const descInEnglish = dataDesc.flavor_text_entries.find(entry => entry.language.name === "en");
    pokemonDesc.innerHTML = descInEnglish ? descInEnglish.flavor_text : "No description available";

    input.value = "";
    searchPokemon = data.id;
    // Sprite por defecto
    pokemonImage.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"] || data["sprites"]["front_default"];

    // Funcion boton shiny
    function toggleSprite() {
  
      if (defaultSprite) {
        pokemonImage.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_shiny"];
        defaultSprite = false;
        shinyGif.style.display = "initial"; 
        setTimeout(() => {
          shinyGif.style.display = "none"; 
      }, 1000);
        let shinySound = new Audio('sounds/shiny.mp3');
        shinySound.play();
        
      } else {
        pokemonImage.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"] || data["sprites"]["front_default"];
        defaultSprite = true; 
        shinyGif.style.display = "none";
      }
    }

    buttonShiny.onclick = toggleSprite;
    
    // SONIDOS DEL POKEMON
    const cries = new Audio(data.cries?.latest || data.cries?.legacy || "");
    cries.play();


  } else {
    pokemonImage.style.display = "none";
    pokemonNameAndNumber.innerHTML = "Not found!";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  if (searchPokemon < 1025) {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
  }
});

renderPokemon(searchPokemon);