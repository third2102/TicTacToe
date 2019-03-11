import React, { Component } from 'react';
// import logo from './logo.svg';
import Board from "./components/board";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePlayer: "X",
      winningPlayer: ""
    };
  }

  updateActivePlayer(newPlayer) {
    this.setState({
      activePlayer: newPlayer
    })
  }
  updateWinningPlayer(winningPlayer) {
    console.log(winningPlayer);
    this.setState({
      winningPlayer: winningPlayer
    })
  }
  render() {
    const playerText = this.state.winningPlayer ? 
                       `The winning player is ${this.state.winningPlayer}`:
                       `It is ${this.state.activePlayer}'s turn`;
    return (
      <div className="App">
        <div className="App_ActiveHeader">
          {playerText}
        </div>
        <Board updatePlayer={(newPlayer) => {this.updateActivePlayer(newPlayer)}}
               winningPlayer = {(winningPlayer) => {this.updateWinningPlayer(winningPlayer)}}
               isZardoz={""} />
      </div>
    );
  }
}

export default App;
