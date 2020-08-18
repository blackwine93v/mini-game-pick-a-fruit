import React, { ReactElement } from 'react'
import styles from './style.module.scss';

interface Props {
  currentBoardNumber: number | null,
  totalNumber: number | null,
}

export default function LoseGame({ currentBoardNumber, totalNumber }: Props): ReactElement {
  return (
    <div className={styles.container}>
      <span className={styles.label}>Hết thời gian</span>
      <span className={styles.info}>Trái cây: {currentBoardNumber || 0}/{totalNumber} trái</span>
    </div>
  )
}
