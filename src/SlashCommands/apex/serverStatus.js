const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require('axios');
const { MessageEmbed } = require("discord.js");
const chalk = require('chalk');

module.exports = {
   ...new SlashCommandBuilder()
   .setName("apexstatus")
   .setDescription("Apex Legends Status"),

      /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */

    run: async(client, interaction, args) => {
        const apiUrl = `https://api.mozambiquehe.re/servers?auth=${process.env.APEX_API_KEY}`

        try{
            const response = await axios.get(apiUrl)
            const data = response.data;
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