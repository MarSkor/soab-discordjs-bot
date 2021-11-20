const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require('axios');
const { MessageEmbed } = require("discord.js");
const { getCountDown , timeFormater } = require("../../Helpers/adapters");

module.exports = {
   ...new SlashCommandBuilder()
        .setName("apexarena")
        .setDescription("Info about Apex Legends Arena"),

    
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */

    run: async(client, interaction, args) => {
        const url = `https://api.mozambiquehe.re/maprotation?version=2&auth=${process.env.APEX_API_KEY}`
        try{
            
            const res = await axios.get(url)
            const data = res.data;
            console.log(data)
            
            const embed = new MessageEmbed()
            .setTitle('Battle Royale | Arena')
            .setColor('GREEN')
            .addFields(
                {name: "Current Map", value: "```fix\n\n" + data.arenas.current.map + "```", inline: true},
                {name: "Time Left",  value: "```xl\n\n" + getCountDown(data.arenas.current.remainingTimer) + "```", inline: true },
                {name: "Next Map", value: "```fix\n\n" +(data.arenas.next.map)+ "```" , inline: false},
                {name: "Next Map Starting (en-GB)", value: "```fix\n\n" + timeFormater(data.arenas.next.start)+ "```" , inline: false}
                
            )
            .setImage(data.arenas.current.asset)
            .setFooter("May the allfather be with you, and dont mald too much <3")


            interaction.followUp({ embeds: [embed] })
        } catch(error){
            console.error( `Error: ${error}` );
            return await interaction
				.followUp({
					content: `There was an error processing your request\n\`${error}\``, ephemeral: true
				})
				.catch(err => interaction.followUp(err));
        }
        
    }
}