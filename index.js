const Discord = require('discord.js');
const { Client, Collection } = require('discord.js');
const client = new Discord.Client({
  intents: 32767
});
const discordModals = require('discord-modals')
discordModals(client);


module.exports = client;
client.config = require('./config/config.json');
client.slash = require('./config/slash.json');
client.commands = new Collection();
require("./handler")(client);



console.clear()


client.login(client.config.token);



const express = require('express')
const app = express();
const port = 8000
 
app.get('/' , (req,res) => res.send('Working!'))
app.listen( port , () => 
  console.log(`Your app is listening a http://localhost:${port}`)
);