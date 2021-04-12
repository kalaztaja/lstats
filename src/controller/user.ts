import { User } from "../entity/User";
import { getConnection } from "typeorm";

export const getUserById = async function (id: string) {
    return await getConnection()
        .createQueryBuilder()
        .select("user")
        .from(User, "user")
        .where("user.discordId = :discordId", { discordId: id })
        .getOne();
}

export const createUser = async function (newUser: object) {
    return await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(newUser).returning("id")
        .execute();
}