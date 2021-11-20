const client = require("../index");
const chalk = require('chalk');

const statusArray = [
    'Apex Legends',
    'malding in Apex Legends',
    'quitting Apex Legends',
    'uninstalling Apex Legends',
    'yeeting pc out the window'
]

client.on("ready", () => {
    console.log(chalk.yellow(`${client.user.tag}`) + ` is online!`);
    setInterval(() => {
        client.user.setPresence({ activities: [{ 
            name: statusArray[Math.floor(Math.random() * statusArray.length)] 
        }], status: 'no', type: "WATCHING" })
    }, 100000)
    
});