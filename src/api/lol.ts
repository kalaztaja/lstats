import axios from 'axios';

require("dotenv").config();
const lol_token = process.env.LOL_TOKEN;

async function getSummonerByName(summonerName: string) {
    console.log("Tried to scout " + summonerName);
    const response = await axios.get(
        "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
        summonerName +
        "?api_key=" +
        lol_token
    );
    return response.data;
}

async function getSoloqueStatsById(id: string) {
    return getRankedStatsById(id, true);
}
async function getFlexqueStatsById(id: string) {
    return getRankedStatsById(id, false);
}

async function getRankedStatsById(id: string, soloq: boolean) {
    const que_type = soloq ? "RANKED_SOLO_5x5" : "RANKED_FLEX_SR";
    const detailResponse = await axios.get(
        "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/" +
        id +
        "?api_key=" +
        lol_token
    );
    var rankedStats = {};
    for (var i = 0; i < detailResponse.data.length; i++) {
        var testValues = detailResponse.data[i];
        if (testValues.queueType === que_type) {
            rankedStats = testValues;
        }
    }
    const returnValue = Object.keys(rankedStats).length !== 0 ? rankedStats : null;
    return returnValue;
}

module.exports.getSoloqueStatsById = getSoloqueStatsById;
module.exports.getFlexqueStatsById = getFlexqueStatsById;
module.exports.getSummonerByName = getSummonerByName;
