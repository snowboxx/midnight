const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
      let helpownerembed = new Discord.RichEmbed()
      .setTitle('Owner Commands | prefix * | Owner list')
      .setDescription('There 3 Available Commands')
      .addField('📕 GENERA', '``leave, shutdown, eval``')
      .setColor('RANDOM')
      .setFooter(`Requested by ${message.author.tag} | Help Owner`)
      return message.channel.send(helpownerembed);

}

module.exports.help = {
  name:"help_owner"
}
