import { Client, GatewayIntentBits } from 'discord.js';
import { DisTube } from 'distube';  // Import distube library

// Create a new instance of a Discord client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

// Create a new instance of DisTube without the 'leaveOnFinish' and 'searchSongs' options
const distube = new DisTube(client, {
    emitNewSongOnly: true,  // Emits events only for new songs
});

// Event when the bot is ready
client.once('ready', () => {
    console.log('HelloWorld bot is online!');
});

// Event for message creation (command handling)
client.on('messageCreate', async (message) => {
    if (!message.guild) return;  // Ignore non-guild messages
    if (message.author.bot) return;  // Ignore bot messages

    // Command parsing
    const args = message.content.slice('!'.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'play') {
        // If no song URL or query is provided
        if (args.length === 0) {
            return message.reply('Please provide a YouTube link or search query.');
        }

        const voiceChannel = message.member?.voice.channel;
        if (!voiceChannel) {
            return message.reply('You need to join a voice channel first!');
        }

        try {
            // Play the song
            distube.play(voiceChannel, args.join(' '), {
                textChannel: message.channel,  // Channel to send text responses to
                member: message.member,         // The member who requested the song
            });
            message.reply(`Now playing: **${args.join(' ')}**`);
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to play the song.');
        }
    }

    // Additional commands can be added here (like stop, skip, etc.)
});

// Event when a song is added to the queue
distube.on('playSong', (queue, song) => {
    console.log(`Now playing: ${song.name}`);
    queue.textChannel.send(`Now playing: **${song.name}**`);
});

// Event when a song finishes playing
distube.on('finish', (queue) => {
    queue.textChannel.send('Song has finished!');
});

// Event when an error occurs in the audio player
distube.on('error', (textChannel, error) => {
    console.error(error);
    textChannel.send('An error occurred while playing the song!');
});

// Log the bot into Discord with your token
client.login('MTE3NTMwMTgyNDI2NjM3MTEyMg.GFNJhH.Q1sP0acJcNDiKQks_ePGaYxLcKBTQIxi_U4B1c');
