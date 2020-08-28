import React, {Component} from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from 'reactstrap';

export default class MyNavbar extends Component {
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
                  Algorithms
                </DropdownToggle>
                
                <DropdownMenu right>
                  <DropdownItem id="startDjikstra">
                    <div onClick={() => this.visualizeDijkstra()}>Visualize Djikstra</div>
                  </DropdownItem>
                  
                  <DropdownItem id="startAStar">
                    Visualize A*
                  </DropdownItem>

                  <DropdownItem id="startDStar">
                    Visualize D*
                  </DropdownItem>

                  <DropdownItem id="startBFS">
                    Visualize BFS
                  </DropdownItem>

                  <DropdownItem id="startDFS">
                    Visualize DFS
                  </DropdownItem>
                  
                  <DropdownItem divider />
                  <DropdownItem id="resetGrid">
                    <div onClick={this.resetGrid}>Reset</div>
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