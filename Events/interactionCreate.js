const { getData } = require("../Handler/functions");
const client = require("../index");

client.on("interactionCreate", async (interaction) => {

    if (interaction.isChatInputCommand()) {

        const command = client.slashCommands.get(interaction.commandName);

        if (!command) {

            return interaction.reply({ content: "**Une erreur est survenue.**", ephemeral: true }).catch(err => {
                return interaction.followUp({ content: "**Une erreur est survenue.**", ephemeral: true });
            })

        }

        interaction.member = interaction.guild.members.cache.get(interaction.user.id) ?? interaction.user;

        command.run(client, interaction);

    } else if (interaction.isContextMenuCommand()) {

        const command = client.slashCommands.get(interaction.commandName);

        if (!command) {

            return interaction.reply({ content: "**Une erreur est survenue.**", ephemeral: true }).catch(err => {
                return interaction.followUp({ content: "**Une erreur est survenue.**", ephemeral: true });
            })

        }

        interaction.member = interaction.guild.members.cache.get(interaction.user.id) ?? interaction.user;

        command.run(client, interaction);

    } else if (interaction.isMessageComponent) {

        const customIdParts = interaction.customId.split('.');
        
        if (customIdParts.length > 1) {

            return;

        } else {

            const interactionUser = await getData(`temp.${interaction.message.id}.user`);

            if(interactionUser) {

                if(interaction.user.id !== interactionUser) {
                    return;
                }

                const component = client.components.get(interaction.customId);

                if (!component) {

                    return interaction.reply({ content: "**Une erreur est survenue.**", ephemeral: true }).catch(err => {
                        return interaction.followUp({ content: "**Une erreur est survenue.**", ephemeral: true });
                    })

                }

                interaction.member = interaction.guild.members.cache.get(interaction.user.id) ?? interaction.user;

                component.run(client, interaction);
                
            } else {

                const component = client.components.get(interaction.customId);

                if (!component) {

                    return interaction.reply({ content: "**Une erreur est survenue.**", ephemeral: true }).catch(err => {
                        return interaction.followUp({ content: "**Une erreur est survenue.**", ephemeral: true });
                    })

                }

                interaction.member = interaction.guild.members.cache.get(interaction.user.id) ?? interaction.user;

                component.run(client, interaction);
                
            }

        }

    }
    
});
