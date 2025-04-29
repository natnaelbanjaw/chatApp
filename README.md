# Chat Application with WebSockets

This is a real-time chat application built using **Node.js**, **Express**, and **Socket.IO**. The application allows multiple users to connect, send messages, and see real-time updates such as typing feedback and the total number of connected clients.

---

## Features

- **Real-Time Messaging**: Users can send and receive messages instantly.
- **Typing Feedback**: Displays a "user is typing" message when someone is typing.
- **Client Count**: Shows the total number of connected clients in real-time.
- **Audio Notification**: Plays a sound when a new message is received.
- **Responsive UI**: Messages are displayed in a chat-like interface with proper alignment for sent and received messages.

---

## Technologies Used

- **Backend**:
  - [Node.js](https://nodejs.org/): JavaScript runtime for the server.
  - [Express](https://expressjs.com/): Web framework for serving static files and handling HTTP requests.
  - [Socket.IO](https://socket.io/): Library for real-time, bidirectional communication between the server and clients.

- **Frontend**:
  - HTML, CSS, and JavaScript for the user interface.
  - [Moment.js](https://momentjs.com/) (optional): For formatting timestamps.

---

## Project Structure

```
c:\web-docs\web development\chat websocket\
├── app.js                  # Server-side code
├── public\                 # Static files served to the client
│   ├── index.html          # Main HTML file
│   ├── main.js             # Client-side JavaScript
│   ├── styles.css          # Optional CSS for styling
│   └── messageTone.mp3     # Audio file for message notifications
```

---

## Installation and Setup

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- A code editor like [Visual Studio Code](https://code.visualstudio.com/).

### Steps
1. Clone the repository or download the project files.
2. Navigate to the project directory:
   ```bash
   cd "c:\web-docs\web development\chat websocket"
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   node app.js
   ```
5. Open your browser and navigate to:
   ```
   http://localhost:4000
   ```

---

## How It Works

### Server-Side (`app.js`)
1. The server uses **Express** to serve static files from the public directory.
2. **Socket.IO** is initialized to handle WebSocket connections.
3. When a client connects:
   - The server logs the connection and updates the total client count.
   - The server listens for events like `message` and `feedback` from the client.
   - Messages are broadcast to all other connected clients.

### Client-Side (`public/main.js`)
1. The client connects to the server using **Socket.IO**.
2. Users can type messages and send them via a form.
3. The client listens for events like `chat-Message` and `feedback` to update the UI in real-time.
4. Feedback messages are displayed when a user is typing.

---

## Key Files

### app.js (Server-Side)
- Handles WebSocket connections and events.
- Emits real-time updates to all connected clients.
- Example:
  ```javascript
  io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);
      io.emit("clients-total", socketsConnected.size);

      socket.on("message", (data) => {
          socket.broadcast.emit("chat-Message", data);
      });

      socket.on("feedback", (data) => {
          socket.broadcast.emit("feedback", data);
      });
  });
  ```

### main.js (Client-Side)
- Manages the UI and WebSocket communication.
- Sends and receives events like `message` and `feedback`.
- Example:
  ```javascript
  socket.on("chat-Message", (data) => {
      addMessagetoUI(false, data);
  });

  messageInput.addEventListener("focus", () => {
      socket.emit("feedback", { feedback: `✍️ ${nameInput.value} is typing a message` });
  });
  ```

---

## Features in Detail

### 1. Real-Time Messaging
- Messages are sent using the `message` event.
- The server broadcasts the message to all other clients.

### 2. Typing Feedback
- When a user types, a "user is typing" message is displayed to other clients.
- This is handled using the `feedback` event.

### 3. Client Count
- The total number of connected clients is displayed in real-time.
- This is updated whenever a client connects or disconnects.

---

## Future Improvements
- Add user authentication for personalized chat sessions.
- Store chat history in a database (e.g., MongoDB).
- Enhance the UI with better styling and responsiveness.
- Add support for private messaging between users.

---

## Troubleshooting

### Common Issues
1. **Socket.IO Not Connecting**:
   - Ensure the server is running and accessible at `http://localhost:4000`.
   - Check the browser console for WebSocket connection errors.

2. **Feedback Not Displaying**:
   - Verify that the `message-feedback` class is correctly applied to feedback messages.
   - Ensure the `clearFeedback()` function is working as expected.

3. **Moment.js Errors**:
   - Include the Moment.js library in your `index.html` file if you're using it for date formatting.

---

## License
This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).

---

## Acknowledgments
- [Socket.IO Documentation](https://socket.io/docs/)
- [Express Documentation](https://expressjs.com/)
- [Moment.js Documentation](https://momentjs.com/docs/)
