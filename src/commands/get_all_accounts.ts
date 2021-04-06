import { getRepository } from "typeorm";
import { Account } from "../entity/Account";
import * as moment from 'moment'


export const get_all_accounts = async function () {
    const accounts = await getRepository(Account)
        .createQueryBuilder("account")
        .getMany();
    accounts.sort((a, b) => (a.soloq_rank_from_challenger > b.soloq_rank_from_challenger) ? 1 : ((a.soloq_rank_from_challenger < b.soloq_rank_from_challenger) ? -1 : 0))
    var returnString = "```";
    var placementNumber = 1;
    for (var i = 0; i < accounts.length; i++) {
        returnString = returnString + "\n " + placementNumber + ". Player name: " + accounts[i].summonerName + " - " + accounts[i].soloq_tier + "\n Last updated " +
            moment(parseInt(accounts[i].lastUpdated)).format("L LT");
        placementNumber++;
    }
    returnString = returnString + " ```"
    return returnString;
}