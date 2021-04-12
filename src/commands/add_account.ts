import { Message } from "discord.js";
import { getSummonerByName, getSoloqueStatsById } from "../api/lol";
import * as moment from 'moment'
import { LOL_RANKS } from "../constants/lol_ranks";
import { getAccountWithName, createAccount } from "../controller/account";
import { getUserById, createUser } from "../controller/user";

export const add_account = async function (summonerName: string, discordMessage: Message) {

    const responseData = await getSummonerByName(summonerName);
    if (responseData === null) return "Player wasn't found on riot API";


    const checkAccount = await getAccountWithName(responseData.name);
    if (checkAccount !== undefined) return "Player is already registered";

    const user = await getUserById(discordMessage.author.id);

    var newUser;
    if (user === undefined) {
        newUser = await createUser({
            discordId: discordMessage.author.id,
            discordNick: discordMessage.author.username
        })
    }
    const statsResponseData = await getSoloqueStatsById(responseData.id);
    if (statsResponseData === null) return "There was a problem with riot API";


    const uRank = statsResponseData.tier + " " + statsResponseData.rank;
    var uRank_from_challenger = LOL_RANKS.indexOf(uRank);
    if (uRank_from_challenger === -1) {
        uRank_from_challenger = LOL_RANKS.length + 1;
    }

    const current_time = moment().valueOf().toString();
    const wins = statsResponseData.wins === "" ? 0 : parseInt(statsResponseData.wins);
    const losses = statsResponseData.losses === "" ? 0 : parseInt(statsResponseData.losses);
    const userId = user !== undefined ? user.id : newUser.identifiers[0].id;

    await createAccount({
        userId: userId,
        summonerName: responseData.name,
        pid: responseData.id,
        soloq_lp: statsResponseData.leaguePoints,
        soloq_wins: wins,
        soloq_losses: losses,
        lastUpdated: current_time,
        soloq_rank_from_challenger: uRank_from_challenger,
        soloq_tier: uRank,
    });

    return "Account was added succesfully";
}