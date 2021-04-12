import axios from 'axios';

require("dotenv").config();
const lol_token = process.env.LOL_TOKEN;

export const getSummonerByName = async function (summonerName: string) {
    try {
        const response = await axios.get(
            "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
            summonerName +
            "?api_key=" +
            lol_token
        );
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }

}

export const getSoloqueStatsById = async function (id: string) {
    return await getRankedStatsById(id, true);
}
export const getFlexqueStatsById = async function (id: string) {
    return await getRankedStatsById(id, false);
}

async function getRankedStatsById(id: string, soloq: boolean) {
    try {
        const que_type = soloq ? "RANKED_SOLO_5x5" : "RANKED_FLEX_SR";
        const detailResponse = await axios.get(
            "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/" +
            id +
            "?api_key=" +
            lol_token
        );
        console.log("https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/" +
            id +
            "?api_key=" +
            lol_token);
        var rankedStats = {
            leaguePoints: "",
            wins: "",
            losses: "",
            tier: "",
            rank: "",
        };
        for (var i = 0; i < detailResponse.data.length; i++) {
            var testValues = detailResponse.data[i];
            if (testValues.queueType === que_type) {
                rankedStats.leaguePoints = testValues.leaguePoints;
                rankedStats.wins = testValues.wins;
                rankedStats.losses = testValues.losses;
                rankedStats.tier = testValues.tier;
                rankedStats.rank = testValues.rank;
            }
        }
        const returnValue = Object.keys(rankedStats).length !== 0 ? rankedStats : null;
        return returnValue;
    } catch (error) {
        console.log(error);
        return null;
    }

}

export const checkStatus = async function (id: string) {
    try {
        const response = await axios.get("https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/" + id + "?api_key=" +
            lol_token);
        if (response.status !== 404) {
            return response;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}