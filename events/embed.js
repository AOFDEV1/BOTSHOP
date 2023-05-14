const client = require("../index.js");
const { MessageEmbed } = require("discord.js");

client.on("modalSubmit", async (interaction) => {
    if(interaction.customId === "embed-id") {
        await interaction.deferReply({ ephemeral: true });
        const embedtitle = interaction.getTextInputValue("embed-title");
        const embeddescription = interaction.getTextInputValue("embed-description");
        const embedimg = interaction.getTextInputValue("embed-img");
        const embedcolor = interaction.getTextInputValue("embed-color");

        const sendembed = new MessageEmbed()
        .setTitle(embedtitle)
        .setDescription(embeddescription)
        .setImage(embedimg)
        .setColor(embedcolor)
        .setFooter({ text: 'ประกาศจากแอดมิน' })
        .setTimestamp();

        interaction.channel.send({ content: '@everyone',embeds: [sendembed] });
        interaction.followUp({ content: 'สำเร็จสร้างประกาศเสร็จแล้ว!' })
    }
})