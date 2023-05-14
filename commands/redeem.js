const { SlashCommandBuilder } = require('@discordjs/builders');
const client = require("../index.js");
const { MessageEmbed,WebhookClient } = require("discord.js")
const fs = require('fs');
const log = new WebhookClient({ url: client.config.webhook });
const now = new Date();
const time = now.toLocaleString('THA', { timeZone: 'Asia/Bangkok' })

module.exports = {
    data: new SlashCommandBuilder()
    .setName("redeem")
    .setDescription("ใช้โค้ด")
    .addStringOption(option =>
            option
            .setName("code")
            .setDescription("โค้ด")
            .setRequired(true)
        ),
    async execute(client, interaction) {
        const user_id = interaction.user.id;
        const code = interaction.options.getString("code");
        const data = JSON.parse(fs.readFileSync('./db/key.json', 'utf8'));
        const accdata = JSON.parse(fs.readFileSync('./db/acc.json', 'utf8'));
        const noregluxz = new MessageEmbed()
            .setColor(`RED`)
            .setDescription(`\`❌\` \`︱\`<@${user_id}> ยังไม่ลงทะเบียนสมาชิก`)

        
        if(!accdata[user_id]) return interaction.reply({ embeds: [noregluxz],ephemeral: true });
        const not = new MessageEmbed()
          .setColor("RED")
          .setTitle("ผิดพลาด : ไม่เจอโค้ดนี้ <a:b5:901051139410239559>")  
        if(!data[code]) return interaction.reply({ embeds: [not] ,ephemeral: true});
        const usen = new MessageEmbed()
            .setColor(`RED`)
            .setDescription(`\`❌\` คุณใช้โค้ดไปแล้ว`)
        if(data[code].use.includes(user_id)) return interaction.reply({ embeds: [usen],ephemeral: true });
          
        else{
          const zero = new MessageEmbed()
          .setColor("RED")
          .setTitle("ผิดพลาด : โค้ดนี้ถูกใช้หมดแล้ว <a:b5:901051139410239559>") 
          if(data[code].amount <= "0") return interaction.reply({ embeds: [zero] ,ephemeral: true});
            
          else{
  
            const money = data[code].money
            const luxz = new MessageEmbed()
                .setColor(`YELLOW`)
                .setDescription(`> ✅ ใช้งานโค้ด \`${code}\` สำเร็จ\n> 💸 จำนวนเงิน: \`${money}\` บาท \n> 📅 วัน-เวลา: \`${time}\``)
            interaction.reply({ embeds: [luxz],ephemeral: true });
            
            data[code].amount -= 1
            data[code]["use"] += (user_id + " , ")
            fs.writeFileSync('./db/key.json', JSON.stringify(data, null, 4));
            accdata[user_id].point += parseInt(money)
            accdata[user_id].pointall += parseInt(money)
            fs.writeFileSync('./db/acc.json', JSON.stringify(accdata, null, 4));
          }
            const money = data[code].money
            const done = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("✅ | redeem สำเร็จ")
            .setDescription(`> 👥 ผู้ใช้งาน: <@${user_id}> \n> 🎟️ redeem โค้ด \`${code}\` \n> 📉 เหลือการใข้งานอีก ${data[code].amount} ครั้ง\n> 💸 จำนวนเงิน: \`${money}\` บาท \n📅 วัน-เวลา: \`${time}\``)
            .setFooter({ text: `${interaction.user.tag}` })
            .setTimestamp();
          log.send({
            content: 'redeem สำเร็จ',
            embeds: [done]
          })



        }

        }
   }
      