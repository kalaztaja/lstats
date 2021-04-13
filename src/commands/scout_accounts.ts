import { getSummonerByName, getSoloqueStatsById } from "../api/lol";
import { MessageEmbed } from "discord.js";
import { LOL_RANKS } from "../constants/lol_ranks";

export const scout_accounts = async function (summonerNames: string[]) {
    console.log("Summoner names " + summonerNames)
    console.log(typeof summonerNames);
    var multiqueryLink = "https://euw.op.gg/multi/query=";
    var averageRank = 0;
    var playerCount = 0;

    const fields = [];
    for (var i = 0; i < summonerNames.length; i++) {

        const nickname = summonerNames[i];
        const summoner = await getSummonerByName(nickname);
        console.log(nickname + " ja tulos " + summoner)
        if (summoner === undefined || summoner === null) break;

        if (i !== 0) multiqueryLink = multiqueryLink + "%2C"
        multiqueryLink = multiqueryLink + encodeURI(nickname);

        const stats = await getSoloqueStatsById(summoner.id);
        const formattedNick = stats.summonerName;

        const opgg_link = "https://euw.op.gg/summoner/userName=" + encodeURI(nickname);
        //const opggString = "[" + formattedNick + "](" + opgg_link + ")";

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
    console.log(multiqueryLink);
    const average = Math.round(averageRank / playerCount);
    const rank_text = LOL_RANKS[average];
    if (playerCount === 0) return null;
    const embedMessage = new MessageEmbed()
        .setColor('#444444')
        .setTitle('Multi query')
        .setURL(multiqueryLink)
        .setDescription("")
        .addFields(fields)
        .addFields({ name: '\u200B', value: '\u200B' },
            { name: 'Average rank', value: rank_text })
        .setTimestamp()
        .setFooter("Bot by Kala#1322", "https://i.ibb.co/NFqD4pK/discord.png")

    return embedMessage;
}