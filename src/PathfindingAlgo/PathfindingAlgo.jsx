/* 

    Majority of current code base stemming from Clement Mihailescu's Pathfinding Visualizer Tutorial
    Repository: https://github.com/clementmihailescu/Pathfinding-Visualizer-Tutorial

    This code will eventually implement A*, D* and AnyAngle pathfinding algorithms. Edits may also include 
    major visual overhauls to more accurately depict the best path.

    Last updated: August 27, 2020 at 8:03 pm PST

*/

import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra, aStar, dStar, getNodesInShortestPathOrder } from '../pathfindingAlgos/dijkstraAlgorithm';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from 'reactstrap';

import './PathfindingAlgo.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            mouseIsPressed: false,
        };
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({ grid });
    }

    handleMouseDown(row, col) {
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid, mouseIsPressed: true });
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid });
    }

    handleMouseUp() {
        this.setState({ mouseIsPressed: false });
    }

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
            }, 10 * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-shortest-path';
            }, 50 * i);
        }
    }

    visualizeDijkstra() {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    visualizeAStar() {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    visualizeDStar() {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    visualizeBFS() {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    visualizeDFS() {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    resetGrid() {
        /* TODO: Stop any other current animation taking place... */

        const { grid } = this.state;
        const newGrid = grid;

        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 50; col++) {
                const node = newGrid[row][col];

                /* Set node values */
                const newNode = {
                    ...node,
                    isStart: row === START_NODE_ROW && col === START_NODE_COL,
                    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
                    distance: Infinity,
                    isVisited: false,
                    isWall: false,
                    previousNode: null,
                };
                newGrid[row][col] = newNode;

                /* Draw the nodes */
                setTimeout(() => {
                    if (!newNode.isStart && !newNode.isFinish) {
                        document.getElementById(`node-${newNode.row}-${newNode.col}`).className =
                            'node node-reset';
                    }
                    else if (newNode.isStart) {
                        document.getElementById(`node-${newNode.row}-${newNode.col}`).className =
                            'node node-start';
                    }
                    else {
                        document.getElementById(`node-${newNode.row}-${newNode.col}`).className =
                            'node node-finish';
                    }
                });
            }
        }

        /* Set our grid to the newly defined grid */
        this.setState({ grid: newGrid });
    }

    render() {
        const { grid, mouseIsPressed } = this.state;

        return (
            <>
                {/* Set up the navbar */}
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
                                            <div onClick={() => this.visualizeAStar()}>Visualize A*</div>
                                        </DropdownItem>

                                        <DropdownItem id="startDStar">
                                            <div onClick={() => this.visualizeDStar()}>Visualize D*</div>
                                        </DropdownItem>

                                        <DropdownItem id="startBFS">
                                            <div onClick={() => this.visualizeBFS()}>Visualize BFS</div>
                                        </DropdownItem>

                                        <DropdownItem id="startDFS">
                                            <div onClick={() => this.visualizeDFS()}>Visualize DFS</div>
                                        </DropdownItem>

                                        <DropdownItem divider />
                                        <DropdownItem id="resetGrid">
                                            <div onClick={() => this.resetGrid()}>Reset</div>
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

                {/* Render the grid */}
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const { row, col, isFinish, isStart, isWall } = node;
                                    {/* Update grid with proper node */ }
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            col={col}
                                            isFinish={isFinish}
                                            isStart={isStart}
                                            isWall={isWall}
                                            mouseIsPressed={mouseIsPressed}
                                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                            onMouseEnter={(row, col) =>
                                                this.handleMouseEnter(row, col)
                                            }
                                            onMouseUp={() => this.handleMouseUp()}
                                            row={row}></Node>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
}

// Initialize the grid
const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};

// Create the initial starting nodes
const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
};

// Toggle user drawing walls
const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    document.getElementById(`node-${node.row}-${node.col}`).className =
        'node node-wall';
    return newGrid;
};