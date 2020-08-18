import React, { Component } from 'react';
import Number from '../../components/Number';
import styles from './style.module.scss';
import { pickOneInList } from '../../utils';

interface Props {
  toNumber: number,
  onNextNumber: (currentNumber: number) => void
}
interface State {
  currentNumber: number,
  rangeEls: React.ReactNode[],
}

class Board extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.handleClickNumber = this.handleClickNumber.bind(this);
  }

  state = {
    currentNumber: 0,
    rangeEls: [],
  }

  componentDidMount() {
    this.setState({
      rangeEls: this.getRange(),
    });
  }

  componentDidUpdate(prevProps: Props) {
    const { toNumber: oldToNumber } = prevProps;
    const { toNumber } = this.props;

    if (toNumber !== oldToNumber) {
      this.pickANumber = pickOneInList(new Array(toNumber).fill(null).map((_, i) => i+1));
      this.setState({
        rangeEls: this.getRange(),
      });
    }
  }

  pickANumber = pickOneInList(new Array(this.props.toNumber).fill(null).map((_, i) => i+1));

  getRange() {
    const { toNumber } = this.props;
    const itemList = [];
    for(let i = 1; i <= toNumber; i++) {
      const number = this.pickANumber();
      itemList.push(number);
    }
    return itemList;
  }

  handleClickNumber(number: number) {
    const { currentNumber } = this.state;
    const { onNextNumber } = this.props;

    if (number === currentNumber + 1) { // valid
      this.setState({ currentNumber: number }); 

      onNextNumber(number);
    } else { // invalid

    }
  }

  render() {
    const { currentNumber, rangeEls } = this.state;

    return (
      <div className={styles.container}>
        {
          rangeEls.map((number: number, index: number) => (
            <div className={styles.item} key={`${number || 'pad'}-${index}`}>
              { !!number && <Number hide={currentNumber >= number} onClick={this.handleClickNumber} number={number} /> }
            </div>
          ))
        }
        {/* <span>{currentNumber}</span>
        <span>{remainTime}</span> */}
      </div>
    )
  }
}

export default Board;
