Application that connects to spotify api.

Instructions for use:
1. Create an app via the Spotify developer dashboard https://developer.spotify.com/dashboard/login
   The redirect URI should be http://localhost:8888/callback as this app is set up locally.
2. Once created make a note of the client id and secret id.
3. Clone this repository https://github.com/spotify/web-api-auth-examples.git 

        git clone https://github.com/spotify/web-api-auth-examples.git auth-server
        cd auth-server
        npm install

There are 3 different methods available here, this app uses authorization_code 
4. In authorization_code/app.js replace the variables client_id, client_secret and redirect_uri with those noted down from spotify.
5. Start up the server with 'node authorization_code/app.js' then open browser at localhost:8888 to check it is running. (Split terminal to keep listening and start new server)
6. The next step is to set up the react app. Come out of the auth-server folder and use create-react-app to install all the necessary files and dependencies.
        create-react-app client
        cd client
        npm install
        npm start
7. In client/src/App.js remove the content in the component and replace with localhost link
      render() {
  return (
    <div className='App'>
      <a href='http://localhost:8888'> Login to Spotify </a>
    </div>
  )
8. To set up so that when login is authorised it redirects back to our client app a change is needed in auth-server/authorisation_code/app.js. Find the very last 'red.redirect('/.#) to res.redirect(‘http://localhost:3000/#'
9. So that spotify knows what information is needed, find the declaration of scope variable in auth-server/authorization_code/app.js and add user-read-playback-state and user-read-recently-played
10. Restart server so that changes take effect.
11. In order to make API requests the app uses Jose M Perez's (spotify engineer) library that abstracts the process and makes life generally easier. 
    npm install --save spotify-web-api.js
and then in client/src/App.js import the class and instantiate a new variable to use the library.
    import SpotifyWebApi from 'spotify-web-api-js'
    const spotifyApi = new SpotifyWebApi();
12. The next step is to extract the token from the query-string and start making API requests. The App class in client/src/App.js uses the getHashParams() method taken from the spotify example and the token is assigned to an object in the constructor only if there is a query-string. Some initial state is also set.
13. GetNowPlaying and getRecenntlyPlayed() use promises to wait for the results of the API request and then set the state accordingly.
14. The render method provides the UI, in this case buttons that use the methods mentioned above and displays the results. 

Note that for the current song to display it is necessary to open spotify and play (then pause if you want) a song.

