import { Message } from "discord.js";

require("dotenv").config();
const prefix = process.env.PREFIX;

import * as command from './commands'

export const handleCommand = async function (message: Message) {
    console.log("Heard a message");
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(" ");
    const commandArg = args.shift().toLowerCase();

    var responseArray = [];
    if (args.length === 1) {
        //!register summonerName
        if (commandArg === "register") {
            responseArray.push(await command.add_account(args[0], message));
        }
        //!block
        if (commandArg === "block") {
            command.add_blocklist(args[0]);
        }

        if (commandArg === "get" && args[0] === "weekreport") {
            command.get_newest_weekreport();
        }
        if (commandArg === "check") {
            if (args[0] === "accounts") {
                responseArray.push(await command.get_all_accounts());
            }
        }
    } else if (args.length === 2) {
        //!remove block/account
        if (commandArg === "remove") {
            if (args[0] === "block") {
                command.remove_blocklist(args[1]);
            } else if (args[0] === "account") {
                command.remove_account(args[1]);
            }
        }
        if (commandArg === "check" && args[0] === "user") {
            responseArray.push(await command.check_user(args[1].replace(/<|>|@|!|/g, "")));
        }
        //!check


    } else if (args.length === 0) {
        if (commandArg === "help") {
            command.help_text();
        }
    } else {
        if (commandArg === "scout") {
            command.scout_accounts(args);
        }
    }


    if (responseArray !== undefined && responseArray.length !== 0) {
        message.channel.send(responseArray.join(""));
    }
}