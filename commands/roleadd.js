const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roleadd")
    .setDescription("roleadd")
    .addStringOption(options =>
      options
      .setName("id")
      .setDescription("id สินค้า")
      .setRequired(true)
    )
    .addRoleOption(options =>
      options
      .setName("role")
      .setDescription("ยศที่จะเพิ่ม")
      .setRequired(true)
    ),
    async execute(client, interaction) {
      const user_id = interaction.user.id;
      const error = new MessageEmbed()
          .setColor(`RED`)
          .setDescription(`\`❌\` \`︱\`คุณไม่มีสิทธิ์ใช้คำสั่งนี้`)
      if(!client.config.ownerID.includes(user_id)) return interaction.reply({ embeds: [error], ephemeral: true });
      const stockdata = JSON.parse(fs.readFileSync('./db/stock.json', 'utf8'));
      const id = interaction.options.getString("id");
      const role = interaction.options.getRole("role");
      const wrong = new MessageEmbed()
          .setColor(`RED`)
          .setDescription(`\`❌\` \`︱\`กรุณาระบุ id ที่ถูกต้อง`)
      if(isNaN(id)) return interaction.reply({ embeds: [wrong] });
      const luxz = new MessageEmbed()
          .setColor(`RED`)
          .setDescription(`\`❌\` \`︱\`กรุณาระบุ id ที่ถูกต้อง`)
      if(!stockdata[id]) return interaction.reply({ embeds: [luxz] });
      stockdata[id].role = role.id;
      fs.writeFileSync('./db/stock.json', JSON.stringify(stockdata, null, 2));
      const ok = new MessageEmbed()
          .setColor(`YELLOW`)
          .setDescription(`\`✅\` \`︱\`ทำการให้บทบาท ${role} สินค้าไอดี ${id}`)
      interaction.reply({ embeds: [ok] })
    }
}