import React, { useState, Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from 'reactstrap';
import logo from './logo.svg';
import PathfindingAlgo from './PathfindingAlgo/PathfindingAlgo';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import './App.css';

class MyNavbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      navCollapsed: true,
      showNavbar: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const { navCollapsed } = this.state
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Pathfinder</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
            </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
              </DropdownItem>
                  <DropdownItem>
                    Option 2
              </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
              </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink href="https://github.com/daytonschuh/Pathfinder">GitHub</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

function App() {
  const isDesktop = useMediaQuery('(min-width:600px)');
  return (
    <div className="App">
      <MyNavbar></MyNavbar>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={{ borderRadius: '50%' }} />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
