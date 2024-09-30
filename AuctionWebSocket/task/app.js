const express = require('express');
const WebSocket = require('ws');
const path = require('path');

// יצירת אפליקציית Express
const app = express();
const port = 3000;

// הגשה של קבצים סטטיים (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// התחלת שרת HTTP
const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/index.html`);
});

// יצירת WebSocket server מעל שרת ה-HTTP
const wss = new WebSocket.Server({ server });

// משתנה לשמירת ההצעות
let suggestions = [];

// פונקציה לשדר את כל ההצעות לכל המשתמשים
function broadcastSuggestions() {
    const data = JSON.stringify({ suggestions });
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}

// טיפול בחיבורים של WebSocket
wss.on('connection', (ws) => {
    console.log('New client connected');

    // שליחת כל ההצעות למשתמש החדש
    ws.send(JSON.stringify({ suggestions }));

    // טיפול בהודעות נכנסות (הצעות חדשות)
    ws.on('message', (message) => {
        const { name, suggestion } = JSON.parse(message);

        // הוספת ההצעה לרשימה
        suggestions.push({ name, suggestion });

        // שידור העדכונים לכל המשתמשים
        broadcastSuggestions();
    });

    // טיפול בניתוק המשתמש
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
