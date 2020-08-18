import React, { Component } from 'react'
import { LEVELS } from '../../constant';
import { cx } from '../../utils';
import styles from './style.module.scss';

interface Props {
  onChange: (levelId: string) => void,
  value: string,
}
interface State {
  
}

class ChooseLevel extends Component<Props, State> {
  state = {}

  render() {
    const { onChange, value } = this.props;

    return (
      <div className={styles.container}>
        {
          Object.values(LEVELS).map(level => (
            <div key={level.id} className={cx(styles.levelBox, value === level.id && styles.active)} onClick={() => onChange(level.id)}>
              <div>
                <span className={styles.levelLabel}>Cấp độ</span>
                <span className={styles.levelName}>{level.name}</span>
              </div>
              <div className={styles.info}>
                <span className={styles.qty}>Số lượng: {level.toNumber}</span>
                <span className={styles.time}>Thời gian: {level.time}</span>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

export default ChooseLevel;
