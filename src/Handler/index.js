const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const mongoose = require("mongoose");
const globPromise = promisify(glob);
const chalk = require('chalk');


/**
 * @param {Client} client
 */

module.exports = async (client) => {
    // Commands
    const commandFiles = await globPromise(`${process.cwd()}/src/Commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/")
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });

    //events
    const eventFiles = await globPromise(`${process.cwd()}/src/Events/*.js`);
    eventFiles.map((value) => require(value));

    //slash commands
    const slashCommands = await globPromise(
        `${process.cwd()}/src/SlashCommands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        // Register for a single guild
        await client.guilds.cache
            .get("910275943224991824")
            .commands.set(arrayOfSlashCommands);

        // Register for all the guilds the bot is in
        await client.application.commands.set(arrayOfSlashCommands);
    });

    // mongoose
    if (!process.env.MONGO_URI) return;

    mongoose.connect(process.env.MONGO_URI).then(() => console.log(chalk.blue('Connected to mongodb')));
}