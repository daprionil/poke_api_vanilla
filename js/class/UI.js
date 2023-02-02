import CreateHtml from "./CreateComponents.js";
import * as sel from '../selectors.js';

export default class UI{
    //Print all buttons in the document <-- mediator
    static printAllButtonsPagination(data){
        const frag = document.createDocumentFragment();

        //Iterate all elements range
        data.forEach((range,i) => {
            const element = CreateHtml.create({
                type:'btnPage',
                body:{range,i}
            });
            frag.appendChild(element);
        });
        //Add buttons in box pagination
        sel.boxPaginator.appendChild(frag);
    };

    //Iterate in all Pokemons of Page
    static printPagePokemons({pokemons}){
        //Clear HTML list Pokemons
        this.clearHtmlListPokemon();

        //Create Document Fragment
        const frag = document.createDocumentFragment();

        //Iterate over pokemons per page
        pokemons.forEach( pokemon => {
            //Get particular response data for each Pokémon
            const {base_experience,name:pokeName,sprites:{other},stats,id,types:[typeObj]}  = pokemon;
            const sprite = other['official-artwork'].front_default;
            const {type:{name:type}} = typeObj;

            //Pure data from pokemon
            const dataPokemon = {
                base_experience,
                pokeName,
                sprite,
                stats: stats.filter(({stat:{name}}) => !name.includes('special')),
                id,
                type
            };

            const cardPokemon = CreateHtml.create({type:'cardPokemon',body: dataPokemon});
            frag.appendChild(cardPokemon);
        });

        //Adding all Card of Pokemos per Page in Document
        sel.boxListPokemon.appendChild(frag);
    };

    //Clear all Elements of Box List Pokemon in Document
    static clearHtmlListPokemon(){
        while(sel.boxListPokemon.firstElementChild){
            sel.boxListPokemon.firstElementChild.remove();
        };
    };
};