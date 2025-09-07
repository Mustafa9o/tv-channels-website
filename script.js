// Sample channel data
const channels = [
    {
        id: 1,
        name: "Entertainment Central",
        category: "entertainment",
        logo: "EC",
        videoId: "jfKfPfyJRdk",
        description: "Your go-to channel for the latest in entertainment, celebrity news, and lifestyle shows."
    },
    {
        id: 2,
        name: "Sports Network",
        category: "sports",
        logo: "SN",
        videoId: "tgbNymZ7vqY",
        description: "24/7 sports coverage including live matches, analysis, and sports documentaries."
    },
    {
        id: 3,
        name: "Global News",
        category: "news",
        logo: "GN",
        videoId: "jNQXAC9IVRw",
        description: "Breaking news from around the world with in-depth reporting and analysis."
    },
    {
        id: 4,
        name: "Movie Mania",
        category: "movies",
        logo: "MM",
        videoId: "dQw4w9WgXcQ",
        description: "Blockbuster movies 24/7. From classics to the latest releases, we've got it all."
    },
    {
        id: 5,
        name: "Kids Universe",
        category: "kids",
        logo: "KU",
        videoId: "M7lc1UVf-VE",
        description: "Educational and entertaining content for children of all ages."
    },
    {
        id: 6,
        name: "Comedy Central",
        category: "entertainment",
        logo: "CC",
        videoId: "9bZkp7q19f0",
        description: "Non-stop laughter with the best comedy shows, stand-up specials, and movies."
    },
    {
        id: 7,
        name: "Extreme Sports",
        category: "sports",
        logo: "ES",
        videoId: "RgKAFK5djSk",
        description: "Adrenaline-pumping action from the world of extreme sports."
    },
    {
        id: 8,
        name: "Documentary Plus",
        category: "entertainment",
        logo: "DP",
        videoId: "hY7m5jjJ9mM",
        description: "Explore the world through captivating documentaries on nature, science, and history."
    },
    {
        id: 9,
        name: "Tech Today",
        category: "news",
        logo: "TT",
        videoId: "FkTWj5L-Xp0",
        description: "Latest technology news, reviews, and insights from the tech world."
    },
    {
        id: 10,
        name: "Classic Movies",
        category: "movies",
        logo: "CM",
        videoId: "oHg5SJYRHA0",
        description: "Relive the golden era of cinema with timeless classic movies."
    },
    {
        id: 11,
        name: "Cartoon Network",
        category: "kids",
        logo: "CN",
        videoId: "kJQP7kiw5Fk",
        description: "Favorite cartoons and animated series for kids and the young at heart."
    },
    {
        id: 12,
        name: "Music TV",
        category: "entertainment",
        logo: "MT",
        videoId: "ScMzIvxBSi4",
        description: "Non-stop music videos, concerts, and music documentaries."
    }
];

// Sample schedule data
const schedule = [
    { time: "08:00 AM", program: "Morning Show", description: "Start your day with news and entertainment" },
    { time: "10:00 AM", program: "Talk Show", description: "Celebrity interviews and discussions" },
    { time: "12:00 PM", program: "News Hour", description: "Latest news from around the world" },
    { time: "02:00 PM", program: "Movie Time", description: "Blockbuster movie presentation" },
    { time: "04:00 PM", program: "Kids Zone", description: "Fun and educational content for kids" },
    { time: "06:00 PM", program: "Evening News", description: "Comprehensive news coverage" },
    { time: "08:00 PM", program: "Prime Time", description: "Popular series and shows" },
    { time: "10:00 PM", program: "Late Night", description: "Comedy and entertainment" }
];

// DOM elements
const channelsGrid = document.getElementById('channelsGrid');
const scheduleList = document.getElementById('scheduleList');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const playerFrame = document.getElementById('playerFrame');
const currentChannelLogo = document.getElementById('currentChannelLogo');
const currentChannelName = document.getElementById('currentChannelName');
const currentChannelCategory = document.getElementById('currentChannelCategory');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const volumeBtn = document.getElementById('volumeBtn');
const settingsBtn = document.getElementById('settingsBtn');

