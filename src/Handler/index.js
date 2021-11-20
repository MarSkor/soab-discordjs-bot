//handler code from https://github.com/reconlx/djs-base-handler/blob/master/handler/index.js

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
        if (file.userPermissions) file.defaultPermissions = false;
        arrayOfSlashCommands.push(file);
    });
    
    client.on("ready", async () => {
        const guild = client.guilds.cache.get(process.env.PRIMARY_GUILD_ID);
        await guild.commands.set(arrayOfSlashCommands).then((cmd) => {
            const getRoles = (commandName) => {
                const permissions = arrayOfSlashCommands.find((x) => x.name === commandName).userPermissions;

                if(!permissions) return null;
                return guild.roles.cache.filter(x => x.permissions.has(permissions) && !x.managed)
            };
            const fullPermissions = cmd.reduce((accumulator, x) => {
                const roles = getRoles(x.name);
                if(!roles) return accumulator;

                const permissions = roles.reduce((a, v) => {
                    return [
                        ...a,
                        {
                            id: v.id,
                            type: 'ROLE',
                            permission: true,
                        },
                    ];
                }, []);

                return [
                    ...accumulator,
                    {
                        id: x.id,
                        permissions,
                    },
                ];
            }, []);

            guild.commands.permissions.set({fullPermissions})
        });

        
        //a single guild
        // await client.guilds.cache
        //     .get(process.env.PRIMARY_GUILD_ID)
        //     .commands.set(arrayOfSlashCommands);

        //all the guilds the bot is in
        await client.application.commands.set(arrayOfSlashCommands);
    });

    // mongoose
    if (!process.env.MONGO_URI) return;

    mongoose.connect(process.env.MONGO_URI).then(() => console.log(chalk.blue('Connected to mongodb')));
};

