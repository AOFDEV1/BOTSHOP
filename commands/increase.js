const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, TextInputComponent, showModal } = require('discord-modals');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("increase")
    .setDescription("increase stock")
    .addSubcommand(subcoomad =>
        subcoomad
        .setName("stock")
        .setDescription("increase stock")
    ),
    async execute(client, interaction) {
        const user_id = interaction.user.id;
        const ucant = new MessageEmbed()
            .setColor(`RED`)
            .setDescription(`\`❌\` \`︱\`คุณไม่มีสิทธิ์ใช้คำสั่งนี้`)
        if(!client.config.ownerID.includes(user_id)) return interaction.reply({ embeds: [ucant], ephemeral: true });
        if(interaction.options.getSubcommand() === "stock") {

            const stockmodal = new Modal()
            .setCustomId("increase-stock")
            .setTitle("สินค้าที่จะให้")
            .addComponents(
                new TextInputComponent()
                .setCustomId("stock-ids")
                .setLabel("รหัสสินค้า | STOCK ID")
                .setStyle("SHORT")
                .setRequired(true),
                new TextInputComponent()
                .setCustomId("stock-increase")
                .setLabel("สินค้าที่จะให้")
                .setStyle("SHORT")
                .setRequired(true)
            )

            await showModal(stockmodal, {
                client: client,
                interaction: interaction,
            })
        }
    }
}