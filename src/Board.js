import { random } from 'lodash';

import React from 'react';
import Square from './Square'

let idCounter = 0

function getNewBoard() {
  return new Array(49).fill(1).map(getNewItem)
}

function getNewItem() {
  return {
    type: random(1, 7),
    id: ++idCounter
  }
}

function swap(arr, a, b) {
  let temp = arr[a]
  arr[a] = arr[b]
  arr[b] = temp
}

function findTriple(arr, startPoint) {
  let target = arr[startPoint].type,
    row = [], col = [],
    res = []

  let x = startPoint,
    xMin = (startPoint / 7 | 0) * 7,
    xMax = ((startPoint / 7 | 0) + 1) * 7 - 1
  while (x >= xMin && arr[x - 1]?.type === target) {
    x -= 1
  }
  while (x <= xMax && arr[x]?.type === target) {
    row.push(x++)
  }
  if (row.length >= 3) {
    res = res.concat(row)
  }

  let y = startPoint
  while (arr[y - 7]?.type === target) {
    y -= 7
  }
  while (arr[y]?.type === target) {
    col.push(y)
    y += 7
  }
  if (col.length >= 3) {
    res = res.concat(col)
  }

  return [...new Set(res)]
}

const boardArr = getNewBoard()

// console.log(boardArr)

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardArr: boardArr,
      selectedIndex: null
    };

  }

  clickHandler(index) {
    // 空格不处理
    if (this.state.boardArr[index].type === 0) return false

    let sIndex = this.state.selectedIndex

    console.log(index, sIndex, index - sIndex);
    if (sIndex) {
      if (index === sIndex) {
        // 取消选择
        this.setState({ selectedIndex: null })
        return
      }
      let distance = Math.abs(index - sIndex)
      if (distance === 7 || distance === 1) {
        // 是上下左右的相邻格子，可以交换
        let newBoardArr = [...this.state.boardArr]
        swap(newBoardArr, sIndex, index)
        this.setState({
          boardArr: newBoardArr,
          selectedIndex: null
        });
        setTimeout(() => {
          [index, sIndex].forEach(i => {
            let pos = findTriple(newBoardArr, i)
            console.log(pos);
            if (pos.length >= 3) {
              console.log(123);
              let newBoardArr = [...this.state.boardArr]
              pos.forEach(j => newBoardArr[j].type = 0)
              this.setState({
                boardArr: newBoardArr,
                selectedIndex: null
              });
            }
          })
        }, 500);
        return
      }
    }

    // 选中格子
    this.setState({ selectedIndex: index })
  }

  renderSquare(i, index) {
    return <Square
      type={i.type}
      index={index}
      on={index === this.state.selectedIndex}
      onClick={() => this.clickHandler(index)}

      key={i.id}
    />;
  }

  render() {
    return (
      <div className="container">
        {
          this.state.boardArr.map((item, index) => this.renderSquare(item, index))
        }
      </div>
    )
  }
}
