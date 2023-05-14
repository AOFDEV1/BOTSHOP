const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, TextInputComponent, showModal } = require('discord-modals')
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("สมัครบัญชี"),
    async execute(client, interaction) {
        const regmodal = new Modal()
        .setCustomId("register-id")
        .setTitle("ลงทะเบียนสมาชิก")
        .addComponents(
            new TextInputComponent()
            .setCustomId("register-name")
            .setLabel("ใส่ชื่อ เช่น สำลี")
            .setPlaceholder("โปรดใส่ชื่อจริง")
            .setStyle("SHORT")
            .setMinLength(1)
            .setMaxLength(20)
            .setRequired(true),
            new TextInputComponent()
            .setCustomId("register-surname")
            .setLabel("ใส่นามสกุล เช่น ศรีจันทร์")
            .setPlaceholder("โปรดใส่นามสกุลจริง")
            .setStyle("SHORT")
            .setMinLength(1)
            .setMaxLength(20)
            .setRequired(true)
        )
        await showModal(regmodal, {
            client: client,
            interaction: interaction,
        });
    }
}