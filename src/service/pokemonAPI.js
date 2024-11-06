import axios from "axios";

export const getPokemonList = async (url) => {
    try {
        const config = {
            method: "GET",
            url: url ? url : "https://pokeapi.co/api/v2/pokemon/"
        };
        const { data } = await axios(config);
        return data;
    } catch (err) {
        const { data } = (await err.response) ? err.response : "";
        return data;
    }
};

export const getPokemonDetail = async (url) => {
    try {
        const config = {
            method: "GET",
            url: url
        };
        const { data } = await axios(config);
        return data;
    } catch (err) {
        const { data } = (await err.response) ? err.response : "";
        return data;
    }
};