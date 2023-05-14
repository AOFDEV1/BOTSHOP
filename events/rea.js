const client = require("../index.js");
const { MessageEmbed, WebhookClient } = require("discord.js");
const fs = require('fs');
const log = new WebhookClient({ url: client.config.webhook });
const now = new Date();
const time = now.toLocaleString('THA', { timeZone: 'Asia/Bangkok' })



client.on("modalSubmit", async (i) => {
    const user_id = i.user.id;
    const name = i.getTextInputValue("register-name");
    const surname = i.getTextInputValue("register-surname");
    const accdata = JSON.parse(fs.readFileSync('./db/acc.json', 'utf8'));
    if(i.customId === "register-id") {
        await i.deferReply({ ephemeral: true });
        const luxz = new MessageEmbed()
        .setColor("RED")
        .setTitle("ผิดพลาด : คุณมีบัญชีแล้ว <a:b5:901051139410239559>")  
        if(accdata[user_id]) return i.followUp({ embeds: [luxz] });
        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor(`${i.guild.name}`, i.guild.iconURL())
        .setTitle(``)
        .setDescription(`> ✅︱สมัครบัญชีสำเร็จ \n> 📷︱กรุณาแคปหน้าจอเพื่อเป็นหลักฐาน \n\n📝︱รายละเอียดบัญชี \n\nชื่อ-นามสกุล : ||${name} ${surname}|| \nวัน-เวลา ที่สมัคร: \`${time}\` \nหากต้องการเติมเงิน /topup`)
        .setFooter(`${client.user.tag}`,i.user.avatarURL())
        .setThumbnail(i.user.avatarURL())
        .setTimestamp();
        const done = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor(`${i.guild.name}`, i.guild.iconURL())
        .setTitle(``)
        .setDescription(`> ✅︱<@${user_id}> สมัครบัญชีสำเร็จ \n> 📝︱รายละเอียดบัญชี \n\nชื่อ-นามสกุล : ||${name} ${surname}|| \nวัน-เวลา ที่สมัคร: \`${time}\` `)
        .setFooter(`${client.user.tag}`,i.user.avatarURL())
        .setThumbnail(i.user.avatarURL())
        .setTimestamp();
        
        i.followUp({ embeds: [embed] });
        log.send({
            content: 'สมัครบัญชี',
            embeds: [done]
          })
        
        accdata[user_id] = {
            name: name,
            surname: surname,

            point: 0,
            pointall: 0
        }
        fs.writeFileSync('./db/acc.json', JSON.stringify(accdata, null, '\t'));
    }
});