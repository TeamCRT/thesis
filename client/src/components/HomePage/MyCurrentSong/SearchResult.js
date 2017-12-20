import React, { Component } from 'react'
import { Button, Header, Modal, Grid, Input, Icon, Label } from 'semantic-ui-react'

class SearchResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false
    }

    this.onHandleClick = this.onHandleClick.bind(this);
    this.onItemMouseEnter = this.onItemMouseEnter.bind(this);
    this.onItemMouseLeave = this.onItemMouseLeave.bind(this);
  }

  onHandleClick() {
    this.props.handleMinusClick(this.props.result);
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
    var color = this.state.hovering ? 'red' : 'green';
    
    return (
       <div>
       {this.props.result.track_name + ' by ' + this.props.result.track_artist}
      </div>
    )
  }
}

export default SearchResult;