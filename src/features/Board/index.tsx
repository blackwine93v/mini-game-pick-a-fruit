import React, { Component } from 'react';
import Number from '../../components/Number';
import styles from './style.module.scss';
import { getRandom, pickOneInList } from '../../utils';

interface Props {
  toNumber: number,
  onNextNumber: (currentNumber: number) => void
}
interface State {
  currentNumber: number,
  rangeEls: React.ReactNode[],
}

function getSize(numberOfItem: number) {
  const height = document.body.clientHeight;
  const width = document.body.clientWidth;
  const size = Math.min(height, width);
  const itemSize = size/(Math.sqrt(numberOfItem)) - 10;

  return {
    boardSize: size,
    itemSize
  };
}

function getSquareItems(numberOfItem: number) {
  return  Math.pow(Math.round(Math.sqrt(numberOfItem) + 2), 2);
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
    const numberItems = getSquareItems(toNumber);
    let remainEmptyBlock = numberItems - toNumber;
    for(let i = 1; i <= numberItems; i++) {
      if (getRandom([true, false]) && remainEmptyBlock > 0) {
        itemList.push(null);
        remainEmptyBlock--;
      } else {
        // get a number in list
        const number = this.pickANumber();
        itemList.push(number);
      }
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
    const { toNumber } = this.props;
    const { currentNumber, rangeEls } = this.state;
    const { boardSize } = getSize(getSquareItems(toNumber));
    const numberItems = getSquareItems(toNumber);
    const { itemSize } = getSize(numberItems);

    return (
      <div className={styles.container} style={{ width: boardSize, height: boardSize }}>
        {
          rangeEls.map((number: number, index: number) => (
            <div className={styles.item} key={`${number || 'pad'}-${index}`} style={{ width: itemSize, height: itemSize }}>
              { !!number && <Number hide={currentNumber >= number} onClick={this.handleClickNumber} number={number} style={{ width: itemSize, height: itemSize }} /> }
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
