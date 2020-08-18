import React from 'react'
import Timer from '../../features/Timer'

interface Props {
  time: number,
  onTimeEnd: () => void,
  onTimerUpdate: (remainTimer: number) => void
}

const InfoPanel = ({ time, onTimeEnd, onTimerUpdate }: Props) => {
  return (
    <div>
      <Timer time={time} onEnd={onTimeEnd} onUpdateTime={onTimerUpdate} />
    </div>
  )
}

export default InfoPanel;
