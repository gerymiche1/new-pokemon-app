import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPokemonList, getPokemonDetail } from "../service/pokemonAPI.js";

export const PokemonList = (props) => {

    const navigate = useNavigate();

    const [dataList, setDataList] = useState([]);
    const [next, setNext] = useState('');
    const [prev, setPrev] = useState('');

    const [loading, setLoading] = useState(false);

    const getDataList = async (url) => {
        setLoading(true);
        const getDataPokemonList = await getPokemonList(url);
        const arrDataPokemonList = getDataPokemonList?.results;
        const tempDataList = [];
        for (let i = 0; i < arrDataPokemonList.length; i++){
            const getDataPokemonDetail = await getPokemonDetail(arrDataPokemonList[i]?.url);
            tempDataList.push({
                id: getDataPokemonDetail?.id,
                name: getDataPokemonDetail?.name,
                image: getDataPokemonDetail?.sprites?.other?.['official-artwork']?.front_default,
                types: getDataPokemonDetail?.types
            })
        }
        setDataList(tempDataList);
        setNext(getDataPokemonList?.next);
        setPrev(getDataPokemonList?.previous);
        setLoading(false);
    }

    useEffect(() => {
        getDataList('');
    }, []);

    const openDetail = async (data) => {
        navigate('/pokemon/' + data?.id);
    }

    const pokemonTypeTemplate = (types) => {
        return (
            types.map((data) => {
                return <div key={data?.type?.name} className="bg-white/25 text-base my-1 py-1 px-3 text-center rounded-full">{data?.type?.name}</div>
            })
        );
    }

    const pokemonTemplate = () => {
        return (
            dataList.map((data) => {
                return <div key={data?.id} onClick={() => {openDetail(data)}} className={data?.types[0]?.type?.name === 'fighting' ?
                    "cursor-pointer min-h-32 w-[48%] md:w-[23%] p-3 bg-fighting rounded-xl flex flex-wrap overflow-hidden relative" : data?.types[0]?.type?.name === 'flying'?
                    "cursor-pointer min-h-32 w-[48%] md:w-[23%] p-3 bg-flying rounded-xl flex flex-wrap overflow-hidden relative" : data?.types[0]?.type?.name === 'poison'?
                    "cursor-pointer min-h-32 w-[48%] md:w-[23%] p-3 bg-poison rounded-xl flex flex-wrap overflow-hidden relative" : data?.types[0]?.type?.name === 'ground'?
                    "cursor-pointer min-h-32 w-[48%] md:w-[23%] p-3 bg-ground rounded-xl flex flex-wrap overflow-hidden relative" : data?.types[0]?.type?.name === 'rock'?
                    "cursor-pointer min-h-32 w-[48%] md:w-[23%] p-3 bg-rock rounded-xl flex flex-wrap overflow-hidden relative" : data?.types[0]?.type?.name === 'bug'?
                    "cursor-pointer min-h-32 w-[48%] md:w-[23%] p-3 bg-bug rounded-xl flex flex-wrap overflow-hidden relative" : data?.types[0]?.type?.name === 'ghost'?
                    "cursor-pointer min-h-32 w-[48%] md:w-[23%] p-3 bg-ghost rounded-xl flex flex-wrap overflow-hidden relative" : data?.types[0]?.type?.name === 'steel'?
                    "cursor-pointer min-h-32 w-[48%] md:w-[23%] p-3 bg-steel rounded-xl flex flex-wrap overflow-hidden relative" : data?.types[0]?.type?.name === 'fire'?
                    "cursor-pointer min-h-32 w-[48%] md:w-[23%] p-3 bg-fire rounded-xl flex flex-wrap overflow-hidden relative" : data?.types[0]?.type?.name === 'water'?
                    "cursor-pointer min-h-32 w-[48%] md:w-[23%] p-3 bg-water rounded-xl flex flex-wrap overflow-hidden relative" : data?.types[0]?.type?.name === 'grass'?
                    "cursor-pointer min-h-32 w-[48%] md:w-[23%] p-3 bg-grass rounded-xl flex flex-wrap overflow-hidden relative" : data?.types[0]?.type?.name === 'electric'?
                    "cursor-pointer min-h-32 w-[48%] md:w-[23%] p-3 bg-electric rounded-xl flex flex-wrap overflow-hidden relative" : data?.types[0]?.type?.name === 'psychic'?
                    "cursor-pointer min-h-32 w-[48%] md:w-[23%] p-3 bg-psychic rounded-xl flex flex-wrap overflow-hidden relative" : data?.types[0]?.type?.name === 'ice'?
                    "cursor-pointer min-h-32 w-[48%] md:w-[23%] p-3 bg-ice rounded-xl flex flex-wrap overflow-hidden relative" : data?.types[0]?.type?.name === 'dragon'?
                    "cursor-pointer min-h-32 w-[48%] md:w-[23%] p-3 bg-dragon rounded-xl flex flex-wrap overflow-hidden relative" : data?.types[0]?.type?.name === 'dark'?
                    "cursor-pointer min-h-32 w-[48%] md:w-[23%] p-3 bg-dark rounded-xl flex flex-wrap overflow-hidden relative" : data?.types[0]?.type?.name === 'fairy'?
                    "cursor-pointer min-h-32 w-[48%] md:w-[23%] p-3 bg-fairy rounded-xl flex flex-wrap overflow-hidden relative" : data?.types[0]?.type?.name === 'stellar'?
                    "cursor-pointer min-h-32 w-[48%] md:w-[23%] p-3 bg-dragon rounded-xl flex flex-wrap overflow-hidden relative" : data?.types[0]?.type?.name === 'unknown'?
                    "cursor-pointer min-h-32 w-[48%] md:w-[23%] p-3 bg-ghost rounded-xl flex flex-wrap overflow-hidden relative" : data?.types[0]?.type?.name === 'shadow'?
                    "cursor-pointer min-h-32 w-[48%] md:w-[23%] p-3 bg-ghost rounded-xl flex flex-wrap overflow-hidden relative" :
                    "cursor-pointer min-h-32 w-[48%] md:w-[23%] p-3 bg-normal rounded-xl flex flex-wrap overflow-hidden relative"
                }>
                    <div className="z-20">
                        <div className="w-full text-base font-bold">{data?.name}</div>
                        <div className="w-full">
                            {pokemonTypeTemplate(data?.types)}
                        </div>
                    </div>
                    <img alt="pokemon" src={data?.image} className="w-2/5 z-10 absolute right-1 bottom-0"></img>
                    <img alt="pokeball" src="https://www.pngall.com/wp-content/uploads/4/Pokeball-PNG-Free-Download.png" className="opacity-10 w-full z-0 absolute -right-[30%] -bottom-[20%]"></img>
                    <div className="absolute text-base top-1 right-4 text-black/30 z-20">{data?.id.toString().length < 2 ? '#00' + data?.id : data?.id.toString().length < 3 ? '#0' + data?.id : '#' + data?.id}</div>
                </div>;
            })
        );
    }

    return (
        <div className="flex justify-center">
            <div className="p-5 w-full lg:w-2/3 flex flex-wrap">
                <h1 className="text-3xl font-bold mb-10 z-10">Pokedex</h1>
                <div className="flex w-full flex-wrap justify-between gap-y-4 text-white z-10">
                    {pokemonTemplate()}
                </div>
                <div className="mt-3 w-full flex justify-between">
                    {prev ? <button className="p-2 text-base" onClick={() => {getDataList(prev)}}>Previous</button> : <div></div>}
                    {next ? <button className="p-2 text-base" onClick={() => {getDataList(next)}}>Next</button> : <div></div>}
                </div>
                <img alt="pokeball" src="https://www.pngall.com/wp-content/uploads/4/Pokeball-PNG-Free-Download.png" 
                className="opacity-10 fixed -top-20 -right-[30%] lg:-right-[10%] z-0"></img>
            </div>
            {loading ? 
            <div className='fixed bg-gray-800/80 w-full h-screen z-50'>
                <div className='flex justify-center items-center w-full h-full'>
                    <svg className="mr-3 h-28 w-28 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            </div> : <></>}
        </div>
    );
}