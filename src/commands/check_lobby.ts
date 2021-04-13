import { MessageEmbed } from "discord.js";
import { generateMultiquery, generateFieldsForAccounts } from "../messages/index";

export const check_lobby = async function (summonerNames: string[]) {
    const fields = await generateFieldsForAccounts(summonerNames);
    const multiqueryLink = await generateMultiquery(summonerNames);
    return null
}