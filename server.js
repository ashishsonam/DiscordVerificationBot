if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Discord = require("discord.js");
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const client = new Discord.Client({
  partials: ["MESSAGE", "REACTION"],
});

app.get("/", (req, res) => {
  res.send("๛ ᴡᴀɴᴅᴀ #0299 is active...");
});

app.listen(port, () => {
  console.log("Server has started on http://localhost:" + port + "/");
});

client.login(process.env.TOKEN);

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in.`);
  const channel = client.channels.cache.get(process.env.CHANNEL_ID);
  channel.messages.fetch({ limit: 1 }).then((messages) => {
    if (messages.size == 0) {
      channel.send(
        "> ** React  :white_check_mark:  to this message to gain access to this server. **"
      );
    }
  });
  channel.messages.fetch({ limit: 1 }).then((mainMessages) => {
    mainMessages.forEach((mainMessage) => {
      mainMessage.react("✅");
    });
  });
});

client.on("messageReactionAdd", async (messageReaction, user) => {
  let applyRole = async () => {
    let role = messageReaction.message.guild.roles.cache.find(
      (role) => role.name.toLocaleLowerCase() === "member"
    );
    let member = messageReaction.message.guild.members.cache.find(
      (member) => member.id === user.id
    );
    try {
      if (role && member) {
        await member.roles.add(role);
        console.log(`Role assigned to ${user.username}#${user.discriminator}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (messageReaction.message.partial) {
    try {
      let msg = await messageReaction.message.fetch();
      if (
        msg.id === process.env.MESSAGE_ID &&
        user.username != "๛ ᴡᴀɴᴅᴀ" &&
        user.discriminator != "0299"
      ) {
        applyRole();
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    if (
      messageReaction.message.id === process.env.MESSAGE_ID &&
      user.username != "๛ ᴡᴀɴᴅᴀ" &&
      user.discriminator != "0299"
    ) {
      applyRole();
    }
  }
});

client.on("messageReactionRemove", async (messageReaction, user) => {
  let removeRole = async () => {
    let role = messageReaction.message.guild.roles.cache.find(
      (role) => role.name.toLocaleLowerCase() === "member"
    );
    let member = messageReaction.message.guild.members.cache.find(
      (member) => member.id === user.id
    );
    try {
      if (role && member) {
        await member.roles.remove(role);
        console.log(`Role removed from ${user.username}#${user.discriminator}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (messageReaction.message.partial) {
    try {
      let msg = await messageReaction.message.fetch();
      if (
        msg.id === process.env.MESSAGE_ID &&
        user.username != "๛ ᴡᴀɴᴅᴀ" &&
        user.discriminator != "0299"
      ) {
        removeRole();
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    if (
      messageReaction.message.id === process.env.MESSAGE_ID &&
      user.username != "๛ ᴡᴀɴᴅᴀ" &&
      user.discriminator != "0299"
    ) {
      removeRole();
    }
  }
});
