const axios = require('axios');
const { MessageEmbed } = require("discord.js");
const { getCountDown , timeFormater } = require("../../Helpers/adapters");

module.exports = {
    name: 'apexpubs',
    description: 'Info about Apex Legends Pubs',
    permissions: 'ROLE',
    
    /**
     * 
     * @param {*} client 
     * @param {*} interaction 
     * @param {*} args 
     */

    run: async(client, interaction, args) => {
        const url = `https://api.mozambiquehe.re/maprotation?version=2&auth=${process.env.APEX_API_KEY}`
        try{
            
            const res = await axios.get(url)
            const data = res.data;
            console.log(data)
            
            const embed = new MessageEmbed()
            .setTitle('Battle Royale | Pubs')
            .setColor('#d90429')
            .addFields(
                {name: "Current Map", value: "```fix\n\n" + data.battle_royale.current.map + "```", inline: true},
                {name: "Time Left",  value: "```xl\n\n" + getCountDown(data.battle_royale.current.remainingTimer) + "```", inline: true },
                {name: "Next Map", value: "```fix\n\n" +(data.battle_royale.next.map)+ "```" , inline: false},
                {name: "Next Map Starting (en-GB)", value: "```fix\n\n" + timeFormater(data.battle_royale.next.start)+ "```" , inline: false}
                
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