const pokemon_name = document.querySelector(".pokemon_name");
const pokemon_number = document.querySelector(".pokemon_number");
const pokemon_img = document.querySelector(".pokemon_img");

const form  = document.querySelector(".form");
const input = document.querySelector(".input_search");

const prevBt  = document.querySelector(".btn-prev");
const nextBt = document.querySelector(".btn-next");
const enterBt = document.querySelector(".btn-enter");

let searchPKM = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status == 200){
    const data = await APIResponse.json();
    return data;
    }
}

const renderPokemon = async (pokemon) =>{

    pokemon_name.innerHTML = "Loading ...";
    pokemon_number.innerHTML = "";

    const data = await fetchPokemon(pokemon);

    if(data){
        pokemon_name.innerHTML = data.name;
        pokemon_number.innerHTML = data.id + " – ";
        pokemon_img.src = data['sprites']['versions']['generation-v']['black-white']['animated']["front_shiny"];
        input.value = "";
        searchPKM = data.id;
    }else{
        pokemon.style.display = "none"
        pokemon_name.innerHTML = "Not Found ";
        pokemon_number.innerHTML = "";
    }
}


form.addEventListener("submit",(event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

enterBt.addEventListener("click",() => {
    renderPokemon(input.value.toLowerCase());
});

prevBt.addEventListener("click",() => {
    if(searchPKM > 1){
    searchPKM -=1
    renderPokemon(searchPKM );
    }
});

nextBt.addEventListener("click",() => {
    
    searchPKM +=1
    renderPokemon(searchPKM );
});

renderPokemon(searchPKM);