const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require('axios');
const { MessageEmbed } = require("discord.js");
const chalk = require('chalk');

module.exports = {
   ...new SlashCommandBuilder()
   .setName("apexnews")
   .setDescription("News About Apex Legends"),

      /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */

    run: async(client, interaction, args) => {
        const apiUrl = `https://api.mozambiquehe.re/news?lang=en-us&auth=${process.env.APEX_API_KEY}`

        try{
            const response = await axios.get(apiUrl)
            const data = response.data;
            console.log(data)


            const embed = new MessageEmbed()
            .setTitle('Apex Legends | News')
            .setColor('PURPLE')
            .addFields(
                {name: "Info", value: "Coming soon"}
            )
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