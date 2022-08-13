

// UFAK BİLGİLENDİRME
// CANIM SIKILDIKÇA BOT EDİTLİYORUM VEYA AYARLIYORUM
// BU BOTU KENDİ SUNUCUM İÇİN YAPTIM ZATEN V12 YDİ DEDİM NEDEN V14 YAPMIYORUM AYARLADIM VE SİZLE PAYLAŞMAK İSTEDİM.



const { Client, Intents, Collection, MessageEmbed } = require("discord.js");
const client = global.client = new Client({ 'intents': [32767]});
const { TOKEN, CHANNEL, LIVE, OYUN } = require("./config.js");
const config = require('./config.js')
const voiceDiscord = require(`@discordjs/voice`)
const ytdl = require('ytdl-core');
const express = require('express')


client.on('ready', async () => {

  client.user.setStatus("idle");
  setInterval(() => {
  const oyuncuk = Math.floor(Math.random() * (config.OYUN.length));
  client.user.setActivity(`${config.OYUN[oyuncuk]}`, {type: "LISTENING"});
 }, 10000);


  const VoiceChannel = client.channels.cache.get(CHANNEL);
 const connection = voiceDiscord.joinVoiceChannel({
    channelId: VoiceChannel.id,
		guildId: VoiceChannel.guild.id,
		adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
		selfDeaf: true,
  });

  const player = voiceDiscord.createAudioPlayer(ytdl(LIVE));
  const resource = voiceDiscord.createAudioResource(ytdl(LIVE));
  player.play(resource);
  connection.subscribe(player);  

});



setInterval(async function() {
  const VoiceChannel = client.channels.cache.get(CHANNEL);
  const connection = voiceDiscord.joinVoiceChannel({
    channelId: VoiceChannel.id,
		guildId: VoiceChannel.guild.id,
		adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
		selfDeaf: true,
  });

  const player = voiceDiscord.createAudioPlayer(ytdl(LIVE));
  const resource = voiceDiscord.createAudioResource(ytdl(LIVE));
  player.play(resource);
  connection.subscribe(player); 
}, 20000)

client.login(TOKEN).then(c => console.log(`NULL - Bot başarı ile açıldı.`)).catch(err => console.error(`NULL - Token problemi tokeni yenile lütfen.`));
