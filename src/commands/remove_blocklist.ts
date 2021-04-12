import { removeBlock, getBlockedUser } from "../controller/blockedUser";

export const remove_blocklist = async function (summonerName: string) {
    console.log("remove blocklist");
    const blockedUser = await getBlockedUser(summonerName);
    if (blockedUser === undefined) return "Blocked user not found";
    await removeBlock(blockedUser.pid);

    return "Block removed";
}