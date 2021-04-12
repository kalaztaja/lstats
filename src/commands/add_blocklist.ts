import { getUserById } from "../controller/user";
import { getSummonerByName, getSoloqueStatsById } from "../api/lol";
import { addToBlockList } from "../controller/blockedUser";
import * as moment from 'moment'
import { LOL_RANKS } from "../constants/lol_ranks";



export const add_blocklist = async function (summonerName: string, userId: string) {
    const user = await getUserById(userId);
    if (user === undefined) return null;
    const lol_account = await getSummonerByName(summonerName);
    if (lol_account === undefined) return null;
    const statsResponseData = await getSoloqueStatsById(lol_account.id);
    console.log("lol account " + JSON.stringify(lol_account));
    console.log("stats " + JSON.stringify(statsResponseData));
    const uRank = statsResponseData.tier + " " + statsResponseData.rank;
    var uRank_from_challenger = LOL_RANKS.indexOf(uRank);
    if (uRank_from_challenger === -1) {
        uRank_from_challenger = LOL_RANKS.length + 1;
    }

    const current_time = moment().valueOf().toString();
    const wins = statsResponseData.wins === "" ? 0 : parseInt(statsResponseData.wins);
    const losses = statsResponseData.losses === "" ? 0 : parseInt(statsResponseData.losses);
    await addToBlockList({
        userId: user,
        summonerName: lol_account.name,
        pid: lol_account.id,
        soloq_lp: statsResponseData.leaguePoints,
        soloq_wins: wins,
        soloq_losses: losses,
        lastUpdated: current_time,
        soloq_rank_from_challenger: uRank_from_challenger,
        soloq_tier: uRank,
    })
    return "Added to blocklist";
}