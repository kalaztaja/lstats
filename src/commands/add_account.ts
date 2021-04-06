import { getConnection } from "typeorm";
import { Message } from "discord.js";
import { Account } from "../entity/Account";
import { User } from "../entity/User";
import { getSummonerByName, getSoloqueStatsById } from "../api/lol";
import * as moment from 'moment'
import { LOL_RANKS } from "../constants/lol_ranks";

export const add_account = async function (summonerName: string, discordMessage: Message) {
    const checkAccount = await getConnection()
        .createQueryBuilder()
        .select("account")
        .from(Account, "account")
        .where("account.summonerName = :summonerName", { summonerName: summonerName })
        .getOne();

    const responseData = await getSummonerByName(summonerName);
    if (checkAccount !== undefined || responseData === null) {
        return "Player wasn't found or was already registered";
    }

    const checkUser = await getConnection()
        .createQueryBuilder()
        .select("user")
        .from(User, "user")
        .where("user.discordId = :discordId", { discordId: discordMessage.author.id })
        .getOne();

    if (checkUser !== undefined) {
        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({
                discordId: discordMessage.author.id,
                discordNick: discordMessage.author.username,
            })
            .execute();
    }

    const statsResponseData = await getSoloqueStatsById(responseData.id);
    if (statsResponseData === null) {
        return "There was a problem with riot API";
    }

    const uRank = statsResponseData.tier + " " + statsResponseData.rank;
    const uRank_from_challenger = LOL_RANKS.indexOf(uRank);
    const current_time = moment().valueOf().toString();

    const insertAccount = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Account)
        .values({
            summonerName: summonerName,
            pid: responseData.id,
            soloq_lp: statsResponseData.leaguePoints,
            soloq_wins: statsResponseData.wins,
            soloq_losses: statsResponseData.losses,
            lastUpdated: current_time,
            soloq_rank_from_challenger: uRank_from_challenger,
            soloq_tier: uRank,


        })
        .execute();
    console.log("Add account " + insertAccount);
    return "Account was added succesfully";
}