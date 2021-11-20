module.exports = {
    name: "hi",
    description: "say hello",
    userPermissions: ["ADMINISTRATOR"],
    run:async(client, interaction,args) => {
        interaction.followUp({ content: "stop it"})
    }
}