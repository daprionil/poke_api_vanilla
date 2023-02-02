import Namespace from "../namespace.js";
import Api from "./Api.js";
import UI from "./UI.js";

export default class mediator{
    static requestMediator({type}){
        return ({
            //Set global values in NameSpace
            setMainValues: async function(){
                const data = await Api.getAllPokemons();
                
                //Set values in Namespace
                Namespace.functions.setGlobalValues(data);
            },
            displayPagination: async function(){
                //Show all buttons in box pagination element's
                UI.printAllButtonsPagination(Namespace.pages);
            },
            displayPokemons: async function({pathPrefer = '/'}){
                //Llamar a UI para generar las Cards
                //const pokemons = await Api.getPokemonsPerPage();
                const url = new URLSearchParams(pathPrefer);
                const params = [url.get('offset','limit')];
                console.log({params,pathPrefer});

                const {results} = await Api.getPagePokemons({pathPrefer});
                const map = [...Namespace.pokemons].slice();
                const pokemons = await Api.getArrPokemonsPerPage(results,map);

                //Display Cards Pokemon
                UI.printPagePokemons({pokemons});
            },
        })[type];
    };
};