import { getUserAccounts } from "../controller/account";
import { getUserById } from "../controller/user";
import { getAccountsByRank } from "../messages/index";
import { MessageEmbed, Team } from "discord.js";


export const check_user = async function (discordId: string) {
    const user = await getUserById(discordId);

    const userId = user.id;
    const accounts = await getUserAccounts(userId);

    //const teamString = 'team' in user ? ;
    const fields = await getAccountsByRank(accounts);
    const embedMessage = new MessageEmbed()
        .setColor('#3f436e')
        .setTitle(user.discordNick)
        .setDescription("<@" + discordId + "> ")
        .addFields(fields)
        .setTimestamp()
        .setFooter("Bot by Kala#1322", "https://i.ibb.co/NFqD4pK/discord.png")

    //const returnString = "Name: " + user.discordNick + " " + teamString + "\n"
    return embedMessage;
}