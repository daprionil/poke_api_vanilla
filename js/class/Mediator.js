import Namespace from "../namespace.js";
import Api from "./Api.js";
import CreateHtml from "./CreateComponents.js";
import UI from "./UI.js";

export default class mediator{
    static requestMediator({type}){
        return ({
            //Set global values in NameSpace
            setMainValues: async function(){
                const pokemons = await Api.getAllPokemons();
                
                //Set values in Namespace
                Namespace.functions.setGlobalValues(pokemons);
            },
            displayPagination: async function(){
                //Show all buttons in box pagination element's
                UI.printAllButtonsPagination(Namespace.pages);
            },
            displayPokemons: async function({range = [0,20]}){
                //Llamar a UI para generar las Cards
                const [start, end] = range;
                //Get range pokemons in Namaspace.pokemons
                const mapResults = [...Namespace.pokemons].map(([,pokemon]) => pokemon);
                const pokemonsMap = mapResults.slice(start,end);
                
                const pokemons = await Api.getArrPokemonsPerPage(pokemonsMap);
                //Display Cards Pokemon
                UI.printPagePokemons({pokemons});
            },
            //Create Components, Comunicate UI with CreateHTML
            createComponent({dataComponent}){
                const {body,type} = dataComponent;
                return CreateHtml.create({body,type});
            },
            //Crear método para Mostrar modal y sus contenido
            displayModal({pokemon}){
                //Validar cuando no hay información para Mostar
                const modalCardPokemon = CreateHtml.create({type:'modalPokemon',body:pokemon});
                UI.displayPokemonModal(modalCardPokemon);
            }
        })[type];
    };
};