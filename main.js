let pokemonIngresado = document.getElementById("pokemonIngresado");
pokemonIngresado.addEventListener("submit",validarPokemon);

let nombrePokemon = document.getElementById("nombrePokemon");

function validarPokemon(e){
    e.preventDefault();
    console.log(nombrePokemon.value)
    
}
