import React, { Component } from 'react';
import './App.css';
import Tracks from './Tracks';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      recentlyPlayed: {},
      button: false
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        response.item.album.images[0] ? (
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              albumArt: response.item.album.images[0].url
            }
        })) : (
          this.setState({
            nowPlaying: {
              name: response.item.name,
              albumArt: null
            }
          })
        );
      })
  }

  getRecentlyPlayed() {
    spotifyApi.getMyRecentlyPlayedTracks()
      .then((response) => {
        console.log(response)
        this.setState({
          recentlyPlayed: response.items,
          buttPushed: true
        })
        
      })
  }
  render() {
    return (
      <div className="App">
      {console.log(this.state)}
        <a href='http://localhost:8888' > Login to Spotify </a>
        <div>
          Now Playing: { this.state.nowPlaying.name }
        </div>
        <div>
          <img alt="" src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
        </div>
        
        { this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        }
        { this.state.loggedIn &&
          <button onClick={() => this.getRecentlyPlayed()}>
            Check recently played
          </button>
        }
        { this.state.buttPushed &&

        <div>
          Played: {this.state.recentlyPlayed.map((playedItem) => {
            return <Tracks item={playedItem} key={playedItem.track.uri+playedItem.played_at} />
          })}
        </div>
        }
      </div>
    );
  }
}

export default App;