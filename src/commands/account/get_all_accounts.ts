import { getAccountsByRank } from "../../messages/index";
import { getAllAccounts } from "../../controller/account";
import { MessageEmbed } from "discord.js";


export const get_all_accounts = async function () {
    const accounts = await getAllAccounts();
    if (accounts.length === 0) {
        return "No accounts registered";
    }
    const fields = await getAccountsByRank(accounts);
    const embedMessage = new MessageEmbed()
        .setColor('#3f436e')
        .setTitle('Leaderboard')
        .setDescription("")
        .addFields(fields)
        .setTimestamp()
        .setFooter("Bot by Kala#1322", "https://i.ibb.co/NFqD4pK/discord.png")
    return embedMessage;
}