const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const chalk = require('chalk');
const { getAlStatus } = require("../../Helpers/getApi");


module.exports = {
   ...new SlashCommandBuilder()
   .setName("alstatus")
   .setDescription("Apex Legends Status"),

      /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */

    run: async(client, interaction, args) => {

        try{
            const data = await getAlStatus();
            console.log(data)

            const embed = new MessageEmbed()
            .setTitle('Apex Legends | Status')
            .setColor('YELLOW')
            .addFields(
                {name: "Info", value: "Coming soon"}
            )
            .setURL("https://apexlegendsstatus.com")
            .setFooter("May the allfather be with you, and don't mald too much <3")

            interaction.followUp({ embeds: [embed] })


        }catch(error){
            console.error(chalk.red(`Error: ${error}`) );
            return await interaction
				.followUp({
					content: `There was an error processing your request\n\`${error}\``, ephemeral: true
				})
				.catch(err => interaction.followUp(err));
        }
    }
}