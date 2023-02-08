import {boxPaginator,pokemonModal} from '../selectors.js';
import Namespace from '../namespace.js';
import Mediator from './Mediator.js';

export class EventFunctions{
    //Generate Interaction to pagination buttons
    static changeScrollPaginator(evt){
        const $ = evt.target;
        
        if($.classList.contains('previous_page')){
            boxPaginator.scrollLeft -= 120;
        }

        if($.classList.contains('next_page')){
            boxPaginator.scrollLeft += 120;
        }
    };

    //Generate Interaction to searching form
    static async validateSearching(evt){
        evt.preventDefault();

        //Is String input not is  valid
        const inputText = evt.target.querySelector('#searchingInput');
        
        //Validate if the content text is diferent to " "
        if(!inputText.value){
            if(inputText.style.border !== "") return;
            Mediator.requestMediator({type:'styleInputForm'})({el:inputText});
            return;
        };
        
        //Validate if pokemon name matches any pokemon in List Pokemons
        const pokemon = Namespace.pokemons.get(inputText.value);
        if(!pokemon){
            //Validate to Paint border input text
            if(inputText.style.border !== "") return;
            //Style to Input
            Mediator.requestMediator({type:'styleInputForm'})({el:inputText});
            return;
        };
        //Continue...

        //Style to Input
        if(inputText.style.border !== ""){
            Mediator.requestMediator({type:'styleInputForm'})({el:inputText});
        };
        
        //#### Print Modal

        //Get pokemon in Api
        const pokemonAPI = await Mediator.requestMediator({type:'takeAPokemonApi'})({url:pokemon.url});
        //Format DATA from API Pokemon
        const pokemonFormatData = Namespace.functions.getFormatDataPokemon({pokemon:pokemonAPI});

        //Display Component Pokemon in Modal Box
        Mediator.requestMediator({type:'displayModal'})({pokemon:pokemonFormatData});
    };
    
    //Event Toggle modal
    static toggleModal(){
        pokemonModal.classList.toggle('display');
    };
};