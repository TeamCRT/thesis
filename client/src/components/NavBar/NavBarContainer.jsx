import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { Button, Menu, Header } from 'semantic-ui-react';
import Search from './Search.jsx'
import './NavBarContainer.css';

const HOME = 'http://127.0.0.1:3000';

class NavBarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  handleLogOut() { // eslint-disable-line
    axios.delete('/api/deleteSession');
    window.location.href = HOME;
  }
  render() {
    return (
      <Menu>
        <Menu.Item>
          <Search refreshFollowing={this.props.refreshFollowing} options={this.props.options} />
        </Menu.Item>
        <Header size="large" color="red" style={{fontFamily:'Bungee', fontSize:'50px', marginLeft:'11em'}} floated="right">mysong.io </Header>
        <Menu.Item name={this.props.username} position="right" />
        <Menu.Item>
          <Button onClick={this.handleLogOut}> Log Out </Button>
        </Menu.Item>
      </Menu>
    );
  }
};

export default NavBarContainer;
