const objValues  = {
    functions:{
        //Set values in the NameSpace
        setGlobalValues:function(allPokemons){
            const pokemons = allPokemons.results;

            this.setPokemosValue(pokemons);
            this.setPagesValue(pokemons);
        },

        //Set the value to the all Pakemons in Page
        setPokemosValue(pokemons){
            objValues.pokemons[Symbol.iterator] = function*(){
                for(let i = 0; i < pokemons.length; i++){
                    const pokemon = pokemons[i];
                    yield [pokemon.name,pokemon];
                };
            };

            objValues.pokemons = new Map([...objValues.pokemons].sort(() => Math.random() - 0.5));
        },
        //Set Page Range and Amount
        setPagesValue(pokemons){
            //Calcular el número de páginas
            const nPerPage = objValues.elementsPerPage;

            const lenList = pokemons.length;
            const nPages = Math.ceil(( lenList > 300 ? 300 : lenList ) / nPerPage);
            
            let arrPages = [];

            for(let i = nPages - 1; i >= 0; i--){
                const val = i*nPerPage,
                      nextVal = (val + 20) > lenList ? lenList : (val + 20);
                arrPages.unshift([val, nextVal]);
            }
            objValues.pages = arrPages;
        }
    },
    pokemons: new Map(),
    pages:[],
    elementsPerPage:20
};

export default objValues;