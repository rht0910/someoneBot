var os = require("os");
const f = require('string-format');
const Discord = require('discord.js');
const client = new Discord.Client();
const s = require('./secret.json');
const c = require('./config.json');
const lang = require('./lang/' + c.lang + '.json');
const fs = require('fs');
var process = require('process');
var log = new require('log');
var logger = null;

client.on('ready', () => {
  logger = new log('info', fs.createWriteStream('latest.log', 'utf-8'));
  logger.info("Logged in as %s(%s)!", client.user.tag, client.token);
  console.log(`Logged in as ${client.user.tag}(Token:${client.token})!`);
  client.user.setActivity("@someone");
  logger.info("SomeoneBot has Fully startup.");
  console.log("SomeoneBot has Fully startup.");
});

client.on('message', msg => {
  if (!msg.author.bot) {
    if(~msg.content.indexOf("@someone")) {
      console.log("Got @someone!");
      logger.info("Got @someone!");
      if (msg.guild.available) {
        var member = msg.guild.members.randomKey();
	console.log("I've decided user: " + member.tag);
	logger.info("I've decided user: " + member.tag);
        msg.channel.send("<@" + member + ">");
      }
    }
  }
});

client.login(s.token);


process.on('SIGINT', function() {
    if (err) throw err;
    logger.info("Deleted lock file, Bye!");
    console.log("Deleted lock file.");
    client.user.setActivity("Bot is down: Received SIGINT");
    logger.emergency("Caught interrupt signal, shutting down.");
    console.log("Caught interrupt signal, shutdown.");
    if (client.destroy()) {
        process.exit();
    }
});

process.on('uncaughtException', function(err) {
  var e = {};
  client.user.setActivity("Bot is down: Received Uncaught Exception");
  Error.captureStackTrace(e);
  logger.emergency("Caught exception...: " + err);
  logger.emergency(e.stack);
  console.log('Caught exception...: ' + err);
  console.log(e.stack);
  client.destroy();
  process.exit();
});

