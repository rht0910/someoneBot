const Discord = require('discord.js')
const client = new Discord.Client()
const s = require('./secret.json')
const process = require('process')
const { LoggerFactory } = require('logger.js') // ???
const logger = LoggerFactory.getLogger('main', 'purple')

client.on('ready', () => {
  logger.info(`Logged in as ${client.user.tag}!`)
  client.user.setActivity("@someone")
  logger.info("SomeoneBot is ready.")
})

client.on('message', msg => {
  logger.info(`Received message: '${msg.content}'`)
  if (msg.author.bot || msg.channel.type !== 'text') return
  if (msg.content.includes(`<@${msg.client.user.id}>`) || msg.content.includes(`<@!${msg.client.user.id}>`)) {
      const member = msg.guild.members.randomKey()
	    logger.info("@someone is: " + member)
      msg.channel.send(`<@${member}>`)
  }
})

client.login(s.token)

process.on('uncaughtException', function(err) {
  logger.fatal(`Caught exception: ${err}`)
  logger.fatal(err.stack)
  client.destroy()
  process.exit()
})
