import React from 'react'
import ChooseLevel from '../ChooseLevel'
import styles from './style.module.scss';

interface Props {
  level: string,
  gameStatus: string,
  onChange: (levelId: string) => void,
  onStartGame: () => void
}

const Control = ({ level, onChange, onStartGame, gameStatus }: Props) => {
  return (
    <div className={styles.container}>
      <ChooseLevel value={level} onChange={onChange} />
      <button className={styles.startBtn} onClick={onStartGame}>Bắt đầu</button>
    </div>
  )
}

export default Control;
