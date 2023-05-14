const client = require("../index.js");
const { MessageEmbed } = require("discord.js");
const fs = require("fs");

client.on("modalSubmit", async (i) => {
    const stockdata = JSON.parse(fs.readFileSync('./db/stock.json', 'utf8'));
    const id = i.getTextInputValue("stock-ids");
    const product = i.getTextInputValue("stock-increase");
    if(i.customId === "increase-stock") {
        await i.deferReply({ ephemeral: true });
        const err = new MessageEmbed()
            .setColor(`RED`)
            .setDescription(`\`❌\`\`︱\`รหัสสินค้าไม่ถูกต้อง`)
        if(isNaN(id)) return i.followUp({ embeds: [err] });
        const luxz = new MessageEmbed()
            .setColor(`RED`)
            .setDescription(`\`❌\`\`︱\`ไม่รหัสสินค้าไอดี ${id}`)
        if(!stockdata[id]) return i.followUp({ embeds: [luxz] });
        stockdata[id].product = [...stockdata[id].product, product];
        stockdata[id].amout = parseInt(stockdata[id].amout) + parseInt("1");
        fs.writeFileSync('./db/stock.json', JSON.stringify(stockdata, null, 2));
        const ucant = new MessageEmbed()
            .setColor(`GREEN`)
            .setDescription(`\`✅\`\`︱\`สำเร็จ ทำการเพิ่มของที่จะให้เรียบร้อย`)
        i.followUp({ embeds: [ucant] });
    }
});