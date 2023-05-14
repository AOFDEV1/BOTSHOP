const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, TextInputComponent, showModal } = require('discord-modals')
const { MessageEmbed } = require("discord.js")
const fs = require("fs")


module.exports = {
    data: new SlashCommandBuilder()
    .setName('topup')
    .setDescription('เติมเงินเข้าบัญชี'),
    async execute(client, interaction) {
      const user_id = interaction.user.id; 
      const accdata = JSON.parse(fs.readFileSync('./db/acc.json', 'utf8'));
      const noreg = new MessageEmbed()
          .setColor(`RED`)
          .setDescription(`\`⚠️\` \`︱\`คุณยังไม่มีบัญชี กรุณาใช้คำสั่ง \`/register\` เพื่อสมัครสมาชิก`)
      if (!accdata[user_id]) return interaction.reply({ embeds: [noreg], ephemeral: true });

        const topupmodal = new Modal()
        .setCustomId('topup-id')
        .setTitle('เติมเงินผ่านระบบซองอั่งเปา')
        .addComponents(
            new TextInputComponent()
            .setCustomId('topup-url')
            .setLabel('เติมเงินด้วยอังเปา (ห้ามมีตัว # อยู่ในลิงค์)')
            .setPlaceholder('กรอกลิงค์ซองอั่งเปา💸💰 | URL')
            .setStyle("SHORT")
            .setRequired(true)
        )

        await showModal(topupmodal, {
            client: client,
            interaction: interaction,
        });
    }
}