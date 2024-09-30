const express = require('express');
const WebSocket = require('ws');
const path = require('path');

// Set up Express app
const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Start HTTP server
const server = app.listen(port, () => {
    console.log(`Server running. Start Browsing on http://localhost:${port}/home.html`);
});

// Set up WebSocket server on top of HTTP server
const wss = new WebSocket.Server({ server });

// Auction state
let highestBid = 0;
let highestBidder = 'No bids yet';

// Broadcast the auction state to all connected clients
function broadcastBidUpdate() {
    const auctionState = JSON.stringify({
        highestBid,
        highestBidder
    });

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(auctionState);
        }
    });
}

// Handle WebSocket connections
wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.send(JSON.stringify({ highestBid, highestBidder }));

    // Handle incoming bids
    ws.on('message', (message) => {
        const { name, bid } = JSON.parse(message);

        // Check if the bid is higher than the current highest bid
        if (bid > highestBid) {
            highestBid = bid;
            highestBidder = name;
            broadcastBidUpdate(); // Broadcast the updated auction state
        } else {
            ws.send(JSON.stringify({ error: 'Your bid must be higher than the current bid!' }));
        }
    });

    // Handle connection close
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
