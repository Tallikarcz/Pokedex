// EDITOR DE DOM DATOS POKEMON
const pokemonNameAndNumber = document.querySelector(' .pokemon__name');
const pokemonNumber = document.querySelector(' .pokemon__number');
const pokemonImage = document.querySelector(' .pokemon__image');
const pokemonWeight = document.querySelector(' .pokemon__weight');
const pokemonHeight = document.querySelector(' .pokemon__height');
const pokemonType = document.querySelector(' .pokemon__type');

const form = document.querySelector(' .form');
const input = document.querySelector(' .input__search');

// BOTONES
const buttonPrev = document.querySelector(' .btn-prev');
const buttonNext = document.querySelector(' .btn-next');

// INICIAR POKEDEX EN POKEMON 1
let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonNameAndNumber.innerHTML = 'Loading... ';
    pokemonWeight.innerHTML = ' ';
    pokemonHeight.innerHTML = ' ';
    pokemonType.innerHTML = ' ';

    const data = await fetchPokemon(pokemon)
    console.log(data);
    
    if (data) {
        pokemonImage.style.display = 'block';
        pokemonNameAndNumber.innerHTML = data.id + " - " + data.name;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonWeight.innerHTML = (data.weight)/10 + " KG";
        pokemonHeight.innerHTML = (data.height)/10 + " meters";
        pokemonType.innerHTML = "Type: " + " " + data.types[0].type.name;
        input.value = '';
        searchPokemon = data.id;
        const cries = new Audio(data.cries?.latest || data.cries?.legacy || '');
        cries.play();
    } else {
        pokemonImage.style.display = 'none';
        pokemonNameAndNumber.innerHTML = 'Not found!';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
});

buttonPrev.addEventListener('click', () => {

    if (searchPokemon > 1) {
        searchPokemon-=1;
        renderPokemon(searchPokemon)
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon+=1;
    renderPokemon(searchPokemon)
});

renderPokemon(searchPokemon);