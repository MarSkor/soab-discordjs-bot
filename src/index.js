const { Client, Collection, Intents } = require("discord.js");
require('dotenv').config();

const client = new Client({
    intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_VOICE_STATES
	]
});

module.exports = client;

//global variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("../config.json");

//init project
require("./Handler")(client);

client.login(process.env.SOAB_TOKEN);