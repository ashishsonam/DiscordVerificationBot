if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const Discord = require("discord.js");
const client = new Discord.Client({
    partials: ["MESSAGE", "REACTION"],
});

client.login(process.env.TOKEN);

client.on("ready", () => {
    console.log(`${client.user.tag} has logged in`);
});

client.on("messageReactionAdd", async (messageReaction, user) => {
    let applyRole = async () => {
        // console.log(user);
        let emojiName = messageReaction.emoji.name;
        // console.log(`emojiname = ${emojiName}`);
        if (emojiName === "✅") {
            emojiName = "member";
        }

        let role = messageReaction.message.guild.roles.cache.find(
            (role) =>
                role.name.toLocaleLowerCase() === emojiName.toLocaleLowerCase()
        );
        let member = messageReaction.message.guild.members.cache.find(
            (member) => member.id === user.id
        );
        console.log(`role = ${role}, member = ${member}`);
        try {
            if (role && member) {
                await member.roles.add(role);
                console.log(
                    `Role assigned to ${user.username}#${user.discriminator}`
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    if (messageReaction.message.partial) {
        try {
            let msg = await messageReaction.message.fetch();
            if (msg.id === process.env.MESSAGE_ID) {
                applyRole();
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        if (messageReaction.message.id === process.env.MESSAGE_ID) {
            applyRole();
        }
    }
});
