import Namespace from "../namespace.js";
import Api from "./Api.js";

export default class mediator{
    static requestMediator({type}){
        return ({
            displayPagination: async function(){
                //Llamar a UI
            },
            displayPokemons: async function(){
                //Llamar a UI para generar las Cards
                //const pokemons = await Api.getPokemonsPerPage();
                console.log('Values main2');
            },
            setMainValues: async function(){
                const data = await Api.getAllPokemons();
                
                //Set values in Namespace
                Namespace.functions.setGlobalValues(data);
                console.log('Values main3');
            }
        })[type];
    };
};