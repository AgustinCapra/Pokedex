let pokemonIngresado = document.getElementById("pokemonIngresado");
pokemonIngresado.addEventListener("submit", validarPokemon);

let pokemon_nombre = document.getElementById("pokemon_nombre");
let pokemon_imagen = document.getElementById("pokemon_imagen");
let pokemon_datos =  document.getElementById("pokemon_datos")

//* API

const pokemon_api = fetch("https://pokeapi.co/api/v2/pokemon?limit=150&offset=0").then((respuesta) => respuesta.json())

function validarPokemon(e) {
    e.preventDefault();
    pokemon_imagen.innerHTML= "";
    

    pokemon_api.then((data) => {
        const pokemons = data.results;
        const busqueda = pokemons.find(el => 
            el.name === (pokemon_nombre.value).toLowerCase()
        )
        
        if (busqueda == undefined){
            console.log("no existe ese Pokemon")
            Swal.fire({
                title: 'Ey Entrenador!',
                text: 'Parece que no escribiste un Pokemon valido.',
                imageUrl: './profesorOak.png',
                imageWidth: 320,
                imageHeight: 200,
                confirmButtonText: 'Volver a intentar',
                backdrop: `rgba(0,0,123,0.4) url("./pikachu.gif") left center no-repeat`
              })
              document.getElementById("pokemon_nombre").value = '';
        }
        else{
            // console.log(busqueda.url)
            fetch (`https://pokeapi.co/api/v2/pokemon-species/${busqueda.name}/`).then((response) =>response.json()).then((datos) =>{
                let datosPokemon = document.createElement("p");
                datosPokemon.innerHTML = datos["flavor_text_entries"][0]["flavor_text"];
                pokemon_datos.appendChild(datosPokemon);

            })
            fetch(busqueda.url).then((respuesta) => respuesta.json()).then((data) =>
            {
                let imagenPokemon = document.createElement("img");
                imagenPokemon.setAttribute("src", data.sprites["front_default"]) 
                imagenPokemon.setAttribute("id", "imagenInsertada");
                imagenPokemon.setAttribute("class","fade-in-image")
                imagenPokemon.addEventListener("click", ()=>{
                    imagenPokemon.setAttribute("class","d-none");
                    let imgPkm_shiny = document.createElement("img");
                    imgPkm_shiny.setAttribute("src", data.sprites["front_shiny"])
                    pokemon_imagen.appendChild(imgPkm_shiny);
                    imgPkm_shiny.addEventListener("click",()=>{
                        imgPkm_shiny.setAttribute("class","d-none");
                        imagenPokemon.classList.remove("d-none")


                    })
                

                    


                })
                pokemon_imagen.appendChild(imagenPokemon)
                
               
                
            

            })
            document.getElementById("pokemon_nombre").value = '';
        }

    }
    )
}



