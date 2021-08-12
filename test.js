const discord = require("discord.js")
const client = new discord.Client({ intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES, discord.Intents.FLAGS.GUILD_VOICE_STATES] })
const { OxyManager } = require("./oxy.js")

const nodes = [{
  "name": "Karthik",
  "url": "rajlava.mallareddyraja.repl.co",
  "port": 443,
  "auth": "rajthepro",
  "secure": true
}]
const audioHandler = require("./AudioHandler")

const shoukakuOptions = {
  moveOnDisconnect: false,
  resumable: false,
  resumableTimeout: 30,
  reconnectTries: 2,
  restTimeout: 20000000
};
const token = 'ODQyNjU2MTM1OTAyMjY1MzU1.YJ4erg._AgdKnV2I2uvt8mpXjQ8XQtCyAA';
client.oxy = new audioHandler(client)
client.login(token)
client.on("ready", (client) => {


})


client.on("messageCreate", async (message) => {

  //  console.log()
  if (message.content.startsWith("+eval")) {
    const content = message.content.split(' ').slice(1).join(' ');
    // var result = message.content.split(" ").slice(1).join(" ")
    //     let evaled = eval(result);
    //     console.log(result)

    const result = new Promise((resolve, reject) => resolve(eval(content)));
    return result.then((output) => {
      if (typeof output !== 'string') {
        output = require('util').inspect(output, { depth: 0 });
      }
      if (output.includes(token)) {
        output = output.replace(token, 'T0K3N');
      }
      message.channel.send(`\`\`\`js\n${output}\`\`\``);
    }).catch((err) => {
      err = err.toString();
      if (err.includes(token)) {
        err = err.replace(token, 'T0K3N');
      }
      message.reply(`\`\`\`js\n${err}\`\`\``);
    });

}
 if (message.content.startsWith("+play"))  {
 
const ployer =  await client.oxy.getNode().players.get(message.guild.id)
const content = message.content.split(' ').slice(1).join(' ');
const search = client.oxy.getNode().rest.resolve(content,"youtube").then(search => {
ployer.addToQueue(search.tracks.shift())
if(!ployer.playing)
return ployer.play()
})
ployer.on("start",()=>{
  console.log("hi")
})

}







  

})
