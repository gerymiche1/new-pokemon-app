import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPokemonDetail } from "../service/pokemonAPI.js";

export const PokemonDetail = (props) => {

    const { idPokemon } = useParams();

    const [dataPokemon, setDataPokemon] = useState({});
    const [menuFlag, setMenuFlag] = useState('about');

    const [loading, setLoading] = useState(true);

    const getDataDetail = async () => {
        setLoading(true);
        const getDataPokemonDetail = await getPokemonDetail(`https://pokeapi.co/api/v2/pokemon/${idPokemon}/`);
        setDataPokemon(getDataPokemonDetail);
        setLoading(false);
    }

    useEffect(() => {
        getDataDetail();
    }, []);

    const pokemonTypeTemplate = (types) => {
        return (
            types.map((data) => {
                return <div key={data?.type?.name} className="bg-white/25 text-base text-white my-1 py-1 px-3 text-center rounded-full">{data?.type?.name}</div>
            })
        );
    }

    const movesTemplate = (moves) => {
        return (
            moves.map((data) => {
                return <div key={data?.move?.name} className="bg-black/15 text-base text-black py-1 px-3 text-center rounded-full">{data?.move?.name}</div>
            })
        );
    }

    const abilitiesTemplate = (abilities) => {
        let abilitiesList;
        for (let i = 0; i < abilities.length; i++){
            if (i === 0){
                abilitiesList = abilities[i]?.ability?.name;
            } else {
                abilitiesList = abilitiesList + ', ' + abilities[i]?.ability?.name;
            }
        }
        return abilitiesList;
    }

    return (loading ? 
        <div className='fixed bg-gray-800/80 w-full h-screen z-50'>
            <div className='flex justify-center items-center w-full h-full'>
                <svg className="mr-3 h-28 w-28 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        </div> :
        <div className={dataPokemon?.types[0]?.type?.name === 'fighting' ?
            "flex justify-center h-screen bg-fighting" : dataPokemon?.types[0]?.type?.name === 'flying'?
            "flex justify-center h-screen bg-flying" : dataPokemon?.types[0]?.type?.name === 'poison'?
            "flex justify-center h-screen bg-poison" : dataPokemon?.types[0]?.type?.name === 'ground'?
            "flex justify-center h-screen bg-ground" : dataPokemon?.types[0]?.type?.name === 'rock'?
            "flex justify-center h-screen bg-rock" : dataPokemon?.types[0]?.type?.name === 'bug'?
            "flex justify-center h-screen bg-bug" : dataPokemon?.types[0]?.type?.name === 'ghost'?
            "flex justify-center h-screen bg-ghost" : dataPokemon?.types[0]?.type?.name === 'steel'?
            "flex justify-center h-screen bg-steel" : dataPokemon?.types[0]?.type?.name === 'fire'?
            "flex justify-center h-screen bg-fire" : dataPokemon?.types[0]?.type?.name === 'water'?
            "flex justify-center h-screen bg-water" : dataPokemon?.types[0]?.type?.name === 'grass'?
            "flex justify-center h-screen bg-grass" : dataPokemon?.types[0]?.type?.name === 'electric'?
            "flex justify-center h-screen bg-electric" : dataPokemon?.types[0]?.type?.name === 'psychic'?
            "flex justify-center h-screen bg-psychic" : dataPokemon?.types[0]?.type?.name === 'ice'?
            "flex justify-center h-screen bg-ice" : dataPokemon?.types[0]?.type?.name === 'dragon'?
            "flex justify-center h-screen bg-dragon" : dataPokemon?.types[0]?.type?.name === 'dark'?
            "flex justify-center h-screen bg-dark" : dataPokemon?.types[0]?.type?.name === 'fairy'?
            "flex justify-center h-screen bg-fairy" : dataPokemon?.types[0]?.type?.name === 'stellar'?
            "flex justify-center h-screen bg-dragon" : dataPokemon?.types[0]?.type?.name === 'unknown'?
            "flex justify-center h-screen bg-ghost" : dataPokemon?.types[0]?.type?.name === 'shadow'?
            "flex justify-center h-screen bg-ghost" :
            "flex justify-center h-screen bg-normal"
        }>
            <div className="w-full lg:w-2/3 flex flex-wrap relative">
                <div className="w-full h-1/2 p-5 z-30">
                    <h1 className="text-3xl mb-2 font-bold text-white">{dataPokemon?.name}</h1>
                    <div className="flex gap-2">{pokemonTypeTemplate(dataPokemon?.types)}</div>
                    <div className="text-xl font-bold text-white/60 absolute top-10 right-5">{dataPokemon?.id.toString().length < 2 ? '#00' + dataPokemon?.id : dataPokemon?.id.toString().length < 3 ? '#0' + dataPokemon?.id : '#' + dataPokemon?.id}</div>
                </div>
                <div className="w-full h-1/2 z-30 flex flex-wrap relative">
                    <div className="w-full h-[15%] bg-white rounded-t-3xl z-10"></div>
                    <div className="w-full min-h-[85%] bg-white z-30">
                        <div className='w-full flex justify-around'>
                            <button onClick={() => {setMenuFlag('about')}} className={menuFlag === 'about' || !menuFlag ? "text-lg font-bold text-black p-2 border-b-2 border-black" : "text-lg font-bold text-black/35 p-2 border-b-2 border-black/35"}>About</button>
                            <button onClick={() => {setMenuFlag('stats')}} className={menuFlag === 'stats' ? "text-lg font-bold text-black p-2 border-b-2 border-black" : "text-lg font-bold text-black/35 p-2 border-b-2 border-black/35"}>Base Stats</button>
                            <button onClick={() => {setMenuFlag('moves')}} className={menuFlag === 'moves' ? "text-lg font-bold text-black p-2 border-b-2 border-black" : "text-lg font-bold text-black/35 p-2 border-b-2 border-black/35"}>Moves</button>
                        </div>
                        <div className="p-5">
                            {menuFlag === 'stats' ?
                                <div>
                                    <div className='text-left text-base grid grid-cols-10 grid-rows-none items-center w-full'>
                                        <div className='col-span-3 py-1 md:py-2 text-black/50'>HP</div>
                                        <div className='col-span-2 py-1 md:py-2 text-black'>{dataPokemon?.stats[0]?.base_stat}</div>
                                        <div className='col-span-5 py-1 md:py-2 text-black'>
                                            <div className='bg-slate-400 h-2 rounded-full overflow-hidden'>
                                                <div className={dataPokemon?.stats[0]?.base_stat >= 50 ?
                                                    'bg-green-500 flex justify-center items-center h-full' :
                                                    'bg-red-500 flex justify-center items-center h-full'
                                                } style={{width: dataPokemon?.stats[0]?.base_stat + '%'}}></div>
                                            </div>
                                        </div>
                                        <div className='col-span-3 py-1 md:py-2 text-black/50'>Attack</div>
                                        <div className='col-span-2 py-1 md:py-2 text-black'>{dataPokemon?.stats[1]?.base_stat}</div>
                                        <div className='col-span-5 py-1 md:py-2 text-black'>
                                            <div className='bg-slate-400 h-2 rounded-full overflow-hidden'>
                                                <div className={dataPokemon?.stats[1]?.base_stat >= 50 ?
                                                    'bg-green-500 flex justify-center items-center h-full' :
                                                    'bg-red-500 flex justify-center items-center h-full'
                                                } style={{width: dataPokemon?.stats[1]?.base_stat + '%'}}></div>
                                            </div>
                                        </div>
                                        <div className='col-span-3 py-1 md:py-2 text-black/50'>Defense</div>
                                        <div className='col-span-2 py-1 md:py-2 text-black'>{dataPokemon?.stats[2]?.base_stat}</div>
                                        <div className='col-span-5 py-1 md:py-2 text-black'>
                                            <div className='bg-slate-400 h-2 rounded-full overflow-hidden'>
                                                <div className={dataPokemon?.stats[2]?.base_stat >= 50 ?
                                                    'bg-green-500 flex justify-center items-center h-full' :
                                                    'bg-red-500 flex justify-center items-center h-full'
                                                } style={{width: dataPokemon?.stats[2]?.base_stat + '%'}}></div>
                                            </div>
                                        </div>
                                        <div className='col-span-3 py-1 md:py-2 text-black/50'>Sp. Atk</div>
                                        <div className='col-span-2 py-1 md:py-2 text-black'>{dataPokemon?.stats[3]?.base_stat}</div>
                                        <div className='col-span-5 py-1 md:py-2 text-black'>
                                            <div className='bg-slate-400 h-2 rounded-full overflow-hidden'>
                                                <div className={dataPokemon?.stats[3]?.base_stat >= 50 ?
                                                    'bg-green-500 flex justify-center items-center h-full' :
                                                    'bg-red-500 flex justify-center items-center h-full'
                                                } style={{width: dataPokemon?.stats[3]?.base_stat + '%'}}></div>
                                            </div>
                                        </div>
                                        <div className='col-span-3 py-1 md:py-2 text-black/50'>Sp. Def</div>
                                        <div className='col-span-2 py-1 md:py-2 text-black'>{dataPokemon?.stats[4]?.base_stat}</div>
                                        <div className='col-span-5 py-1 md:py-2 text-black'>
                                            <div className='bg-slate-400 h-2 rounded-full overflow-hidden'>
                                                <div className={dataPokemon?.stats[4]?.base_stat >= 50 ?
                                                    'bg-green-500 flex justify-center items-center h-full' :
                                                    'bg-red-500 flex justify-center items-center h-full'
                                                } style={{width: dataPokemon?.stats[4]?.base_stat + '%'}}></div>
                                            </div>
                                        </div>
                                        <div className='col-span-3 py-1 md:py-2 text-black/50'>Speed</div>
                                        <div className='col-span-2 py-1 md:py-2 text-black'>{dataPokemon?.stats[5]?.base_stat}</div>
                                        <div className='col-span-5 py-1 md:py-2 text-black'>
                                            <div className='bg-slate-400 h-2 rounded-full overflow-hidden'>
                                                <div className={dataPokemon?.stats[5]?.base_stat >= 50 ?
                                                    'bg-green-500 flex justify-center items-center h-full' :
                                                    'bg-red-500 flex justify-center items-center h-full'
                                                } style={{width: dataPokemon?.stats[5]?.base_stat + '%'}}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div> : menuFlag === 'moves' ?
                                <div className="flex flex-wrap justify-center gap-2">
                                    {movesTemplate(dataPokemon?.moves)}
                                </div> :
                                <div>
                                    <div className='text-left text-base grid grid-cols-10 grid-rows-none items-center w-full'>
                                        <div className='col-span-3 py-1 md:py-2 text-black/50'>Base Exp</div>
                                        <div className='col-span-7 py-1 md:py-2 text-black'>{dataPokemon?.base_experience} exp</div>
                                        <div className='col-span-3 py-1 md:py-2 text-black/50'>Height</div>
                                        <div className='col-span-7 py-1 md:py-2 text-black'>{dataPokemon?.height / 10} cm</div>
                                        <div className='col-span-3 py-1 md:py-2 text-black/50'>Weight</div>
                                        <div className='col-span-7 py-1 md:py-2 text-black'>{dataPokemon?.weight / 10} kg</div>
                                        <div className='col-span-3 py-1 md:py-2 text-black/50'>Abilities</div>
                                        <div className='col-span-7 py-1 md:py-2 text-black'>{abilitiesTemplate(dataPokemon?.abilities)}</div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="absolute z-20 w-full h-full flex justify-center items-start">
                        <img alt="pokemon" src={dataPokemon?.sprites?.other?.['official-artwork']?.front_default} className="w-60 md:w-80 -mt-48 md:-mt-64"></img>
                    </div>
                </div>
                <img alt="pokeball" src="https://www.pngall.com/wp-content/uploads/4/Pokeball-PNG-Free-Download.png" 
                className="opacity-10 fixed top-[25%] md:top-[10%] -right-[30%] lg:-right-[15%] z-0"></img>
            </div>
        </div>
    );
}