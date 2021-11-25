const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const chalk = require('chalk');
const { getBrRanked, getNextSplit } = require("../../Helpers/getApi");

module.exports = {
    ...new SlashCommandBuilder()
        .setName("alranked")
        .setDescription("Info about Apex Legends Ranked Games"),
        
      /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */

    run: async(client, interaction, args) => {

        try{
            const data = await getBrRanked();
            const nextsplit = await getNextSplit();
            
            const embed = new MessageEmbed()
            .setTitle('Battle Royale | Ranked')
            .setColor('BLUE')
            .addFields(
                {name: "Current Map", value: "```fix\n\n" + data.current.map + "```", inline: true},
                {name: "Next map", value: "```fix\n\n" + data.next.map + "```", inline: true},   
            )
            .addField("Split Ending", `<t:${nextsplit.end}:R>`)
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