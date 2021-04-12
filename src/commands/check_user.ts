import { getConnection } from "typeorm";
import { User } from "../entity/User";
import { getUserAccounts } from "../controller/account";
import { getUserById } from "../controller/user";

export const check_user = async function (discordId: string) {
    const user = await getUserById(discordId);

    const userId = user.id;
    const accounts = await getUserAccounts(userId);

    const teamString = 'team' in user ? "Team: " : "";
    accounts.sort((a, b) => (a.soloq_rank_from_challenger > b.soloq_rank_from_challenger) ? 1 : ((a.soloq_rank_from_challenger < b.soloq_rank_from_challenger) ? -1 : 0))

    var accountString = "```";
    var placementNumber = 1;

    for (var i = 0; i < accounts.length; i++) {
        const winprcnt = Math.round(
            (accounts[i].soloq_wins /
                (accounts[i].soloq_wins + accounts[i].soloq_losses) +
                Number.EPSILON) * 100
        ) / 100;
        accountString = accountString + placementNumber + ". " + accounts[i].summonerName + " " + accounts[i].soloq_tier +
            " " +
            accounts[i].soloq_lp +
            "LP (" +
            accounts[i].soloq_wins.toString() +
            "W/" +
            accounts[i].soloq_losses.toString() +
            "L " +
            winprcnt +
            "%)" + "\n";

        placementNumber++;
    }
    accountString = accountString + "```"
    const returnString = "Name: " + user.discordNick + " " + teamString + "\n" + accountString;
    return returnString;
}