import React, { Component } from 'react'
import styles from './style.module.scss';
import { cx, getRandom } from '../../utils';

interface Props {
  number: number,
  style?: object,
  onClick: (number: number) => void,
  hide: boolean
}

interface State {
}

const fruits = {
  apple: (<div className={styles.apple} />),
  orange: (<div className={styles.orange} />),
  lemon: (<div className={styles.lemon} />),
  pear: (<div className={styles.pear} />),
  blueberry: (<div className={styles.blueberry} />),
  peach: (<div className={styles.peach} />),
  banana: (
    <>
      <div className={styles.banana} />
      <div className={styles.bananaLine} />
    </>
  ),
  strawberry: (
    <>
      <div className={styles.strawberry} />
      <div className={cx(styles.leafUp, styles.strawberryLeafUp)} />
      <div className={cx(styles.leafDown, styles.strawberryLeafDown)} />
    </>
  ),
  cherry: (
    <>
      <div className={cx(styles.cherry, styles.cherry1)} />
      <div className={cx(styles.cherry, styles.cherry2)} />
      <div className={cx(styles.cherryJoin)} />
    </>
  ),
  raspberry: (
    <>
      <div className={cx(styles.berry, styles.raspberry)} />
      <div className={cx(styles.berryBall, styles.berryBall1, styles.raspberryBall)} />
      <div className={cx(styles.berryBall, styles.berryBall2, styles.raspberryBall)} />
      <div className={cx(styles.berryBall, styles.berryBall3, styles.raspberryBall)} />
      <div className={cx(styles.berryBall, styles.berryBall4, styles.raspberryBall)} />
      <div className={cx(styles.berryBall, styles.berryBall5, styles.raspberryBall)} />
      <div className={cx(styles.berryBall, styles.berryBall6, styles.raspberryBall)} />
      <div className={cx(styles.berryBall, styles.berryBall7, styles.raspberryBall)} />
      <div className={cx(styles.berryBall, styles.berryBall8, styles.raspberryBall)} />
      <div className={cx(styles.leafUp, styles.raspberryLeafUp)} />
      <div className={cx(styles.leafDown, styles.raspberryLeafDown)} />
    </>
  ),
  blackberry: (
    <>
      <div className={cx(styles.berry, styles.blackberry)} />
      <div className={cx(styles.berryBall, styles.berryBall1, styles.blackberryBall)} />
      <div className={cx(styles.berryBall, styles.berryBall2, styles.blackberryBall)} />
      <div className={cx(styles.berryBall, styles.berryBall3, styles.blackberryBall)} />
      <div className={cx(styles.berryBall, styles.berryBall4, styles.blackberryBall)} />
      <div className={cx(styles.berryBall, styles.berryBall5, styles.blackberryBall)} />
      <div className={cx(styles.berryBall, styles.berryBall6, styles.blackberryBall)} />
      <div className={cx(styles.berryBall, styles.berryBall7, styles.blackberryBall)} />
      <div className={cx(styles.berryBall, styles.berryBall8, styles.blackberryBall)} />
      <div className={cx(styles.leafUp, styles.berryBall2, styles.raspberryLeafUp)} />
      <div className={cx(styles.leafDown, styles.raspberryLeafDown)} />
    </>
  )
};

function randomSize() {
  return styles[`size-${getRandom([1,2,3,4,5,6,7])}`];
}

function randomStyle() {
  const randomData = [-30, -20, -10, -5, 0, 5, 10, 20, 30];
  return {
    transform: `translate(${getRandom(randomData)}px, ${getRandom(randomData)}px) rotate(${getRandom(randomData)}deg)`
  };
}

const listFruit = Object.values(fruits);


class Number extends Component<Props, State> {
  randomStyle: object;
  randomSize: string;
  fruit: JSX.Element;

  constructor(props: Props) {
    super(props);

    this.hanldeSelect = this.hanldeSelect.bind(this);
    this.randomStyle = {}; //randomStyle();
    this.randomSize = randomSize();
    this.fruit = getRandom(listFruit);
  }
  state = {
  }

  componentDidMount() {
  }

  hanldeSelect() {
    const { onClick, number } = this.props;

    onClick(number);
  }

  render() {
    const { number, style, hide } = this.props;
    return (
      <div onClick={this.hanldeSelect} className={cx(styles.container, this.randomSize, hide && styles.hide)} style={{...style, ...this.randomStyle}}>
        <div className={styles.fruitItem}>
          {this.fruit}
        </div>
        <span className={styles.number}>{number}</span>
      </div>
    );
  }
}

export default Number;
