require('dotenv').config()
const {Client, IntentsBitField, EmbedBuilder }=require('discord.js')
const {askAI}=require("./utilities/askAI")

const client=new Client({
    intents:[
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        
    ],
});

client.on('ready', (c)=>{
    console.log(`${c.user.tag} is ready`)
})

client.on('messageCreate', async (message)=>{
    if(message.content==="!hello"){
        message.reply("hey there")
    }

    if(message.content==="!roll"){
        message.reply(`${Math.floor(Math.random() * 6)}`)
    }

    if(message.author.bot){
        return;
    }

    if(message.content.substring(0,6)==="!askai"){
        if(message.content.substring(6,8)!==" "){
            message.reply("please leave a space between your question and the command to ask your question")
            return;
        }
        const prompt=message.content.substring(7);
        const answer=await askAI(prompt);
        message.reply(answer); 
    }

    if(message.content==="!getusers"){
        const voiceChannel=message.member.voice.channel;
        if(!voiceChannel){
            message.reply('please join in voice channel')
        }
        users=voiceChannel.members.map((member)=>member.user.username);
        message.channel.send(`List of users in audio channel: ${users.join(', ')}`)
    }

    if (message.content === '!help') {
        const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('how can I help you')
            .addFields(
                { name: '!getusers', value: 'you can request a list of usernames of users on your voice channel' },
                { name: '!askai', value: 'You can ask a question by typing "!askai" and leaving a space' },
                { name: '!roll', value: 'you can roll the dice' },
            )
        message.channel.send({ embeds: [exampleEmbed] });
    }

})

client.login(process.env.DISCORD_TOKEN)