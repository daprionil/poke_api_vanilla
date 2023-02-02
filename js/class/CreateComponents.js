import Mediator from './Mediator.js';

export default class CreateHtml{
    static create({type,body}){
        const obj = {
            cardPokemon: () => new CardPokemon(body),
            btnPage: () => new BtnPaginator(body)
        };

        return obj[type]();
    }
};

//gist
//Create a Card element for Pokemon
class CardPokemon extends CreateHtml{
    constructor(body){
        super(body);

        //Data of Card Pokemon
        const {base_experience,pokeName,sprite,stats,id,type} = body;

        // Start to create Card
        const card = document.createElement('DIV');
        card.classList.add('card_pokemon');

        const ctnExperience = document.createElement('DIV');
        ctnExperience.classList.add('ctn_base_experience_card_pokemon',type);
        ctnExperience.innerHTML = `<p>${base_experience ?? '&#8734;'}</p>`;

        const topCardPokemon = document.createElement('DIV');
        topCardPokemon.classList.add('top_card_pokemon',type);
        topCardPokemon.innerHTML = `
            <div class="card_img">
                <img src="${sprite}" alt="${pokeName}">
            </div>
            <div class="info-card">
                <p>${pokeName}</p>
            </div>`;
        const bottomCardPokemon = document.createElement('DIV');
        bottomCardPokemon.classList.add('bottom_card_pokemon');

        //Left Bottom
        const ctnBottomLeftCardPokemon = document.createElement('DIV');
        ctnBottomLeftCardPokemon.classList.add('ctn_left_card_pokemon');

        //Content Stast -> |
        const ctnStatsPokemon = document.createElement('DIV');
        ctnStatsPokemon.classList.add('ctn_stats_pokemon');

        //Elements Stats
        const statsElements = CardPokemon.returnElementToStats(stats);

        //Right Bottom
        const ctnBottomRightCardPokemon = document.createElement('DIV');
        ctnBottomRightCardPokemon.classList.add('ctn_right_card_pokemon');
        
        const ctnBottomRightInfoActionsCard = document.createElement('DIV');
        ctnBottomRightInfoActionsCard.classList.add('ctn_info_actions_card');
        ctnBottomRightInfoActionsCard.innerHTML = `
            <div class="ctn_type_pokemon">
                <p><b class="title_type">Type: </b><span class="value_type">${type}</span></p>
            </div>`;

        const ctnBtnActionDisplayPokemon = document.createElement('DIV');
        ctnBtnActionDisplayPokemon.classList.add('ctn_btn_action_show_pokemon',type);
        ctnBtnActionDisplayPokemon.onclick = () => console.log({pokeName,id});
        ctnBtnActionDisplayPokemon.innerHTML = `<button class="btn_display_pokemon">Display</button>`;

        //Adding Element to Bottom
        ctnBottomRightCardPokemon.appendChild(ctnBottomRightInfoActionsCard);
            //Content Actions and Info to Pokemon
        ctnBottomRightInfoActionsCard.appendChild(ctnBtnActionDisplayPokemon);
            //Content stats elements
        ctnStatsPokemon.appendChild(statsElements);
            //content all content stats
        ctnBottomLeftCardPokemon.appendChild(ctnStatsPokemon);
            //Content elements in bottom
        bottomCardPokemon.appendChild(ctnBottomLeftCardPokemon);
        bottomCardPokemon.appendChild(ctnBottomRightCardPokemon);

        //Append Elements to Main Card Element HTML
        card.appendChild(ctnExperience);
        card.appendChild(topCardPokemon);
        card.appendChild(bottomCardPokemon);

        return card;
    };

    //Return stats elements form Card Pokemon
    static returnElementToStats(stats){
        const statEmoji = {speed:'💨',hp:'💊',attack:'💥',defense:'🛡️'};
        const frag = document.createDocumentFragment();

        stats.forEach(stat => {
            const {base_stat,stat:{name:nameStat}} = stat;

            const statElement = document.createElement('div');
            statElement.classList.add('item_stat');
            statElement.innerHTML = `<div class="stat_number">
                                        <p>${statEmoji[nameStat]}</p>
                                        <p>${base_stat}</p>
                                    </div>
                                    <p class="name_stat">${nameStat}</p>`
            frag.appendChild(statElement);
        });

        return frag;
    }
};

//Create pagination element btn
class BtnPaginator extends CreateHtml{
    constructor(body){
        super(body);
        const {range,i} = body;

        const el = document.createElement('LI');
        el.classList.add('btn_paginator');
        el.onclick = () => {
            console.log(range);
            Mediator.requestMediator({type:'displayPokemons'})({range});
        }
        
        const btn = document.createElement('BUTTON');
        btn.textContent = i + 1;


        el.appendChild(btn);
        return el;
    };
};

//Crear Componente modal, , Tomar los valores desde la Card para el Modal