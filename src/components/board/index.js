import React, { Component } from 'react';
import './index.css';
import Square from "../square";

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prevState: {},
            boardValues: ["\u00A0","\u00A0","\u00A0","\u00A0","\u00A0","\u00A0","\u00A0","\u00A0","\u00A0"],
            currentPlayer: "X",
            isZardoz: props.isZardoz,
            hasWinner: false,
            prevBoardValues: [],

        }
    }
    undo() {
        if (this.state.prevState) {
            this.setState(this.state.prevState);
            this.checkforWinner();
        }
        
    }
    toggleZardoz() {
        this.setState({
            isZardoz: this.state.isZardoz ? "":"zardoz"
        });
    }
    update(id){
        if (!this.state.hasWinner) {
            let newState = this.state.boardValues.slice(0);
            let newPlayer = this.state.currentPlayer === "X" ? "O" : "X";
            this.props.updatePlayer(newPlayer);
            if (newState[id] !== "\u00A0") {
                return false;
            }
            newState[id] = this.state.currentPlayer;
            this.setState(
                {
                    prevState: this.state,
                    boardValues: newState,
                    currentPlayer: newPlayer,
                },
                this.checkforWinner
            );
        }
        return false;
    }
    checkforWinner() {
        function isWinningLine(board,line) {
            if (board[line[0]] === board[line[1]] &&
                board[line[1]] === board[line[2]]){
                return true;
            }
            return false;   
        }
        var winningLines = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
        for (let i = 0;i<winningLines.length;i++) {
            if (isWinningLine(this.state.boardValues, winningLines[i]) &&
                this.state.boardValues[winningLines[i][0]] !== "\u00A0") {
                const winningPlayer = this.state.boardValues[winningLines[i][0]];
                this.setState({
                    hasWinner: winningPlayer
                });
                this.props.winningPlayer(winningPlayer);
                return true;
            }
        }
        this.setState({
            hasWinner: ""
        });
        return false;
    }
    render() {
        return (
            <div className="board ">
                {this.state.boardValues.map((val, i)=> {
                    return (
                    <Square key={i} 
                            onClick={() => {this.update(i)}} 
                            value={val}
                            isZardoz={this.state.isZardoz}>
                    </Square>);
                })
                }
                <button onClick={() => {this.undo()}}>undo</button>
                <button onClick={() => {this.toggleZardoz()}}>Toggle Zardoz</button>
            </div>
        )
    }
}
