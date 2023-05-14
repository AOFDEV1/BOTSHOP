const { MessageEmbed, MessageSelectMenu, MessageActionRow } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("กระเป๋าเงิน"),
    async execute(client, interaction) {
        const user_id = interaction.user.id;
        const accdata = JSON.parse(fs.readFileSync('./db/acc.json', 'utf8'));
    
        const error = new MessageEmbed()
            .setColor(`RED`)
            .setDescription(`\`⚠️\` \`︱\`คุณยังไม่มีบัญชี กรุณาใช้คำสั่ง \`/register\` เพื่อสมัครสมาชิก`)
      
        if (!accdata[user_id]) return interaction.reply({ embeds: [error], ephemeral: true });

        const bal = new MessageEmbed()
        .setColor("GREEN")
        .setTitle(`บัญชีของคุณ`)
        .setDescription(`สวัสดีคุณ: \`${accdata[user_id].name} ${accdata[user_id].surname}\``)
        .setFooter({ text: `Requested by ${interaction.user.tag}` })
        .setThumbnail(interaction.user.avatarURL())
        .setTimestamp();

        const balance = new MessageEmbed()
        .setColor("GOLD")
        .setDescription(`ยอดเงินคงเหลือ: \`${accdata[user_id].point}\` บาท`)

        const balanceall = new MessageEmbed()
        .setColor("GOLD")
        .setDescription(`ยอดเติมเงินสะสม: \`${accdata[user_id].pointall}\` บาท`)

        const sebal = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId("bal-menu")
            .setPlaceholder("💰 | ดูยอดเงินของคุณ")       
            .setOptions([
                {
                    label: "หน้าหลัก",
                    emoji: "990820011490807858",
                    value: "baladd"
                },
                {
                    label: "เงินคงเหลือ",
                    emoji: "987912822627373126",
                    value: "balan"
                },
                {
                    label: "เติมเงินสะสม",
                    emoji: "987912822627373126",
                    value: "balall"
                },
            ])
        )
        const msgdata = {
            embeds: [bal],
            components: [sebal],
            fetchReply: true,
            ephemeral: true
        }
        const msg = interaction.replied ? await interaction.followUp(msgdata) : await interaction.reply(msgdata);
        const col = msg.createMessageComponentCollector({
            filter: (i) => i.user.id == user_id,
            time: 300000
        });
        col.on('collect', async (i) => {
            i.deferUpdate();
            if(i.values[0] === "balan") {
                interaction.editReply({
                    embeds: [balance]
                });
            } else if (i.values[0] === "balall") {
                interaction.editReply({
                    embeds: [balanceall]                 
            });
            } else if (i.values[0] === "baladd") {
                interaction.editReply({
                    embeds: [bal]                 
            });
            } else if (i.values[0] === "cancel") {
                interaction.deleteReply();
            }
        })
    }
}