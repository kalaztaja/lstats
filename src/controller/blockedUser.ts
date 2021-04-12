import { BlockedUser } from "../entity/BlockedUser";
import { getConnection, getRepository } from "typeorm";

export const addToBlockList = async function (newBlock: object) {
    const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(BlockedUser)
        .values(newBlock).returning("id")
        .execute();
    return result;
}

export const removeBlock = async function (blockId: string) {
    const result = await getConnection()
        .createQueryBuilder()
        .delete()
        .from(BlockedUser)
        .where("pid = :pid", { pid: blockId })
        .execute();

}

export const getBlockedUser = async function (summonerName: string) {
    return await getConnection()
        .createQueryBuilder()
        .select("blockeduser")
        .from(BlockedUser, "blockeduser")
        .where("LOWER(blockeduser.summonerName) = LOWER(:summonerName)", { summonerName: summonerName })
        .getOne();
}

export const getBlocklist = async function () {
    return await getRepository(BlockedUser)
        .createQueryBuilder("blockeduser")
        .getMany();
}