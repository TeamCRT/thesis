import React, { Component } from 'react'
import { Button, Header, Modal, Grid, Input, Icon, Label } from 'semantic-ui-react'

class CurrentSongSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false
    }

    this.onItemMouseEnter = this.onItemMouseEnter.bind(this);
    this.onItemMouseLeave = this.onItemMouseLeave.bind(this);
    
  }



  onItemMouseEnter() {
    this.setState({
      hovering: true
    });
    
  }

  onItemMouseLeave() {
    this.setState({
      hovering: false
    })

  }

  
  render() {
    var color = this.state.hovering ? 'red' : '#575159';
    var cursor = this.state.hovering ? 'pointer' : 'default';
    
    return (
       <div id="song-selection" style={{display: 'flex', flexDirection: 'column', backgroundColor: '#eff0f2', width: '100%', height:'50%', alignItems: 'center'}}>
        <div id="song-selection-bar" style={{backgroundColor: 'black', width: '100%', minHeight: '43.32px', maxHeight: '43.32px', color: 'white', fontSize: '28px', textAlign: 'center', padding: '0.2em 0.5em'}}>MySong</div>
        <img style={{padding: '2em 0 0 0'}} src={this.props.selectedSong.trackImage300}/>
        <div style={{fontSize: '40px', padding: '.5em 0 0 0', textAlign: 'center'}}>{this.props.selectedSong.trackName}</div>
        <div style={{fontSize: '20px', padding: '5px .5px'}}>{this.props.selectedSong.trackArtist}</div>
       </div>
    )
  }
}

export default CurrentSongSelection;