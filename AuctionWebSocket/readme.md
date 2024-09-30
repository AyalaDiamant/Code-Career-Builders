# Real-Time Auction System

This project is a real-time auction application built using **Node.js**, **Express**, and **WebSockets**. It allows multiple users to place bids on an auction in real-time, with all participants instantly receiving updates on the current highest bid and the highest bidder.

## Features

- Real-time bidding: Users can place bids, and updates are immediately broadcasted to all participants.
- WebSockets: The application leverages WebSocket technology for efficient, real-time bi-directional communication between the server and the clients.
- Simple, modern UI: The front-end provides a clean, easy-to-use interface for users to participate in the auction.
- Error handling: Users are notified when their bids are too low or invalid.

## Table of Contents

- Features
- Technologies Used
- Installation
- Usage
- Project Structure
- How to Browse
- Future Enhancements
- License

## Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **Express.js**: Web framework for routing and serving static files.
- **WebSockets (ws)**: For real-time, bi-directional communication.
- **HTML/CSS/JavaScript**: For building the user interface.

## Installation

To set up this project on your local machine, follow these instructions:

### Prerequisites

Make sure you have the following installed:

- **Node.js**: Install Node.js from https://nodejs.org if you don’t have it installed already.
- **npm**: npm comes with Node.js, so no separate installation is needed.

### Steps

1. **Clone the repository**:

   Open your terminal and clone this repository:

 ```bash
 git clone (https://github.com/MiriamNussbacher/AuctionWebSocket)
 
 ```
   Navigate to the project directory:
```bash
cd AuctionWebSocket
```

Install dependencies:
```bash
npm install
```
This will install:

express: To serve the application.
ws: To handle WebSocket connections.
## Run the server:

After the dependencies are installed, start the Node.js server:

```bash
node app.js
```

The server will start on http://localhost:3000.

## Open the application in your browser:

Go to your web browser and navigate to:

http://localhost:3000/home.html