import Mediator from './Mediator.js';
import * as sel from '../selectors.js';

export default class UI{
    //Print all buttons in the document <-- mediator
    static printAllButtonsPagination(pages){
        const frag = document.createDocumentFragment();

        //Iterate all elements range
        pages.forEach((range,i) => {
            const dataComponent = {type:'btnPage',body:{range,i}};
            const element = Mediator.requestMediator({type:'createComponent'})({dataComponent});
            frag.appendChild(element);
        });
        //Add buttons in box pagination
        sel.boxPaginator.appendChild(frag);
    };

    //Iterate in all Pokemons of Page
    static printPagePokemons({pokemons}){
        //Clear HTML list Pokemons
        this.clearHtml(sel.boxListPokemon);

        //Create Document Fragment
        const frag = document.createDocumentFragment();

        //Iterate over pokemons per page
        pokemons.forEach( pokemon => {
            //Get particular response data for each Pokémon
            const {base_experience,name:pokeName,sprites:{other},stats,id,types:[typeObj]}  = pokemon;
            const sprite = other['official-artwork'].front_default;
            const {type:{name:type}} = typeObj;

            //Pure data from pokemon
            const dataPokemon = {...pokemon,
                ...{
                    base_experience,
                    pokeName,
                    sprite,
                    stats: stats.filter(({stat:{name}}) => !name.includes('special')),
                    id,
                    type
                }
            };

            const dataComponent = {type:'cardPokemon',body: dataPokemon};
            const cardPokemon = Mediator.requestMediator({type:'createComponent'})({dataComponent});
            frag.appendChild(cardPokemon);
        });

        //Adding all Card of Pokemos per Page in Document
        sel.boxListPokemon.appendChild(frag);
    };

    //Clear all Elements of Box List Pokemon in Document
    static clearHtml(el){
        while(el.firstElementChild){
            el.firstElementChild.remove();
        };
    };

    //Display Component Pokemon All Info in Modal
    static displayPokemonModal(pokemonBox){
        //Adding Component HTML in the Document Modal
        this.clearHtml(sel.modalBox);
        sel.modalBox.appendChild(pokemonBox);
        sel.pokemonModal.classList.toggle('display');
    };
};