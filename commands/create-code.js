const { SlashCommandBuilder } = require('@discordjs/builders');
const {  Modal, TextInputComponent, showModal } = require('discord-modals')
const {MessageEmbed} = require('discord.js')
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("create-code")
    .setDescription("สร้างคีย์"),
    async execute(client, interaction) {
      const user_id = interaction.user.id;
      const ucant = new MessageEmbed()
            .setColor(`RED`)
            .setDescription(`\`❌\` \`︱\`คุณไม่มีสิทธิ์ใช้คำสั่งนี้`)
      if(!client.config.ownerID.includes(user_id)) return interaction.reply({ embeds: [ucant], ephemeral: true });
        const regmodal = new Modal()
        .setCustomId("key-id")
        .setTitle("สร้างคีย์")
        .addComponents(
            new TextInputComponent()
            .setCustomId("key-code")
            .setLabel("ใส่รหัสคีย์")
            .setPlaceholder("KANS2")
            .setStyle("SHORT")
            .setMinLength(1)
            .setMaxLength(10)
            .setRequired(true),
           new TextInputComponent()
            .setCustomId("key-amount")
            .setLabel("จำนวนคีย์ที่จะใช้ได้")
            .setPlaceholder("10")
            .setStyle("SHORT")
            .setMinLength(1)
            .setMaxLength(3)
            .setRequired(true),
            new TextInputComponent()
            .setCustomId("key-money")
            .setLabel("เงินที่จะให้")
            .setPlaceholder("200")
            .setStyle("SHORT")
            .setMinLength(1)
            .setMaxLength(10)
            .setRequired(true)
        )
        await showModal(regmodal, {
            client: client,
            interaction: interaction,
        });
    }
}