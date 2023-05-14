const client = require("../index.js");
const { MessageEmbed } = require("discord.js");
const fs = require('fs');

client.on("modalSubmit", async (i) => {
    const stockdata = JSON.parse(fs.readFileSync('./db/stock.json', 'utf8'));
    const productname = i.getTextInputValue("addstock-name");
    const product = i.getTextInputValue("addstock-product-id");
    const price = i.getTextInputValue("addstock-price");
    const img = i.getTextInputValue("addstock-img");
    const amout = i.getTextInputValue("addstock-stockpro");
    const id = Math.floor(Math.random() * 99999).toString();
    if(i.customId === "addstock-id") {
        if(isNaN(price)) return i.reply({ content: `\`${price}\` ไม่ใช่ตัวเลข` });
        const addstocksuccess = new MessageEmbed()
        .setColor("GREEN")
        .setTitle(`SUCCESS`)
        .setDescription(`เพิ่มสินค้าสำเร็จ\nID: \`${id}\`\nชื่อสินค้า: \`${productname}\`\nราคา: \`${price}\`\nจำนวน: \`${amout}\``)
        .setFooter({ text: "/item add" })
        .setTimestamp();
        stockdata[id] = {
            name: productname,
            product: [product],
            price: price,
            img: img,
            amout: amout
        }
        i.reply({ embeds: [addstocksuccess] });
        fs.writeFileSync('./db/stock.json', JSON.stringify(stockdata, null, '\t'));
    }
})