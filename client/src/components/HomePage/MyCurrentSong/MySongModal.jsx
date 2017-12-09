import React, { Component } from 'react'
import { Popup, Button, Header, Image, Modal } from 'semantic-ui-react'
import axios from 'axios';
import $ from 'jquery';

class MySongModal extends Component {
	constructor(props) {
    super(props);
    this.state = {
      open: false,
      formData:'', 
      searchResults: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.addSearchResults = this.addSearchResults.bind(this);
  }
  //state = { open: false }

   handleChange(e) {
    //this.props.onMySongChange(e.target.value);
    e.preventDefault();
    var $element = $(e.target);
    console.log('button pressed ', $element.text());
    console.log('value attr is ', $element.attr('trackID'))
    var mySong = {
    	trackSummary: $element.text(),
    	trackID: $element.attr('trackID')
    }
    this.props.onMySongChange(mySong);
  }

   addSearchResults(searchResults) {
    this.setState({searchResults: searchResults});
  }

   handleFormSubmit(e) {
  	e.preventDefault();
  	console.log('Form was submitted!', this.state.formData);
  	var query = this.state.formData.split(' ').join('+');
  	var context = this;

  	 	$.ajax({
				type:'GET',
				url:`https://api.spotify.com/v1/search?q=${query}&type=track&market=US&limit=10&offset=5`,
				contentType:'application/json', 
				headers: {
                'Authorization': 'Bearer BQCxowIgaA6Smg96lNMKFRcOTKodiVIpJDHU4_CsEdPhOQv7K6yrjZfuiPif5meYGM2o3_s6zesDPXhYaA8MdQq07KHp41-c31_5KYrCDUXfMyrG1RObLR0iNDqgKCVIg4Q_3mZEbQnDPjeAPQ'
            },
				success:function(resp) {
					console.log('GET request successful', resp.tracks.items[0].name);
					var searchResults = [];
					for (var i = 0; i < resp.tracks.items.length; i++) {
						var result = {
							track_name: resp.tracks.items[i].name, 
							track_id: resp.tracks.items[i].href.split('tracks')[1].substr(1),
							track_artist: resp.tracks.items[i].artists[0].name, 
							track_summary: resp.tracks.items[i].name + ' by ' + resp.tracks.items[i].artists[0].name
					  }
					 searchResults.push(result);
					}
					context.addSearchResults(searchResults);
					console.log(context.state);
				}
			});
  }

  handleFormChange(e) {
  	e.preventDefault();
  	this.setState({formData: e.target.value});
  }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state

    return (
      <div>
        <Button onClick={this.show(true)}>Edit</Button>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Change your MySong</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <p>Pick a new MySong</p>
              <form onSubmit={this.handleFormSubmit} >
                <input type='text' value={this.state.formData} onChange={this.handleFormChange} ></input>
              	<input type='submit'></input>
              </form>
            </Modal.Description>
            <div>
    					{this.state.searchResults.map((result, index) => (
    					 <div>{index+1 + '. '}
      					<button onClick = {this.handleChange} trackID={result.track_id}>{result.track_summary}</button>
      				 </div>
    						))}
  					</div>
          </Modal.Content>
          <Modal.Actions>
            <Button positive icon='checkmark' labelPosition='right' content="OK" onClick={this.close} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default MySongModal