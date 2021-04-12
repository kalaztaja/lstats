import { getBlocklist } from '../controller/blockedUser';

export const check_blocklist = async function () {
    const accounts = await getBlocklist();
    console.log(accounts);
    accounts.sort((a, b) => (a.soloq_rank_from_challenger > b.soloq_rank_from_challenger) ? 1 : ((a.soloq_rank_from_challenger < b.soloq_rank_from_challenger) ? -1 : 0))
    var returnString = "```";
    var placementNumber = 1;
    for (var i = 0; i < accounts.length; i++) {
        const winprcnt = Math.round(
            (accounts[i].soloq_wins /
                (accounts[i].soloq_wins + accounts[i].soloq_losses) +
                Number.EPSILON) * 100
        ) / 100;
        returnString = returnString +
            "\n " +
            placementNumber +
            ". Player name: " +
            accounts[i].summonerName +
            " - " +
            accounts[i].soloq_tier +
            " " +
            accounts[i].soloq_lp +
            "LP (" +
            accounts[i].soloq_wins.toString() +
            "W/" +
            accounts[i].soloq_losses.toString() +
            "L " +
            winprcnt +
            "%)";
        placementNumber++;
    }
    returnString = returnString + " ```"
    return returnString;
}