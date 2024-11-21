// Import necessary modules from discord.js and ytdl-core
const { Client, GatewayIntentBits } = require('discord.js'); // Use GatewayIntentBits in v14+
const ytdl = require('ytdl-core'); // ytdl-core to download YouTube video information

// Create a new Discord client with the necessary intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildVoiceStates, 
    GatewayIntentBits.GuildMessages
  ]
});

// Event listener for when the bot is ready
client.once('ready', () => {
  console.log('Bot is ready!');
});

// Function to fetch YouTube video details using ytdl-core
async function fetchYouTubeVideoDetails(url) {
  try {
    // Fetch video details from YouTube using ytdl-core
    const info = await ytdl.getInfo(url);
    console.log('Video Title:', info.videoDetails.title);
    console.log('Video Description:', info.videoDetails.description);
    console.log('Video URL:', info.videoDetails.video_url);
    console.log('Author:', info.videoDetails.ownerChannelName);
    console.log('Publish Date:', info.videoDetails.publishDate);
    console.log('Views:', info.videoDetails.viewCount);
    console.log('Likes:', info.videoDetails.likes);
    console.log('Dislikes:', info.videoDetails.dislikes);
  } catch (error) {
    console.error('Error fetching video details:', error);
  }
}

// Example usage of fetching YouTube video details
const videoURL = 'https://www.youtube.com/watch?v=d2BJzwsnMSY'; // Replace with any valid YouTube URL
fetchYouTubeVideoDetails(videoURL);

// Log in to Discord (replace with your actual bot token)
client.login('MTE3NTMwMTgyNDI2NjM3MTEyMg.GFNJhH.Q1sP0acJcNDiKQks_ePGaYxLcKBTQIxi_U4B1c'); // Replace with your bot's actual token
