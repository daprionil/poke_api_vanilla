import Mediator from './Mediator.js';

export default class CreateHtml{
    static create({type,body:dataComponent}){
        const obj = {
            cardPokemon: () => new CardPokemon(dataComponent),
            btnPage: () => new BtnPaginator(dataComponent),
            modalPokemon: () => new ModalPokemon(dataComponent)
        };

        return obj[type]();
    };

    //Request Type Mediator
    requestMediator({type,pokemon}){
        Mediator.requestMediator({type})({pokemon});
    }
};

//gist
//Create a Card element for Pokemon
class CardPokemon extends CreateHtml{
    constructor(dataComponent){
        super(dataComponent);

        //Data of Card dataComponent
        const {base_experience,pokeName,sprite,stats,type} = dataComponent;

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
        ctnBtnActionDisplayPokemon.onclick = () => {
            this.clickBtnDisplayPokemonModal({type: 'displayModal', pokemon: dataComponent});
        };
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

    clickBtnDisplayPokemonModal(data){
        this.requestMediator(data);
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
            Mediator.requestMediator({type:'displayPokemons'})({range});
        }
        
        const btn = document.createElement('BUTTON');
        btn.textContent = i + 1;


        el.appendChild(btn);
        return el;
    };
};

//Crear Componente modal, , Tomar los valores desde la Card para el Modal
class ModalPokemon extends CreateHtml{
    /**
     * name
     * base_Experience
     * abilities
     * height
     * weight
     * type
     */

    constructor(data){
        super(data);
        const {abilities,base_experience,height,weight, types, pokeName, sprite, stats, type} = data;

        const cardPokemonModal = document.createElement('DIV');
        cardPokemonModal.classList.add('ctn_component_modal');

        const topCardModalPokemon = document.createElement('DIV');
        topCardModalPokemon.classList.add('top_component_modal', type);
        topCardModalPokemon.innerHTML = `
            <div class="left_top_component_modal">
                <div class="ctn_info">
                    <div class="ctn_pokename">
                        <p>${pokeName}</p>
                    </div>
                    <div class="ctn_base_experience">
                        <p>${base_experience ?? '&#8734;'}</p>
                    </div>
                </div>
            </div>
            <div class="right_top_component_modal">
                <div class="ctn_image">
                    <img src="${sprite}" alt="${pokeName}">
                </div>
            </div>`;

        const midCardModalPokemon = document.createElement('DIV');
        midCardModalPokemon.classList.add('mid_component_modal');
        midCardModalPokemon.innerHTML = `
            <div class="ctn_mid_data_pokemon">
                <div class="left_ctn_data">
                    <div class="left_data_pokemon">
                        <div class="left_data_pokemon_values">
                            <p>${weight / 10} Kg</p>
                        </div>
                        <div class="left_data_pokemon_datatype">
                            <p>Weight</p>
                        </div>
                    </div>
                </div>
                <div class="right_ctn_data">
                    <div class="right_data_pokemon">
                        <div class="right_data_pokemon_values">
                            <p>${height / 10} m</p>
                        </div>
                        <div class="right_data_pokemon_datatype">
                            <p>Height</p>
                        </div>
                    </div>
                </div>
            </div>`;

        const bottomCardModalPokemon = document.createElement('DIV');
        bottomCardModalPokemon.classList.add('bottom_component_modal');

        const bottomCardModalAbilities = document.createElement('DIV');
        bottomCardModalAbilities.classList.add('ctn_abilities_pokemon');

        const bottomCardModalAbilitiesTitle = document.createElement('DIV');
        bottomCardModalAbilitiesTitle.classList.add('title_abilities');
        bottomCardModalAbilitiesTitle.innerHTML = `<p>Abilities</p>`;

        const bottomListAbilities = document.createElement('DIV');
        bottomListAbilities.classList.add('abilities');
    
        const listAbilities = (()=>{
            const frag = document.createDocumentFragment();

            for(let i = 0; i < abilities.length; i++){
                const {ability:{name:namePoke}} = abilities[i];
                const item = document.createElement('DIV');
                item.classList.add('item_abilitie');
                item.innerHTML = `<p>${namePoke}</p>`;

                frag.appendChild(item);
            };

            return frag;
        })();

        //Adding bottom elements
        bottomListAbilities.appendChild(listAbilities);
        bottomCardModalAbilities.appendChild(bottomCardModalAbilitiesTitle);
        bottomCardModalAbilities.appendChild(bottomListAbilities);


        const ctnOtherPokemon = document.createElement('DIV');
        ctnOtherPokemon.classList.add('ctn_other_info_pokemon');

        const ctnTypes = document.createElement('DIV');
        ctnTypes.classList.add('ctn_types');
        ctnTypes.innerHTML = `
            <div class="type_title">
                <p>Types</p>
            </div>`;
        
        const ctnlistTypes = document.createElement('DIV');
        ctnlistTypes.classList.add('ctn_types_pokemon');

        const listTypes = ((() => {
            const frag = document.createDocumentFragment();
            types.forEach( ({type:{name}}) => {
                const itemType = document.createElement('P');
                itemType.textContent = name;
                
                frag.appendChild(itemType);
            });

            return frag;
        })());
        
        //Adding types elements 
        ctnlistTypes.appendChild(listTypes);
        ctnTypes.appendChild(ctnlistTypes);

        const ctnStatsPokemon = document.createElement('DIV');
        ctnStatsPokemon.classList.add('ctn_stats_info_pokemon');
        
        const ctnlistStats = document.createElement('DIV');
        ctnlistStats.classList.add('ctn_stats_pokemon');

        const listStats = ((() => {
            const frag = document.createDocumentFragment();
            stats.forEach(({base_stat,stat:{name}}) => {
                const itemStat = document.createElement('DIV');
                itemStat.classList.add('item_stat');
                itemStat.innerHTML = `
                <div class="stat_number">
                    <p>${this.typeEmojiStat(name)}</p>
                    <p>${base_stat}</p>
                </div>
                <p class="name_stat">${name}</p>`;

                frag.appendChild(itemStat);
            });
            return frag;
        })());

        ctnlistStats.appendChild(listStats);
        ctnStatsPokemon.appendChild(ctnlistStats);

        ctnOtherPokemon.appendChild(ctnTypes);
        ctnOtherPokemon.appendChild(ctnStatsPokemon);

        bottomCardModalPokemon.appendChild(bottomCardModalAbilities);
        bottomCardModalPokemon.appendChild(ctnOtherPokemon);
        /**
         * <div class="ctn_other_info_pokemon">
                <div class="ctn_types">
                    <div class="ctn_types_pokemon">
                        <p>Poison</p>
                        <p>Grass</p>
                    </div>
                </div>
                <div class="ctn_stats_info_pokemon">
                    <div class="ctn_stats_pokemon">
                        <div class="item_stat">
                            <div class="stat_number">
                                <p>💊</p>
                                <p>45</p>
                            </div>
                            <p class="name_stat">hp</p>
                        </div>
                    </div>
                </div>
            </div>
         */
        //Adding elements to main ctn
        cardPokemonModal.appendChild(topCardModalPokemon);
        cardPokemonModal.appendChild(midCardModalPokemon);
        cardPokemonModal.appendChild(bottomCardModalPokemon);

        return cardPokemonModal;
    };

    //Select emoji for type stat
    typeEmojiStat(name){
        const elements = new Map([['hp','💊'],['attack','💥'],['defense','🛡️'],['speed','💨']]);
        return elements.get(name);
    };
};