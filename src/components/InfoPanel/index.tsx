import React from 'react'
import Timer from '../../features/Timer'

interface Props {
  time: number,
  onTimeEnd: () => void
}

const InfoPanel = ({ time, onTimeEnd }: Props) => {
  return (
    <div>
      <Timer time={time} onEnd={onTimeEnd} />
    </div>
  )
}

export default InfoPanel;
