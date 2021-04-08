import { getConnection } from "typeorm";
import { Message } from "discord.js";
import { Account } from "../entity/Account";
import { User } from "../entity/User";
import { getSummonerByName, getSoloqueStatsById } from "../api/lol";
import * as moment from 'moment'
import { LOL_RANKS } from "../constants/lol_ranks";
import { stat } from "node:fs";

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

    const user = await getConnection()
        .createQueryBuilder()
        .select("user")
        .from(User, "user")
        .where("user.discordId = :discordId", { discordId: discordMessage.author.id })
        .getOne();
    var newUser;
    if (user === undefined) {
        newUser = await getConnection()
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
    var uRank_from_challenger = LOL_RANKS.indexOf(uRank);
    if (uRank_from_challenger === -1) {
        uRank_from_challenger = LOL_RANKS.length + 1;
    }
    const current_time = moment().valueOf().toString();

    const insertAccount = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Account)
        .values({
            user: user !== undefined ? user : newUser,
            summonerName: responseData.name,
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

    var updatedAccounts = [];
    user !== undefined ? updatedAccounts = user.accounts : null;
    updatedAccounts.push(insertAccount);
    await getConnection()
        .createQueryBuilder()
        .update(User).
        set({
            accounts: updatedAccounts,
        })
        .where("user.discordId = :discordId", { discordId: discordMessage.author.id })
        .execute();
    return "Account was added succesfully";
}