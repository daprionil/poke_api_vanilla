import * as sel from '../selectors.js';
import { EventFunctions } from './EventFunctions.js';
import Mediator from './Mediator.js';

new class App{
    constructor(){
        this.initApp();
    };
    async initApp(){
        //Start implements
        await Mediator.requestMediator({type:'setMainValues'})();
        await Mediator.requestMediator({type:'displayPagination'})();
        await Mediator.requestMediator({type:'displayPokemons'})();

        //Form document
        sel.formSearching.addEventListener('submit', EventFunctions.validateSearching);

        //Add Events to Elements in document HTML
        sel.btnNextPaginator.addEventListener('click', EventFunctions.changeScrollPaginator);
        sel.btnPreviousPaginator.addEventListener('click', EventFunctions.changeScrollPaginator);
    };
};