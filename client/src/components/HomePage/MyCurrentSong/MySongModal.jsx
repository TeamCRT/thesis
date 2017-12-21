import React, { Component } from 'react'
import { Button, Modal, Header, Input } from 'semantic-ui-react'
import axios from 'axios';
import $ from 'jquery';
import SearchResults from './SearchResults'
import CurrentSongSelection from './CurrentSongSelection'
import CurrentSongNote from './CurrentSongNote'

class MySongModal extends Component {
	constructor(props) {
    super(props);
    this.state = {
      open: false,
      formData:'',
      noteData: '',
      searchResults: [],
      showNote: false,
      trackSummary:'',
      trackID:'',
      trackAlbum:'',
      trackArist: '',
      trackName: '',
      trackImage64: '',
      trackImage300:'',
      note:'',
      showError: false,
      noSongSelectedError: false,
      noNoteError: false,
      noteTooLongError: false,
      songSearchValue: '',
      selectedSong: {
        trackName: '',
        trackArtist: '',
        trackImage300: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.addSearchResults = this.addSearchResults.bind(this);
    this.handleCancel= this.handleCancel.bind(this);
    this.handleSave= this.handleSave.bind(this);

    this.handleSongSearch = this.handleSongSearch.bind(this);
    this.handleSongSubmit = this.handleSongSubmit.bind(this);
    this.dataFormat = this.dataFormat.bind(this);
    this.handleSongSelection = this.handleSongSelection.bind(this);
  }

   handleChange(e) {
    e.preventDefault();
    var $element = $(e.target);
    this.setState({
      trackSummary: $element.text(),
      trackID: $element.attr('track_id'),
      trackAlbum: $element.attr('track_album'),
      trackArtist: $element.attr('track_artist'),
      trackName: $element.attr('track_name')
    });
  }

   addSearchResults(searchResults) {
    this.setState({searchResults: searchResults});
  }

   handleFormSubmit(e) {
  	e.preventDefault();
  	this.setState({showNote:true});
  	var query = this.state.formData.split(' ').join('+');
  	var context = this;
    var spotifyToken = this.props.spotifyToken;

     axios({
          method: 'GET',
          url: `/api/spotifyAPI/search?track=${query}`,
        })
          .then((response) => {
            var resp = response.data;
            context.setState({
              showError: resp.tracks.items.length !== 0 ? false : true
            });
            var searchResults = [];
            for (var i = 0; i < resp.tracks.items.length; i++) {
              var result = {
                track_name: resp.tracks.items[i].name,
                track_id: resp.tracks.items[i].href.split('tracks')[1].substr(1),
                track_artist: resp.tracks.items[i].artists[0].name,
                track_album: resp.tracks.items[i].album.name,
                track_summary: resp.tracks.items[i].name + ' by ' + resp.tracks.items[i].artists[0].name
              }
              searchResults.push(result);
            }
            context.addSearchResults(searchResults);
          })
          .catch(err => console.error(err, err));
  }

  handleFormChange(e) {
  	e.preventDefault();
  	this.setState({formData: e.target.value});
  }

  handleNoteChange(e) {
  	e.preventDefault();
  	this.setState({noteData: e.target.value});
  }

  show = dimmer => () => this.setState({ dimmer, open: true })
  handleSave () {
    if (this.state.trackName === '' && this.state.noteData === '') {
      this.setState({noSongSelectedError :true});
      this.setState({noNoteError: true});
      return;
    }

    if (this.state.trackName === '') {
      this.setState({noSongSelectedError: true});
      this.setState({noNoteError :false});
      return;
    }

    if (this.state.noteData === '') {
      this.setState({noNoteError :true});
      this.setState({noSongSelectedError: false});
      return;
    }

    if (this.state.noteData.length > 180) {
      this.setState({noteTooLongError: true});
      this.setState({noNoteError :false});
      this.setState({noSongSelectedError: false});
      return;
    }

    if (this.state.noteData !== '' && this.state.trackName !== '' && this.state.noteData.length <= 180 ) {
      this.setState({noNoteError :false});
      this.setState({noSongSelectedError: false});
      this.setState({noteTooLongError: false});

      var mySong = {
        trackSummary: this.state.trackSummary,
        trackID: this.state.trackID,
        trackAlbum: this.state.trackAlbum,
        trackName: this.state.trackName,
        trackArtist: this.state.trackArtist,
        note: this.state.noteData,
      };
      var mySongPayload = {
        mySong: mySong,
        spotifyId: this.props.spotifyId,
      }

      axios.post('/api/currentmysong', mySongPayload)
        .then((response) => {
            this.props.onMySongChange(mySongPayload.mySong);
        })
        .catch((err) => {
          throw err;
        });


    }
    this.setState({ open: false });
  }

  handleCancel = () => {
    this.setState({noNoteError :false});
    this.setState({noSongSelectedError: false});
    this.setState({noteTooLongError: false});
    this.setState({ open: false });
  };

  handleSongSearch(e) {
    e.preventDefault();
    this.setState({songSearchValue: e.target.value});
    
  }

  dataFormat(input) {
    var output = input.length > 90 ? input.substring(0,50) + '...' : input;
    return output;
  }

  handleSongSelection(song) {
    // this.setState({trackName: song.track_name,
    //   trackArtist: song.track_artist, 
    //   trackAlbum: song.track_album, 
    //   trackID: song.track_id, 
    //   trackSummary: song.track_summary, 
    //   trackImage64: song.track_image64,
    //   trackImage300: song.track_image300
    // });
    var selectedSong = {
      trackName: song.track_name,
      trackArtist: song.track_artist, 
      trackImage300: song.track_image300
    };

    this.setState({selectedSong: selectedSong});
    
  }

  handleSongSubmit() {
    console.log('Submit button pressed!');
    console.log(this.state.songSearchValue);
    var query = this.state.songSearchValue.split(' ').join('+');
    var context = this;
    var spotifyToken = this.props.spotifyToken;

     axios({
          method: 'GET',
          url: `/api/spotifyAPI/search?track=${query}`,
        })
          .then((response) => {
            var resp = response.data;
            context.setState({
              //showError: resp.tracks.items.length !== 0 ? false : true
            });
            var searchResults = [];
            for (var i = 0; i < resp.tracks.items.length; i++) {
              var result = {
                track_name: this.dataFormat(resp.tracks.items[i].name),
                track_id: resp.tracks.items[i].href.split('tracks')[1].substr(1),
                track_artist: this.dataFormat(resp.tracks.items[i].artists[0].name),
                track_album: this.dataFormat(resp.tracks.items[i].album.name),
                track_summary: resp.tracks.items[i].name + ' by ' + resp.tracks.items[i].artists[0].name,
                track_image64: resp.tracks.items[i].album.images[2].url,
                track_image300: resp.tracks.items[i].album.images[1].url

              }
              searchResults.push(result);
            }
            //context.addSearchResults(searchResults);
            this.setState({searchResults: searchResults});
            console.log('Search results from handleSongSubmit are', this.state.searchResults);

          })
          .catch(err => console.error(err, err));

  }

  render() {
    const { open, dimmer } = this.state

    return (
      <div style={{textAlign:'center'}}>
        <Button onClick={this.show(true)}>Edit your current MySong</Button>
        <Modal size='large'dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Change your MySong</Modal.Header>

          <div id="maincontainer"style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
  
            <div id="top-half" style={{backgroundColor: 'white', width: '1080px', height:'100px'}}>
                <Input type='text' placeholder='Search for songs...' action onChange={this.handleSongSearch}>
                  <input />
                  <Button onClick={this.handleSongSubmit} type='submit'>Search</Button>
                </Input> 
            </div>

            
            <div id="bottom-half" style={{backgroundColor: 'black', display: 'flex', flexDirection: 'row', width: '1080px', height:'1000px'}}>
              <SearchResults handleSongSelection={this.handleSongSelection} searchResults={this.state.searchResults} />
              <div id="bottom-right" style={{backgroundColor: 'green', display: 'flex', flexDirection: 'column', width: '50%', height:'100%'}}>
                <CurrentSongSelection selectedSong={this.state.selectedSong} />
                <CurrentSongNote />
              </div>
                
            </div>




          </div>
          <Modal.Actions>
            <Button color='black' onClick={this.handleCancel}>Cancel</Button>
            <Button positive icon='checkmark' labelPosition='right' content="OK" onClick={this.handleSave} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default MySongModal
