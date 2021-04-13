export const generateMultiquery = async function (summonerNames: string[]) {
    var multiqueryLink = "https://euw.op.gg/multi/query=";

    for (var i = 0; i < summonerNames.length; i++) {

        const nickname = summonerNames[i];
        if (i !== 0) multiqueryLink = multiqueryLink + "%2C"
        multiqueryLink = multiqueryLink + encodeURI(nickname);

    }
    return multiqueryLink;
}