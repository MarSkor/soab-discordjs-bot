const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { getCountDown , timeFormatTwentyFourPlusTwo, timeFormatTwentyFour, timeFormatLuxonAmPm} = require("../../Helpers/adapters");
const chalk = require('chalk');
const { getBrPubs } = require("../../Helpers/getApi");

module.exports = {
    ...new SlashCommandBuilder()
        .setName("alpubs")
        .setDescription("Info about Apex Legends Pubs"),

     /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */

    run: async(client , interaction, args) => {

        try{
            const data = await getBrPubs();
            
            //the embed message
            const embed = new MessageEmbed()
            .setTitle('Battle Royale | Pubs')
            .setColor('#d90429')
            .addFields(
                {name: "Current Map", value: "```fix\n\n" + data.current.map + "```", inline: true},
                {name: "Time Left",  value: "```xl\n\n" + getCountDown(data.current.remainingTimer) + "```", inline: true },
                {name: "Next Map", value: "```fix\n\n" +(data.next.map)+ "```" , inline: false},
                {name: "Next Map Starting", value: "```fix\n\n" + timeFormatTwentyFour(data.next.start) + " | " + timeFormatLuxonAmPm(data.next.start) + " | " + timeFormatTwentyFourPlusTwo(data.next.start) + "```"  , inline: false},
            )
            .setImage(data.current.asset)
            .setFooter("May the allfather be with you, and don't mald too much <3")

            interaction.followUp({ embeds: [embed] })

        } catch(error){
            console.error(chalk.red(`Error: ${error}`) );
            return await interaction
				.followUp({
					content: `There was an error processing your request\n\`${error}\``, ephemeral: true
				})
				.catch(err => interaction.followUp(err));
        }
        
    }
}