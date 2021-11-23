const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const chalk = require('chalk');
const { getArPubs } = require("../../Helpers/getApi");
const { getCountDown , timeFormater, timeFormaterAmPm } = require("../../Helpers/adapters");

module.exports = {
   ...new SlashCommandBuilder()
        .setName("alarena")
        .setDescription("Info about Apex Legends Arena Games"),
    
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */

    run: async(client, interaction, args) => {
        try{
            const data = await getArPubs();

            const embed = new MessageEmbed()
            .setTitle('Apex Legends | Arena')
            .setColor('GREEN')
            .addFields(
                {name: "Current Map", value: "```fix\n\n" + data.current.map + "```", inline: true},
                {name: "Time Left",  value: "```xl\n\n" + getCountDown(data.current.remainingTimer) + "```", inline: true },
                {name: "Next Map", value: "```fix\n\n" +(data.next.map)+ "```" , inline: false},
                {name: "Next Map Starting", value: "```fix\n\n" + timeFormater(data.next.start) + " | " +  timeFormaterAmPm(data.next.start) + "```" , inline: false},   
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