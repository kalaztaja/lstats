import { getConnection } from "typeorm";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export const check_user = async function (discordId: string) {
    console.log(discordId);
    const user = await getConnection()
        .createQueryBuilder()
        .select("user")
        .from(User, "user")
        .where("user.discordId = :discordId", { discordId: discordId })
        .getOne();
    console.log(user);
    const teamString = 'team' in user ? "Team: " + user.team : "";
    var accountString;

    const returnString = "Name: " + user.discordNick + " " + teamString + "\n "
    return returnString;
}