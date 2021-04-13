import { LOL_RANKS } from "../constants/lol_ranks";
import { getSummonerByName, getSoloqueStatsById } from "../api/lol";

export const generateFieldsForAccounts = async function (summonerNames: string[]) {
    const fields = [];

    var averageRank = 0;
    var playerCount = 0;
    for (var i = 0; i < summonerNames.length; i++) {

        const nickname = summonerNames[i];
        const summoner = await getSummonerByName(nickname);
        if (summoner === undefined || summoner === null) break;


        const stats = await getSoloqueStatsById(summoner.id);
        const formattedNick = stats.summonerName;

        const opgg_link = "https://euw.op.gg/summoner/userName=" + encodeURI(nickname);

        const wins = stats.wins === "" ? 0 : parseInt(stats.wins);
        const losses = stats.losses === "" ? 0 : parseInt(stats.losses);
        const winprcnt = Math.round(
            (wins /
                (wins + losses) +
                Number.EPSILON) * 100
        ) / 100;

        const uRank = stats.tier + " " + stats.rank;
        var uRank_from_challenger = LOL_RANKS.indexOf(uRank);
        if (uRank_from_challenger !== -1) averageRank = averageRank + uRank_from_challenger;
        playerCount++;
        console.log("Average " + averageRank);
        console.log("PlayerCount " + playerCount);
        fields.push({
            name: formattedNick,
            value: "[OP.GG](" + opgg_link + ") - " +
                uRank +
                " " +
                stats.leaguePoints +
                "LP (" +
                wins +
                "W/" +
                losses +
                "L " +
                winprcnt +
                "%)",
            inline: true
        })

    }

    const average = Math.round(averageRank / playerCount);
    const rank_text = LOL_RANKS[average];
    fields.push({ name: '\u200B', value: '\u200B' })
    fields.push({ name: 'Average rank', value: rank_text })
    return fields
}