import {boxPaginator} from '../selectors.js';

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
    static validateSearching(evt){
        evt.preventDefault();

        /**
         * Valida
         * Llama al mediator en displayPokemonSearch
         */
    };
};