const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
      let helpmodembed = new Discord.RichEmbed()
      .setTitle('Mod Commands | prefix * | Mod list')
      .setDescription('There are 10 mod Commands Avalible!')
      .addField(':homes: GUILD', '``addrole, removerole``')
      .addField('📕 GENERAL', '``kick, ban, purge, mute, move, rainbow, vcban, giveaway, setvoice``')
      .setColor('RANDOM')
      .setFooter(`Requested by ${message.author.tag} | Help mod`)
      return message.channel.send(helpmodembed);
      
}
 
module.exports.help = {
  name: "help_mod"
}
