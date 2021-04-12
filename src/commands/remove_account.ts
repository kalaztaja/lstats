import { Message } from "discord.js";
import { getConnection } from "typeorm";
import { User } from "../entity/User";
import { Account } from "../entity/Account";
import { getUserById } from "../controller/user";
import { getAccountWithName, removeAccountById } from "../controller/account"

export const remove_account = async function (summonerName: string, discordMessage: Message) {
    const user = await getUserById(discordMessage.author.id);

    if (user === undefined) return null;
    const account = await getAccountWithName(summonerName);

    if (account === undefined) return "Account not found";
    if (user.id !== account.userId) return "Not your account";

    await removeAccountById(account.id);
    return "Account removed";
}