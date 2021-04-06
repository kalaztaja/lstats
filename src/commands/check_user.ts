import { getConnection } from "typeorm";
import { User } from "../entity/User";

export const check_user = async function (discordNick: string) {
    const user = await getConnection()
        .createQueryBuilder()
        .select("user")
        .from(User, "user")
        .where("user.discordId = :discordId", { discordNick: discordNick })
        .getOne();


    return user;
}