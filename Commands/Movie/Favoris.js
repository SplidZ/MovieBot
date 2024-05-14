const { ApplicationCommandOptionType, EmbedBuilder } = require(`discord.js`);
const { pushData, getData, pullData, searchMovieById } = require("../../Handler/functions");

module.exports = {
    name: `favoris`,
    description: `Commandes relatives au système de favoris.`,
    dm_permission: false,
    options: [
        {
            name: `ajouter`,
            description: `Ajoutez un film en favoris !`,
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'identifiant',
                    type: ApplicationCommandOptionType.String,
                    description: `Identifiant du film.`,
                    required: true,
                },
            ]
        },
        {
            name: `retirer`,
            description: `Retirez un film en favoris !`,
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'identifiant',
                    type: ApplicationCommandOptionType.String,
                    description: `Identifiant du film.`,
                    required: true,
                },
            ]
        },
        {
            name: `liste`,
            description: `Listez vous vos films favoris !`,
            type: ApplicationCommandOptionType.Subcommand,
        },
    ],

    run: async (client, interaction) => {

        const subCommand = interaction.options.getSubcommand();

        if (subCommand === (`ajouter`)) {

            await interaction.deferReply()

            const id = await interaction.options.getString("identifiant");
            const data = await getData(`users.${interaction.user.id}.favorites`);

            if(data.includes(id)) {

                return interaction.editReply({ content: "**Favoris déjà existant.**" });

            } else {

                const response = await searchMovieById(id, client);

                if(response.Response === ("False")) {

                    return interaction.editReply({ content: "**Une erreur est survenue, ou aucun résultat n'a pu être trouvé.**" });

                } else {

                    await pushData(`users.${interaction.user.id}.favorites`,  id);

                    return interaction.editReply({ content: `**Le film "${response.Title}" à été ajouté à vos films favoris !**` });

                }

            }

        } else if (subCommand === (`retirer`)) {

            await interaction.deferReply()

            const id = await interaction.options.getString("identifiant");
            const data = await getData(`users.${interaction.user.id}.favorites`);

            if(!data.includes(id)) {

                return interaction.editReply({ content: "**Favoris inexistant.**" });

            } else {

                await pullData(`users.${interaction.user.id}.favorites`,  id);

                return interaction.editReply({ content: `**Le film avec l'identifiant "${id}" à été retiré de vos films favoris !**` });

            }
            
        } else if (subCommand === (`liste`)) {

            await interaction.deferReply()

            const list = await getData(`users.${interaction.user.id}.favorites`) ?? [];

            if(list.length === 0) {

                return interaction.editReply({ content: "**Une erreur est survenue, ou aucun résultat n'a pu être trouvé.**" });

            } else {

                const embed = new EmbedBuilder()
                    .setColor("Yellow")
                    .setTitle(`${list.length} favoris`)
                    .setTimestamp()
                    .setFooter({
                        text: `Demandé par ${interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    });

                list.forEach(async movieID => {

                    const movie = await searchMovieById(movieID, client);

                    embed.addFields({
                        name: `${movie.Title} (${movie.Year})`,
                        value: `> Identifiant : ${movie.imdbID}`
                    });
                
                });

                setTimeout(async () => {

                    return interaction.editReply({ embeds: [embed] });

                }, 2000);

            }

        }

    },
};
