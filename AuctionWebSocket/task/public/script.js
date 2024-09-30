// יצירת חיבור WebSocket לשרת
const ws = new WebSocket('ws://localhost:3000');

// אלמנטים מה-DOM
const suggestionsList = document.getElementById('suggestions-list');
const errorMessage = document.getElementById('error-message');

// האזנה להודעות מהשרת
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    // עדכון רשימת ההצעות
    suggestionsList.innerHTML = '';
    data.suggestions.forEach(({ name, suggestion }) => {
        const li = document.createElement('li');
        li.textContent = `${name}: ${suggestion}`;
        suggestionsList.appendChild(li);
    });
};

// פונקציה לשליחת הצעה לשרת
function placeSuggestion() {
    const name = document.getElementById('name').value;
    const suggestion = document.getElementById('suggestion').value;

    if (name && suggestion) {
        // שליחת ההצעה לשרת
        ws.send(JSON.stringify({ name, suggestion }));
    } else {
        errorMessage.textContent = 'אנא מלא את כל השדות!';
    }
}