// Current channel
let currentChannel = channels[0];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayChannels(channels);
    displaySchedule(schedule);
    
    // Filter button event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter channels
            const category = button.getAttribute('data-category');
            if (category === 'all') {
                displayChannels(channels);
            } else {
                const filtered = channels.filter(channel => channel.category === category);
                displayChannels(filtered);
            }
        });
    });

    // Search functionality
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filtered = channels.filter(channel => 
            channel.name.toLowerCase().includes(searchTerm) || 
            channel.description.toLowerCase().includes(searchTerm)
        );
        displayChannels(filtered);
    });

    // Player controls
    fullscreenBtn.addEventListener('click', () => {
        if (playerFrame.requestFullscreen) {
            playerFrame.requestFullscreen();
        } else if (playerFrame.webkitRequestFullscreen) { /* Safari */
            playerFrame.webkitRequestFullscreen();
        } else if (playerFrame.msRequestFullscreen) { /* IE11 */
            playerFrame.msRequestFullscreen();
        }
    });

    volumeBtn.addEventListener('click', () => {
        const icon = volumeBtn.querySelector('i');
        if (icon.classList.contains('fa-volume-up')) {
            icon.classList.remove('fa-volume-up');
            icon.classList.add('fa-volume-mute');
            playerFrame.muted = true;
        } else {
            icon.classList.remove('fa-volume-mute');
            icon.classList.add('fa-volume-up');
            playerFrame.muted = false;
        }
    });

    settingsBtn.addEventListener('click', () => {
        alert('Settings panel would open here in a real application');
    });
});

// Function to display channels
function displayChannels(channelsToDisplay) {
    channelsGrid.innerHTML = '';
    
    if (channelsToDisplay.length === 0) {
        channelsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem; font-size: 1.2rem;">No channels found. Try a different search or filter.</p>';
        return;
    }
    
    channelsToDisplay.forEach(channel => {
        const channelCard = document.createElement('div');
        channelCard.className = 'channel-card';
        if (channel.id === currentChannel.id) {
            channelCard.classList.add('active');
        }
        
        channelCard.innerHTML = `
            <div class="channel-preview">
                <img src="https://picsum.photos/seed/${channel.name}/300/200.jpg" alt="${channel.name}">
                <div class="channel-live">LIVE</div>
            </div>
            <div class="channel-card-content">
                <div class="channel-name">${channel.name}</div>
                <div class="channel-category">${channel.category.charAt(0).toUpperCase() + channel.category.slice(1)}</div>
            </div>
        `;
        
        channelCard.addEventListener('click', () => {
            // Update current channel
            currentChannel = channel;
            
            // Update player
            playerFrame.src = `https://www.youtube.com/embed/${channel.videoId}?autoplay=1&mute=1`;
            currentChannelLogo.textContent = channel.logo;
            currentChannelName.textContent = channel.name;
            currentChannelCategory.textContent = `${channel.category.charAt(0).toUpperCase() + channel.category.slice(1)} • Live Now`;
            
            // Update active card
            document.querySelectorAll('.channel-card').forEach(card => {
                card.classList.remove('active');
            });
            channelCard.classList.add('active');
            
            // Scroll to player
            document.querySelector('.video-player').scrollIntoView({ behavior: 'smooth' });
        });
        
        channelsGrid.appendChild(channelCard);
    });
}

// Function to display schedule
function displaySchedule(scheduleItems) {
    scheduleList.innerHTML = '';
    
    scheduleItems.forEach(item => {
        const scheduleItem = document.createElement('div');
        scheduleItem.className = 'schedule-item';
        scheduleItem.innerHTML = `
            <div class="schedule-time">${item.time}</div>
            <div class="schedule-program">${item.program}</div>
            <div class="schedule-description">${item.description}</div>
        `;
        scheduleList.appendChild(scheduleItem);
    });
}
