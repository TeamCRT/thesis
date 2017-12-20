import React, { Component } from 'react'
import { Button, Header, Modal, Grid, Input, Icon, Label } from 'semantic-ui-react'

class SelectedSong extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false
    }
  }

  onListItemMouseEnter() {
    this.setState({
      hovering: true
    });
  }

  onListItemMouseLeave() {
    this.setState({
      hovering: false
    })
  }

  render() {
    var style = {
      fontWeight: this.state.hovering ? 'bold' : 'normal'
    };

    return (
        <div style={{fontSize: '15px', wordWrap: 'break-word', padding: '5px', maxHeight: '500px',
                    overflow: 'scroll', overflowX: 'hidden'}}>
                   <Label style={{ borderRadius: '0px', width: '80%', textAlign: 'center'}} color='blue'>
                    {this.props.mySongUsername + '\'s MySong'}
                    <Icon
                      key='hello'
                      style={{ display: 'inline-block', float: 'right' }}
                      size="large"
                      name="minus"
                      color='green'
                    />
                   </Label>
                   <Label style={{ borderRadius: '0px', width: '80%', textAlign: 'center' }} color="yellow">
                    {this.props.trackSummary}
                   </Label>
      </div>
    )
  }
}

export default SelectedSong;