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


    //!register summonerName
    if (commandArg === "register") {
        console.log(args);
        responseArray.push(await command.add_account(args.join(" "), message));
    }
    if (args.length === 1) {
        //!block
        if (commandArg === "block") {
            responseArray.push(await command.add_blocklist(args[0], message.author.id));
        }

        if (commandArg === "get" && args[0] === "weekreport") {
            command.get_newest_weekreport();
        }
        if (commandArg === "check") {
            //!check accounts

            if (args[0] === "accounts") {
                responseArray.push(await command.get_all_accounts());
            }
            //!check blocklist

            if (args[0] === "blocklist") {
                responseArray.push(await command.check_blocklist());
            }
        }
    } else if (args.length === 2) {
        //!remove block/account
        if (commandArg === "remove") {
            if (args[0] === "block") {
                command.remove_blocklist(args[1]);
            } else if (args[0] === "account") {
                console.log("yea")
                responseArray.push(await command.remove_account(args[1], message));
            }
        }

        //!check <userId>
        if (commandArg === "check" && args[0] === "user") {
            responseArray.push(await command.check_user(args[1].replace(/<|>|@|!|/g, "")));
        }



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
        console.log(responseArray);
        message.channel.send(responseArray.join(""));
    }
}