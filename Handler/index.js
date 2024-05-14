const fs = require('fs');
const { join } = require('path');

module.exports = async (client) => {

    const slashCommandsFiles = fs.readdirSync(join(process.cwd(), 'Commands')).flatMap(directory => {
        const commandsPath = join(process.cwd(), 'Commands', directory);
        return fs.readdirSync(commandsPath).map(file => join(commandsPath, file));
    });

    const componentsFiles = fs.readdirSync(join(process.cwd(), 'Components')).map(file => join(process.cwd(), 'Components', file));
    const eventFiles = fs.readdirSync(join(process.cwd(), 'Events')).map(file => join(process.cwd(), 'Events', file));
    const slashCommands = [];

    for (const file of slashCommandsFiles) {
        const command = require(file);
        const directory = file.split('/').slice(-2, -1)[0];

        if (!command?.name) continue;

        const properties = { directory, ...command };
        client.slashCommands.set(command.name, properties);

        if (['MESSAGE', 'USER'].includes(command.type)) {
            delete properties.description;
        }

        slashCommands.push(properties);
    }

    for (const file of componentsFiles) {
        const component = require(file);
        if (!component?.customId) continue;
        client.components.set(component.customId, component);
    }

    for (const file of eventFiles) {
        require(file);
    }

    client.once('ready', async () => {
        try {
            await client.application.commands.set(slashCommands);
        } catch (error) {
            console.error(`Erreur du déploiement des commandes : ${error.message}`);
        }
    });
};
