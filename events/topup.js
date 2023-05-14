const client = require("../index.js");
const { MessageEmbed, WebhookClient } = require("discord.js");
const tw = require('../API/truemoney.js')
const fs = require('fs');
const log = new WebhookClient({ url: client.config.webhook });
const now = new Date();
const time = now.toLocaleString('THA', { timeZone: 'Asia/Bangkok' })


client.on("modalSubmit", async (interaction) => {
  if (interaction.customId === "topup-id") {
    await interaction.deferReply({ ephemeral: true });
    const user_id = interaction.user.id;
    const url = interaction.getTextInputValue("topup-url");
    const member = interaction.guild.members.cache.get(user_id);
    const accdata = JSON.parse(fs.readFileSync('./db/acc.json', 'utf8'));

    tw.VoucherCode(client.config.wallet, url).then(async (res) => {
      switch (res.status) {
        case `SUCCESS`:
          const topupsuccess = new MessageEmbed()
            .setColor("GREEN")
            .setThumbnail("https://media.discordapp.net/attachments/952582279723622430/977343962178273320/e80652af2c77e3a73858e16b2ffe5f9a.gif")
            .setTitle("`\✅\` `\|\` ทำรายการสำเร็จ")
            .setDescription(`สถานะ 🟢﹕\`ซองอั่งเปาถูกใช้สำเร็จ\` \nเติมเงินจำนวน 💰﹕\` ${res.amount} \` บาท \nยอดรวมทั้งหมด 🏧﹕\`${accdata[user_id].point}\` บาท`)
            .setFooter({ text: `${member.user.tag}` })
            .setTimestamp();
          const done = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("✅ | เติมเงินสำเร็จ")
            .setDescription(`> 🏷️ ชื่อนาม-สกุล: \`${accdata[user_id].name} ${accdata[user_id].surname}\` \n> 👥 ผู้ใช้งาน: <@${user_id}> \n> 💸 จำนวนเงิน: \`${res.amount}\` บาท \n📅 วัน-เวลา: \`${time}\` \n> 🧧 ลิ้งค์อังเปา: ||${url}||`)
            .setFooter({ text: `${member.user.tag}` })
            .setTimestamp();
          interaction.followUp({ embeds: [topupsuccess] });
          console.log(`${member.user.tag} | ได้เติมเงินสำเร็จแล้ว จำนวนเงินที่เติม ${res.amount} บาท`)
          log.send({
            content: 'มีคนเติมเงิน',
            embeds: [done]
          })
          accdata[user_id].point += res.amount;
          accdata[user_id].pointall += res.amount;
          fs.writeFileSync('./db/acc.json', JSON.stringify(accdata, null, 4));
          break;
        case `FAIL`:
          switch (res.reason) {
            case `Voucher is expired.`:
              const topupexpired = new MessageEmbed()
                .setColor("RED")
                .setThumbnail("https://media.discordapp.net/attachments/952582279723622430/977344546717442048/comp_3.gif")
                .setTitle("`\⚠️\` `\|\` ทำรายการไม่สำเร็จ")
                .setDescription(`\`\`\`diff\n- คุณได้เติมเงินไม่สำเร็จ เนื่องจากลิงค์ซองอั่งเปานี้ถูกใช้ไปแล้ว\`\`\``)
                .setFooter({ text: `${member.user.tag}` })
                .setTimestamp();
              interaction.reply({ embeds: [topupexpired] })
              break;
            case `Voucher doesn't exist.`:
              const topupnotexist = new MessageEmbed()
                .setColor("RED")
                .setThumbnail("https://media.discordapp.net/attachments/952582279723622430/977344546717442048/comp_3.gif")
                .setTitle("`\⚠️\` `\|\` ทำรายการไม่สำเร็จ")
                .setDescription(`\`\`\`diff\nลิงค์อังเปาไม่ถูกต้อง กรุณาใส่ลิงค์อั่งเปาให้ถูกต้อง\`\`\``)
                .setFooter({ text: `${member.user.tag}` })
                .setTimestamp();
              interaction.followUp({ embeds: [topupnotexist] })
              break;
            case `Voucher ticket is out of stock.`:
              const topupoutofstock = new MessageEmbed()
                .setColor("RED")
                .setThumbnail("https://media.discordapp.net/attachments/952582279723622430/977344546717442048/comp_3.gif")
                .setTitle("`\⚠️\` `\|\` ทำรายการไม่สำเร็จ")
                .setDescription(`\`\`\`diff\n- คุณได้เติมเงินไม่สำเร็จ เนื่องจากลิงค์ซองอั่งเปานี้ถูกใช้ไปแล้ว\`\`\``)
                .setFooter({ text: `${member.user.tag}` })
                .setTimestamp();
              interaction.followUp({ embeds: [topupoutofstock] })
              break;
          }
          break;
      }
    })
  }
})