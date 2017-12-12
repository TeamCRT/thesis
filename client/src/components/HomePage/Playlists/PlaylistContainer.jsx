import React from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import PlaylistEntry from './PlaylistEntry';
import CreatePlaylistModal from './CreatePlaylistModal';

class PlaylistContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
    };

    axios.get(`/api/playlists?spotifyUserID=${props.spotifyId}`)
      .then((response) => {
        this.setState({ playlists: response.data[0].playlists });
        return response;
      })
      .catch(err => err);
  }

  mapFunction(playlistObj) {
    return (
      <PlaylistEntry
        name={playlistObj.playlistName}
        key={playlistObj.spotifyPlaylistID}
        spotifyPlaylistID={playlistObj.spotifyPlaylistID}
        spotifyPlaylistURI={playlistObj.spotifyPlaylistURI}
        clickHandler={this.props.clickHandler}
      />
    );
  }

  render() {
    return (
      <div>
        {this.state.playlists[0] &&
          <div>
            <Button.Group vertical style={{ width: '100%' }}>
              <Button disabled >My Playlists</Button>
              {this.state.playlists.map(this.mapFunction.bind(this))}
              <CreatePlaylistModal spotifyId={this.props.spotifyId} color="red"/>
            </Button.Group>
          </div>
        }
      </div>
    );
  }
}

export default PlaylistContainer;
