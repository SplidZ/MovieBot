const { Client, Collection } = require("discord.js");

const client = new Client({
    intents: 3276799
});

client.slashCommands = new Collection();
client.components = new Collection();
client.config = require("./config.json");

module.exports = client
require("./Handler")(client);

client.login(client.config.bot.token);