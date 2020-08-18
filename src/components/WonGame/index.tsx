import React, { ReactElement } from 'react'
import styles from './style.module.scss';
import { totalPoint, cx } from '../../utils';

interface Props {
  currentBoardNumber: number | null,
  totalNumber: number | null,
  remainTime: number | null,
}

function renderPoint(point: number) {
return <span className={styles.point}>(+{point} điểm)</span>
}
export default function WonGame({ currentBoardNumber, remainTime, totalNumber }: Props): ReactElement {
  const fruitPoint = Number(currentBoardNumber) || 0;
  const timePoint = Number(remainTime) || 0;
  
  return (
    <div className={styles.container}>
      <span className={styles.label}>Hoàn thành<br/>xuất sắc</span>
      <span className={styles.info}>
        Trái cây: {currentBoardNumber || 0}/{totalNumber || 0} trái
        {renderPoint(fruitPoint)}
      </span>
      <span className={styles.info}>
        Thời gian còn dư: {remainTime || 0} giây
        {renderPoint(timePoint)}
      </span>
      <span className={cx(styles.info, styles.totalPoint)}>Tổng điểm: {totalPoint(fruitPoint, timePoint)} điểm</span>
    </div>
  )
}
