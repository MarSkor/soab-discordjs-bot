const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require('axios');
const { MessageEmbed } = require("discord.js");
const { getCountDown , timeFormater } = require("../../Helpers/adapters");

module.exports = {
   ...new SlashCommandBuilder()
        .setName("echo")
        .setDefaultPermission(false)
        .setDescription("echo your message")
        .addStringOption((option) => 
            option
                .setName('message')
                .setDescription('message that you want to echo')
                .setRequired(true)
        )
        .addUserOption((option) => 
            option
                .setName('target')
                .setDescription('message to be sent to')
                .setRequired(false)
        ),
    
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */

    run: async(client, interaction, args) => {
        const messageToSend = interaction.options.getString('message');
        const user = interaction.options.getUser('target');
        if(user){
            user.send({ content: messageToSend });
            interaction.followUp({ content: `Message sent to ${user.tag}`})
        } else{
            interaction.followUp({ content: messageToSend })
        }
        
        
    }
}