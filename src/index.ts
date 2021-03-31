import "reflect-metadata";
import { createConnection } from "typeorm";
import { handleCommand } from "./commandHandler";

const Discord = require("discord.js");

const discord_token = process.env.DISCORD_TOKEN;

const client = new Discord.Client();

client.on("message", async (message) => {
    handleCommand(message);
});

createConnection().then(async connection => {


    client.login(discord_token);
    client.once("ready", () => {
        console.log("Ready!");
    });
    client.once("reconnecting", () => {
        console.log("Reconnecting!");
    });
    client.once("disconnect", () => {
        console.log("Disconnect!");
    });

}).catch(error => console.log(error));
