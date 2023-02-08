const baseUrlApi = 'https://pokeapi.co/api/v2/pokemon';

export default class Api{
    // ##### Base Actions or Functions #####

    //Get All Pokemons in Api Web.
    static async getAllPokemons(){
        try {
            const response = await fetch(`${baseUrlApi}/?offset=0&limit=2000`);
            return await response.json();
        } catch (err) {
            console.log(err);
        };
    };

    //Get a Pokemon in Api Web - Experimental
    static async getAPokemon({pathPrefer = null}){
        try {
            const url = `${pathPrefer ?? baseUrlApi }`;
            const response = await fetch(url);
            return await response.json();
        } catch (err) {
            console.log(err);
        }; 
    };

    //Get all Pokemons per Array Page's
    static async getArrPokemonsPerPage(results){
        //Generate a array with all url to fetch for pokemon
        const arrPokemons = (function*(){
            for(let i = 0; i < results.length; i++){
                yield fetch(results[i].url);
            };
        })();

        const allPokemonsResults = await Promise.allSettled([...arrPokemons]);

        const jsonPokemonsPromises = allPokemonsResults.reduce( (init,pokemon) => {
            if(pokemon.status !== 'fulfilled' ) return init;
            return [...init, pokemon.value.json()];
        },[]);
        
        return await Promise.all(jsonPokemonsPromises);
    }
};