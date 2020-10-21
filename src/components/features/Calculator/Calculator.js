import React from 'react';

import styles from './Calculator.module.scss';

class Calculator extends React.Component {
  state = {
    numbers: [
      {id: 1, value: '1'},
      {id: 2, value: '2'},
      {id: 3, value: '3'},
      {id: 4, value: '4'},
      {id: 5, value: '5'},
      {id: 6, value: '6'},
      {id: 7, value: '7'},
      {id: 8, value: '8'},
      {id: 9, value: '9'},
      {id: 0, value: '0'},
      {id: 'enter', value: ' = '},
    ],
    marks: [
      {id: 1, value: ' + '},
      {id: 2, value: ' - '},
      {id: 3, value: ' * '},
      {id: 4, value: ' / '},
      {id: 5, value: ' ^( '},
      {id: 6, value: ' ^(1/ '},
    ],
    lastMark: true,
    placeholder: 0,
    calc: 0,
    value: '',
  }

  handleNumber (id, value) {
    if (id === 'enter') {
      this.setState({ value: '', placeholder: this.getCalc(), calc: 0,  lastMark: true});
    } else this.setState({ value: this.state.value + value, lastMark: false });
  }

  handleMark (id, value) {
    const { calc } = this.state;
    if (calc === 0) this.setState({ calc: id, value: this.state.value + value, lastMark: true });
    else this.handleNumber('enter', ' = ');
  }

  getCalc() {
    const { value, calc } = this.state;

    const numbers = value.split(' ');

    switch (calc) {
      case 1 :
        return `${Number(numbers[0]) + Number(numbers[2])}`;
      case 2: 
        return `${Number(numbers[0]) - Number(numbers[2])}`;
      case 3:
        return `${Number(numbers[0]) * Number(numbers[2])}`;
      case 4:
        return `${Number(numbers[0]) / Number(numbers[2])}`;
      case 5:
        return `${Math.pow(Number(numbers[0]), Number(numbers[2]))}`;
      case 6:
        return `${Math.pow(Number(numbers[0]), ( 1 / Number(numbers[2])))}`;
      default:
        return 'error';
    }
  }

  render () {
    const { numbers, marks, placeholder, lastMark, value } = this.state;
    return (
      <div className={styles.component}>
        <h1>Simple web calculator</h1>
        <input className={styles.input} type='text' value={value} placeholder={placeholder}/>
        <div className={styles.buttons}>
          <div className={styles.numbers}>
            {numbers.map(elem => (
              <button key={elem.id} onClick={() => this.handleNumber(elem.id, elem.value)}>{ elem.value }</button>
            ))}
          </div>
          <div className={styles.marks}>
            {marks.map(elem => (
              <button key={elem.id} onClick={() => {lastMark ? console.log('You need to pick some number') : this.handleMark(elem.id, elem.value);}} >{ elem.value }</button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;