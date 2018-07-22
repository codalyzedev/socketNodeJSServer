
# socketNodeJSServer

## Explanation for files
    * `server.js`: This starts your http server
    * `server-socket.js`: This starts your socket server and listens to notifications from client
    * `MessageHandler.js`: This file manages all users, sends back `locationChangeNotification` to client
    * `index.html`: Client side file which connects to socket and enables you to send commands to server via browser console. It listens to `connect`, `disconnect` and `locationChangeNotification` events from server

## Steps to run server
    * Ensure you have Node version > 8.4.0
    * Run `npm install`
    * Run `npm start`. This starts Nodejs server

## Steps to run client
    * Open `localhost:3000` on browser to open a new client page. Each page you open in a different tab is a new app connecting to server
    * When sending commands from client console to server, also watch the server terminal for logs

### Register User as `police` / `chor` each with unique userId
    * Now from one of the clients', browser console (Ctrl + Shift + I), send message `registerUser` to server. For registering as police, you send
      ```
        socket.emit('registerUser', {userId: 1, userRole: 'police'});
      ```
      Here your userId is 1 and your role is police

    * Similarly, open a different browser and register as `chor`.
      ```
        socket.emit('registerUser', {userId: 2, userRole: 'chor'});
      ```
      Note that you have a different userId for chor

### Change Location
    * From chor's browser, emit changelocation notification to server. Server will now search for all users who are police and notify them
      ```
        socket.emit('chorLocationChanged', {userId: 2, lat: 35, long: 122});
      ```

### Verify location change in police's browser
    * See the console logs of police browser, you would have received a notification saying
      ```
        If you are police, you received location change notification. {userId: 2, lat: 35, long: 122}
      ```
