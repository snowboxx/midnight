const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " You do not have sufficient permissions to vc ban members.");
    if (args.includes("@everyone")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + 'Error.');
    if (args.includes("@here")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + 'Error.');
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!tomute) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Couldn't find user.");
    if (tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "The user you are trying to vc ban is either the same, or higher ranking than you.");
    let muterole = message.guild.roles.find(`name`, "VC Banned");

    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "VC Banned",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                     CONNECT: false,
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }

    let mutetime = args[1];
    if (!mutetime) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Please specify a time.");

    await (tomute.addRole(muterole.id));
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `<@${tomute.id}> has been VC banned for ${ms(ms(mutetime))}`);

    setTimeout(function() {
        if(!tomute.roles.has(muterole.id)) return 
        tomute.removeRole(muterole.id);
        message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `<@${tomute.id}> has been unvc banned.`);
    }, ms(mutetime));

}

module.exports.help = {
    name: "vcban",
}
