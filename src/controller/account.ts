import { getConnection } from "typeorm";
import { Account } from "../entity/Account";

export const getAccountWithName = async function (summonerName: string) {
    return await getConnection()
        .createQueryBuilder()
        .select("account")
        .from(Account, "account")
        .where("LOWER(account.summonerName) = LOWER(:summonerName)", { summonerName: summonerName })
        .getOne();
}

export const createAccount = async function (newAccount: object) {
    return await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Account)
        .values(newAccount)
        .execute();
}

export const getUserAccounts = async function (userId: number) {
    return await getConnection()
        .createQueryBuilder()
        .select("account")
        .from(Account, "account")
        .where("account.userId = :userId", { userId: userId })
        .getMany();
}

export const removeAccountById = async function (accountId: number) {
    await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Account)
        .where("id = :id", { id: accountId })
        .execute();
}