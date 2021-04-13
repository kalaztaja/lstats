import { Account } from "../entity/Account";


export const getAccountsByRank = async function (accounts: Account[]) {

    const fields = [];
    accounts.sort((a, b) => (a.soloq_rank_from_challenger > b.soloq_rank_from_challenger) ? 1 : ((a.soloq_rank_from_challenger < b.soloq_rank_from_challenger) ? -1 : 0))
    var placementNumber = 1;
    for (var i = 0; i < accounts.length; i++) {
        const opgg_link = "https://euw.op.gg/summoner/userName=" + encodeURI(accounts[i].summonerName);

        const winprcnt = Math.round(
            (accounts[i].soloq_wins /
                (accounts[i].soloq_wins + accounts[i].soloq_losses) +
                Number.EPSILON) * 100
        ) / 100;
        const nameField = placementNumber + ". " + accounts[i].summonerName;
        fields.push({
            name: nameField,
            value: accounts[i].soloq_tier +
                " " +
                accounts[i].soloq_lp +
                "LP (" +
                accounts[i].soloq_wins.toString() +
                "W/" +
                accounts[i].soloq_losses.toString() +
                "L " +
                winprcnt +
                "%)" + " - [OP.GG](" + opgg_link + ")"
        })
        placementNumber++;
    }
    return fields;
}