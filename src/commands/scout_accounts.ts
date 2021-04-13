import { MessageEmbed } from "discord.js";
import { generateMultiquery, generateFieldsForAccounts } from "../messages/index";

export const scout_accounts = async function (summonerNames: string[]) {
    const fields = await generateFieldsForAccounts(summonerNames);
    const multiqueryLink = await generateMultiquery(summonerNames);
    const embedMessage = new MessageEmbed()
        .setColor('#3f436e')
        .setTitle('Multi query')
        .setURL(multiqueryLink)
        .setDescription("")
        .addFields(fields)
        .setTimestamp()
        .setFooter("Bot by Kala#1322", "https://i.ibb.co/NFqD4pK/discord.png")

    return embedMessage;
}