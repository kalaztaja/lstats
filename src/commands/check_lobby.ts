import { MessageEmbed } from "discord.js";
import { generateMultiquery, generateFieldsForAccounts, generatePorofessor } from "../messages/index";

export const check_lobby = async function (summonerNames: string[]) {
    console.log(summonerNames);
    const fields = await generateFieldsForAccounts(summonerNames);
    const multiqueryLink = await generateMultiquery(summonerNames);

    const porofessorLink = await generatePorofessor(summonerNames);
    const embedMessage = new MessageEmbed()
        .setColor('#3f436e')
        .setTitle('Multi query')
        .setURL(multiqueryLink)
        .setDescription("[OP.GG](" + multiqueryLink + ") [Porofessor](" + porofessorLink + ")")
        .addFields(fields)
        .setTimestamp()
        .setFooter("Bot by Kala#1322", "https://i.ibb.co/NFqD4pK/discord.png")

    return embedMessage;
}