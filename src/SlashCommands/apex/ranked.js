const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require('axios');
const { MessageEmbed } = require("discord.js");

module.exports = {
    ...new SlashCommandBuilder()
        .setName("apexranked")
        .setDescription("Info about Apex Legends Ranked"),

    
    /**
     * @param {CommandInteraction} interaction
     */

    run: async(interaction) => {
        const url = `https://api.mozambiquehe.re/maprotation?version=2&auth=${process.env.APEX_API_KEY}`
        try{
            const res = await axios.get(url)
            const data = res.data;
            console.log(data.ranked)
            
            const embed = new MessageEmbed()
            .setTitle('Battle Royale | Ranked')
            .setColor('BLUE')
            .addFields(
                {name: "Current Map", value: "```fix\n\n" + data.ranked.current.map + "```", inline: true},
                {name: "Next map", value: "```fix\n\n" + data.ranked.next.map + "```", inline: true},   
            )
            .setImage(data.battle_royale.current.asset)
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