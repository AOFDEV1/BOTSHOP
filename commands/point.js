const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("point")
    .setDescription("เสก point")
    .addSubcommand(subcoomad =>
        subcoomad
        .setName("add")
        .setDescription("เพิ่มเงิน")
        .addUserOption(option =>
            option
            .setName("user")
            .setDescription("ผู้ใช้")
            .setRequired(true)
        )
        .addNumberOption(option =>
            option
            .setName("point")
            .setDescription("จำนวนเงิน")
            .setRequired(true)
        )
    )
    .addSubcommand(subcoomad =>
        subcoomad
        .setName("remove")
        .setDescription("ลบเงิน")
        .addUserOption(option =>
            option
            .setName("user")
            .setDescription("ผู้ใช้")
            .setRequired(true)
        )
        .addNumberOption(option =>
            option
            .setName("point")
            .setDescription("จำนวนเงิน")
            .setRequired(true)
        )
    ),
    async execute(client, interaction) {
        const user_id = interaction.user.id;
        const ucant = new MessageEmbed()
            .setColor(`RED`)
            .setDescription(`\`❌\` \`︱\`คุณไม่มีสิทธิ์ใช้คำสั่งนี้`)
        if(!client.config.ownerID.includes(user_id)) return interaction.reply({ embeds: [ucant], ephemeral: true });
        const member = interaction.options.getUser("user");
        const point = interaction.options.getNumber("point");
        const accdata = JSON.parse(fs.readFileSync('./db/acc.json', 'utf8'));

        if(interaction.options.getSubcommand() === "add") {
            const noregluxz = new MessageEmbed()
                .setColor(`RED`)
                .setDescription(`\`❌\` \`︱\`<@${member.id}> ยังไม่ลงทะเบียนสมาชิก`)
            if(!accdata[member.id]) return interaction.reply({ embeds: [noregluxz],ephemeral: true });

            accdata[member.id].point += point;
            accdata[member.id].pointall += point;
            const ok = new MessageEmbed()
                .setColor(`GREEN`)
                .setDescription(`\`✅\` \`︱\`เพิ่มเงินจำนวน \`${point}\` บาทให้ <@${member.id}> เรียบร้อย`)
            interaction.reply({ content: `<@${member.id}>`, embeds: [ok] });
            fs.writeFileSync('./db/acc.json', JSON.stringify(accdata, null, 4));
        } else if(interaction.options.getSubcommand() === "remove") {
            const noreg = new MessageEmbed()
                .setColor(`RED`)
                .setDescription(`\`❌\` \`︱\`<@${member.id}> ยังไม่ลงทะเบียนสมาชิก`)
            if(!accdata[member.id]) return interaction.reply({ embeds: [noreg],ephemeral: true });
            const error = new MessageEmbed()
                .setColor(`RED`)
                .setDescription(`\`❌\` \`︱\`<@${member.id}> ไม่มีเงินเพียงพอที่จะลบ`)
            if(accdata[member.id].point < point) return interaction.reply({ content: `<@${member.id}> ไม่มีเงินเพียงพอที่จะลบ`,ephemeral: true });

            accdata[member.id].point -= point;

            const luxz = new MessageEmbed()
                .setColor(`YELLOW`)
                .setDescription(`\`✅\` \`︱\`ลบ \`${point}\` บาทของ <@${member.id}> เรียบร้อย`)
            interaction.reply({ embeds: [luxz],ephemeral: true });
            fs.writeFileSync('./db/acc.json', JSON.stringify(accdata, null, 4));
        }
    }
          }