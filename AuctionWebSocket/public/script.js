// Initialize WebSocket connection to the server
const ws = new WebSocket('ws://localhost:3000');

// Elements from the DOM
const highestBidElement = document.getElementById('highest-bid').querySelector('span');
const highestBidderElement = document.getElementById('highest-bidder').querySelector('span');
const errorMessage = document.getElementById('error-message');

// Listen for WebSocket messages from the server
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    // Check if there's an error
    if (data.error) {
        errorMessage.textContent = data.error;
    } else {
        // Update the UI with the highest bid and bidder
        highestBidElement.textContent = `$${data.highestBid}`;
        highestBidderElement.textContent = data.highestBidder;
        errorMessage.textContent = ''; // Clear any previous error messages
    }
};

// Function to place a bid
function placeBid() {
    const name = document.getElementById('name').value;
    const bid = parseFloat(document.getElementById('bid').value);

    if (name && bid > 0) {
        // Send the bid to the server
        ws.send(JSON.stringify({ name, bid }));
    } else {
        errorMessage.textContent = 'Please enter a valid name and bid amount.';
    }
}
