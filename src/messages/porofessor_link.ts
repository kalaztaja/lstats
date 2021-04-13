export const generatePorofessor = async function (summonerNames: string[]) {
    var baseUrl = "https://porofessor.gg/pregame/euw/";
    for (var i = 0; i < summonerNames.length; i++) {
        if (i !== 0) baseUrl = baseUrl + ",";
        baseUrl = baseUrl + encodeURI(summonerNames[i]);
    }
    return baseUrl;
}