import React, { Component } from 'react'
import { Button, Header, Modal, Grid, Input, Icon, Label } from 'semantic-ui-react'

class SearchResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false
    }

    this.onItemMouseEnter = this.onItemMouseEnter.bind(this);
    this.onItemMouseLeave = this.onItemMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
  	//console.log('SearchResults click now detected!!', this.props.result.track_name);
  	this.props.handleSongSelection(this.props.result);
  }

  render() {
    var color = this.state.hovering ? 'red' : '#575159';
    var cursor = this.state.hovering ? 'pointer' : 'default';
    
    return (
       <div onClick={this.handleClick} style={{backgroundColor: color, display: 'flex', flexDirection: 'row', width: '100%', minHeight: '64px', maxHeight: '64px'}}
       onMouseEnter={this.onItemMouseEnter}
       onMouseLeave={this.onItemMouseLeave}
       >
       	 <img src={this.props.result.track_image64} />
         <div style={{width: '47.8%', maxWidth: '47.8%', minWidth: '47.8%', borderRadius: '0px', fontSize: '15px', textAlign: 'center', padding: '1em 1em', color: 'white', backgroundColor: color, wordWrap: 'break-word', cursor: cursor}}>{this.props.result.track_name}</div>
         <div style={{width: '20%', maxWidth: '20%', minWidth: '20%', borderRadius: '0px', fontSize: '15px', textAlign: 'center', padding: '1em 1em', color: 'white', backgroundColor: color, wordWrap: 'break-word', cursor: cursor}}>{this.props.result.track_artist}</div>
         <div style={{width: '20%', maxWidth: '20%', minWidth: '20%', borderRadius: '0px', fontSize: '12px', textAlign: 'center', padding: '1em 1em', color: 'white', backgroundColor: color, wordWrap: 'break-word', cursor: cursor}}>{this.props.result.track_album}</div>
       </div>
    )
  }
}

export default SearchResult;