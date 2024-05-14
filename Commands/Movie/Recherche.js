const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { searchMovie } = require("../../Handler/functions");

module.exports = {
    name: "recherche",
    description: "Recherchez un film !",
    dm_permission: false,
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'titre',
            description: 'Titre du film.',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'année',
            description: 'Année de publication du film.',
            type: ApplicationCommandOptionType.Integer,
        },
    ],

    run: async (client, interaction) => {

        await interaction.deferReply()

        const title = await interaction.options.getString("titre");
        let year = await interaction.options.getInteger("année");

        year = undefined ? "" : `&y=${year}`;

        const response = await searchMovie(title, year, client);

        if(response.Response === ("False")) {

            return interaction.editReply({ content: "**Une erreur est survenue, ou aucun résultat n'a pu être trouvé.**" });

        } else {

            const embed = new EmbedBuilder()
                .setColor("Yellow")
                .setTitle(`${response.totalResults} résultat(s) trouvé(s)`)
                .setTimestamp()
                .setFooter({
                    text: `Demandé par ${interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                });

            response.Search.forEach(movie => {

                embed.addFields({
                    name: `${movie.Title} (${movie.Year})`,
                    value: `> Identifiant : ${movie.imdbID}`
                });
                
            });

            return interaction.editReply({ embeds: [embed] });

        }

    },
};
