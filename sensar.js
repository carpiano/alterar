
var myIP = "https://192.168.0.40:4430";
function log_axis(eje, valor) {
    var data = document.getElementById("axis-" + eje);
    data.innerText = valor;
}

var xValue = 0;

// Set up socket.io
const socket = io(myIP);
// Initialize a Feathers app
const app = feathers();

// Register socket.io to talk to our server
app.configure(feathers.socketio(socket));

// Form submission handler that sends a new message
function sendMessage() {
    const messageInput = document.getElementById('message-text');
    sendText(messageInput.value);
    messageInput.value = '';
}

async function sendText(text) {
    await app.service('messages').create({
        text: text
    });

}
const threshold = 0.099;

function updateGyro(value) {
    var diff = xValue - value;
    xValue = value;
    if (Math.abs(diff) > threshold) {
        sendText("diff: " + diff);
    }
}

// Renders a single message on the page
function addMessage(message) {
    document.getElementById('main').innerHTML += `<p>${message.text}</p>`;
}

const main = async () => {
    // Find all existing messages
    const messages = await app.service('messages').find();

    // Add existing messages to the list
    messages.forEach(addMessage);

    // Add any newly created message to the list in real-time
    app.service('messages').on('created', addMessage);

    try {
        let gyroscope = new Gyroscope({ frequency: 6 });

        gyroscope.addEventListener('reading', (e) => {
            updateGyro(gyroscope.x);
            //    log_axis("y", gyroscope.y);
            //     log_axis("z", gyroscope.z);
        });

        try { gyroscope.start(); } catch (error) { alert(error); }
    } catch (error) {
        alert("no hay giróscopo");
    }

};
main();