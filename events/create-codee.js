const client = require("../index.js");
const { MessageEmbed, WebhookClient } = require("discord.js");
const log = new WebhookClient({ url: client.config.webhook });
const fs = require('fs');
const now = new Date();
const time = now.toLocaleString('THA', { timeZone: 'Asia/Bangkok' })



client.on("modalSubmit", async (i) => {
    const user_id = i.user.id;
    const code = i.getTextInputValue("key-code");
    const amount = i.getTextInputValue("key-amount");
    const money = i.getTextInputValue("key-money");
    const data = JSON.parse(fs.readFileSync('./db/key.json', 'utf8'));
    if(i.customId === "key-id") {
        await i.deferReply({ ephemeral: true });
        const luxz = new MessageEmbed()
        .setColor("RED")
        .setTitle("ผิดพลาด : มีโค้ดนี้แล้ว <a:b5:901051139410239559>")  
        if(data[code]) return i.followUp({ embeds: [luxz] });
        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor(`${i.guild.name}`, i.guild.iconURL())
        .setTitle(``)
        .setDescription(`> ✅ | สร้างโค้ด ${code} สำเร็จ \n> 🎟️ |จำนวนการใช้งาน ${amount} ครั้ง\n> 💵 | เงิน ${money} บาท`)
        .setFooter(`${client.user.tag}`,i.user.avatarURL())
        .setThumbnail(i.user.avatarURL())
        .setTimestamp();
        
        i.followUp({ embeds: [embed] });
         
        data[code] = {
            amount: amount,
            money: money,
            use: "",
        }
        fs.writeFileSync('./db/key.json', JSON.stringify(data, null, '\t'));
       const done = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("✅ | สร้างคีย์สำเร็จ")
            .setDescription(`> 👥 ผู้ใช้งาน: <@${user_id}> \n> 🎟️ คีย์ \`${code}\` \n> 📉 จำนวนการใช้งาน ${amount} ครั้ง\n> 💸 จำนวนเงิน: \`${money}\` บาท \n📅 วัน-เวลา: \`${time}\``)
            .setFooter({ text: `${i.user.tag}` })
            .setTimestamp();
          log.send({
            content: 'สร้างคีย์สำเร็จ',
            embeds: [done]
          })
    }
});