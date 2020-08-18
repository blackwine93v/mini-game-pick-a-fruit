import React, { Component } from 'react';

interface Props {
  time: number,
  onEnd?: () => void,
  onStart?: () => void
}
interface State {
  remainTime: number | null,
}

export default class Timer extends Component<Props, State> {
  timer: number | undefined;

  constructor(props: Props) {
    super(props);

    this.state = {
      remainTime: null,
    };
    this.timer = undefined;

    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(prevProps: Props) {
    const { time: oldTime } = prevProps;
    const { time } = this.props;

    if (time !== oldTime) {
      this.resetTimer();
    }
  }

  resetTimer() {
    this.setState({ remainTime: null }, () => {
      clearInterval(this.timer);
      this.timer = undefined;
      this.startTimer();
    });
  }

  startTimer() {
    const { onEnd, onStart, time } = this.props;

    if (typeof onStart === 'function') {
      onStart();
    }

    this.setState({ remainTime: time });

    this.timer = window.setInterval(() => {
      this.setState(({ remainTime }) => {
        const newRemainTime = (typeof remainTime === 'number' ? remainTime : time) - 1;

        if (newRemainTime === 0) {
          if (typeof onEnd === 'function') {
            onEnd();
          }

          clearInterval(this.timer);
          this.timer = undefined;
        }

        return { remainTime: newRemainTime };
      })
    }, 1000);
  }

  render() {
    const { remainTime } = this.state;
    return (
      <div>
        {remainTime}
      </div>
    )
  }
}
