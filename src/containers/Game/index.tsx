import React, { Component } from 'react'
import Board from '../../features/Board'
import StartScreen from '../../features/StartScreen'
import styles from './style.module.scss';
import { LEVELS } from '../../constant';
import { findLevel } from '../../utils';
import WonGame from '../../components/WonGame';
import LoseGame from '../../components/LoseGame';
import InfoPanel from '../../components/InfoPanel';

interface Props {
  
}
interface State {
  selectedLevel: string,
  isEndTime: boolean,
  isStartedGame: boolean,
  currentBoardNumber: number | null,
  remainTime: number | null,
}

export type GameStatus = 'playing' | 'won' | 'lose' | 'waiting';

class Game extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedLevel: LEVELS.fresher.id,
      isEndTime: false,
      isStartedGame: false,
      currentBoardNumber: null,
      remainTime: null,
    }

    this.handleChangeLevel = this.handleChangeLevel.bind(this);
    this.handleTimeEnd = this.handleTimeEnd.bind(this);
    this.onBoardNextNumber = this.onBoardNextNumber.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleTimerUpdate = this.handleTimerUpdate.bind(this);
  }

  get gameStatus() : GameStatus {
    const { isStartedGame } = this.state;
    const { isEndTime, currentBoardNumber } = this.state;

    if (isStartedGame) {
      if (!isEndTime) {
        if (currentBoardNumber === this.level.toNumber) {
          return 'won';
        } 
  
        return 'playing';
      }

      return 'lose';
    }

    return 'waiting';
  }

  get level() {
    const { selectedLevel } = this.state;
    return findLevel(selectedLevel);
  }
  
  handleChangeLevel(levelId: string) {
    this.setState({
      selectedLevel: levelId,
    });
  }

  handleTimeEnd() {
    this.setState({ isEndTime: true });
  }

  handleTimerUpdate(remainTime: number) {
    this.setState({ remainTime });
  }

  handleStartGame() {
    this.setState({ isStartedGame: true });
  }

  onBoardNextNumber(number: number) {
    this.setState({ currentBoardNumber: number });
  }

  render() {
    const { selectedLevel, currentBoardNumber, remainTime } = this.state;

    return (
      <div className={styles.container}>
        {
          this.gameStatus === 'waiting' && (
            <StartScreen
              gameStatus={this.gameStatus}
              level={selectedLevel}
              onChange={this.handleChangeLevel}
              onStartGame={this.handleStartGame}
            />
          )
        }
        <div className={styles.board}>
          {
            this.gameStatus === 'won' && <WonGame totalNumber={this.level.toNumber} remainTime={remainTime} currentBoardNumber={currentBoardNumber} />
          }

          {
            this.gameStatus === 'lose' && <LoseGame totalNumber={this.level.toNumber} currentBoardNumber={currentBoardNumber} />
          }

          {
            this.gameStatus === 'playing' && <Board toNumber={this.level.toNumber} onNextNumber={this.onBoardNextNumber} />
          }
        </div>
        {
          this.gameStatus === 'playing' && (
            <div className={styles.panel}>
              <InfoPanel time={this.level.time} onTimeEnd={this.handleTimeEnd} onTimerUpdate={this.handleTimerUpdate} />
            </div>
          )
        }
      </div>
    )
  }
}

export default Game;
