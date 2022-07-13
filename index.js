var Discord = require("discord.js");
var { SlashCommandBuilder } = require('@discordjs/builders');
var Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGES
    ]
});

const prefix = ".";

var data = new SlashCommandBuilder()
    .setName("clear")
    .setDescription("commande pour supprimer des messages")
    .addIntegerOption(option => 
        option.setName("number")
        .setDescription("Nombre de messages que vous voulez supprimer")
        .setRequired(true)

    );



    
Client.on("ready", () => {
    Client.application.commands.create(data);
    console.log("Bot connecté");

    Client.user.setPresence({
        activities: [{
            name: `Entrain de ban les scammeur & burner`,
            type: 'WATCHING',
            url: 'https://discord.gg/9Z6JFb3pgM' 
        }],
        status: 'online'
    });
});

Client.on("interactionCreate", interaction => {
    if(interaction.isCommand()){
        if(interaction.commandName === "clear"){
            var number = interaction.options.getInteger("number");

            if(number >= 1 && number <= 100)
            interaction.channel.bulkDelete(number);
            interaction.reply({content: number + "messages correctement supprimés", ephemeral: true});
        }
        else {
            interaction.reply({content: "Le nombre de messages supprimés doit etre situé entre 1 et 100", ephemeral: true });
        }
    }



})

Client.on("guildMemberAdd", member => {
    console.log("Un membre est arrivé.");
});


Client.on("messageCreate", message => {
    if (message.author.bot) return;

    if(message.content === prefix + "buyacc")(
        message.reply("Rendez-vous dans le channel <#996769504250052668> et crée un ticket")
    )


    if(message.content === prefix + "stock")(
        message.reply("Nous avons + 2k de compte lando merci de crée un ticket pour buy des acc")
    ) 

    

});


Client.login("process.env.TOKEN");