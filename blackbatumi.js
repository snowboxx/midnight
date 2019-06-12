const Discord = require('discord.js');
const superagent = require('superagent');
const client = new Discord.Client();
const config = require('./config.json');
const activity = require('./resources/activity.json');
const status = require('./resources/status.json');

let prefix = config.prefix

const wolfaxtra = require('./blackbatumi2.js');
var S = require('string');

const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});


client.on('ready', () => {
  setInterval(() => {
        const onStatusInterval = Math.floor(Math.random() * (status.stats.length - 1) + 1);
        client.user.setStatus(status.stats[onStatusInterval]);
    }, 1000);
    setInterval(() => {
        const onInterval = Math.floor(Math.random() * (activity.games.length - 1) + 1);
        client.user.setActivity(activity.games[onInterval], {type: 'STREAMING'});
    }, 9000); 
    console.log(" ###   #     #  #     #####  #     #  #####");
    console.log("#   #  # #   #  #       #    # #   #  #");
    console.log("#   #  #  #  #  #       #    #  #  #  ####");
    console.log("#   #  #   # #  #       #    #   # #  #");
    console.log(" ###   #     #  ####  #####  #     #  #####");
    console.log(`Bot name ${client.user.username}`)
});



client.on('messageDelete', async (message) => {
    const logs = message.guild.channels.find('name', 'logs');
    if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
        await message.guild.createChannel('logs', 'text');
    } 
    if (!logs) {
        return console.log('The logs channel does not exist and cannot be created')
    }
    const entry = await message.guild.fetchAuditLogs({
        type: 'MESSAGE_DELETE'
    }).then(audit => audit.entries.first())
    let user;
    if (entry.extra.channel.id === message.channel.id && (entry.target.id === message.author.id) && (entry.createdTimestamp > (Date.now() - 5000)) && (entry.extra.count >= 1)) {
        user = entry.executor.username
    } else {
        user = message.author
    }
    const logembed = new Discord.RichEmbed()
        //.setTitle('Message Deleted')
        .setAuthor(user.tag, message.author.displayAvatarURL)
        .addField(`**Message sent by ${message.author.username}> deleted in ${message.channel.name}**\n\n`, message.content)
        .setColor(message.guild.member(client.user).displayHexColor)
        .setFooter(`<#${message.channel.id}>`)
        .setTimestamp()
    //console.log(entry)
    logs.send(logembed);
});
//===============================================================================================
client.on('guildMemberAdd', member => {
  let channel = member.guild.channels.find('name', '❖》summoned');
  let memberavatar = member.user.avatarURL
    if (!channel) return;
  let embed = new Discord.RichEmbed()
      .setColor('#FF007F')
      .setThumbnail(memberavatar)
      .addField('🌺|Name» ',`${member}`)
      .addField('🔥|Welcome » ' , `Welcome to 🌙 𝙈𝙞𝙙𝙉𝙞𝙜𝙝𝙩 𝘾𝙡𝙪𝙗 🌙 ${member} enjoy your stay and dont forget to asign your  your roles #❖》self-role & #❖》role-colors`)
      .addField('📝| User ID » ', "**[" + `${member.id}` + "]**" )
              .addField('➡| YOU ARE NUMBER',`${member.guild.memberCount}`)                     
                                   .addField('🔮|Server Name » ', `${member.guild.name}`,true)
  .addField('•🕣|Time Create » ', member.user.createdAt.toLocaleString(), true)

                                     
   .setFooter("🌙 𝙈𝙞𝙙𝙉𝙞𝙜𝙝𝙩 𝘾𝙡𝙪𝙗 🌙")
      .setTimestamp()
 
    channel.sendEmbed(embed);
});
//==============================================================================
/*Quit*/
client.on('guildMemberRemove', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':cry: **' + member.user.username + '** left ' + member.guild.name)
        .setFooter('We are now ' + member.guild.memberCount)
    member.guild.channels.get('588185068552323122').send(embed)
 
});
client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (!message.content.startsWith(prefix)) return;
  
    let messageArray = message.content.split(' ');
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(client,message,args);
  
});

client.login(process.env.BOT_TOKEN);
