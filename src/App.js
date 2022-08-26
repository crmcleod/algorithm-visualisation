import { useEffect, useState } from 'react';
import './App.css';
import StaticArray from './StaticArray.json'

function App() {

  const [newArray, setNewArray] = useState([...StaticArray])
  const [newArray2, setNewArray2] = useState([...StaticArray])
  // const [newArray3, setNewArray3] = useState([...StaticArray])
  const [sortSpeed, setSortSpeed] = useState(50)
  const [disabled, setDisabled] = useState(false)

  const [state, setState] = useState({
    array: [],
    swaps: 0,
    comparisons: 0,
    i: 0,
    j: 0,
    done: false,
    timer: null
  })

  const [selectionSortState, setSelectionState] = useState({
    array: [],
    swaps: 0,
    comparisons: 0,
    i: 0,
    j: 0,
    min: 0,
    done: false,
    timer: null
  })

  // const [insertionSort, setInsertionSort] = useState({
  //   array: [],
  //   swaps: 0,
  //   comparisons: 0,
  //   i: 0,
  //   j: 0,
  //   done: false,
  //   timer: null
  // })

  const handleClick = () => {
    let obj = {
      ...bubbleSortInit(newArray),
      "timer": setInterval(() => handleTimer(obj), sortSpeed)
    }
    setState({
      ...obj
    })
  }

  // const handleInsertionSortStart = () => {
  //   let obj = {
  //     ...insertionSortInit(newArray3),
  //     "timer": setInterval(() => handleTimer3(obj), sortSpeed)
  //   }
  //   setInsertionSort({ ...obj })
  // }

  const handleSelectionSort = () => {
    let obj = {
      ...selectionSortInit(newArray2),
      timer: setInterval(() => handleTimer2(), sortSpeed)

    }
    setSelectionState({
      ...obj
    })
    handleClick()
    setDisabled(true)
  }



  const handleTimer = (obj) => {
    setState((statex = obj) => {
      const newState = bubbleSortStep({ ...statex })
      if (newState?.done) {
        clearInterval(statex.timer)
      }
      return newState

    })
  }

  const handleTimer2 = (obj) => {
    setSelectionState((statex = obj) => {
      const newState = selectionSortStateStep({ ...statex })
      if (newState?.done) {
        clearInterval(statex.timer)
      }
      return newState
    })
  };

  // const handleTimer3 = (obj) => {
  //   setInsertionSort((statex = obj) => {
  //     const newState = insertionSortStep({ ...statex })
  //     if (newState?.done) {
  //       clearInterval(statex.timer)
  //     }
  //     return newState
  //   })
  // }

  const bubbleSortInit = (array) => {
    return {
      array,
      swaps: 0,
      comparisons: 0,
      i: array.length - 1,
      j: 0,
      done: false
    }
  }

  const selectionSortInit = (array) => {
    return {
      array,
      swaps: 0,
      comparisons: 0,
      i: array.length - 1,
      j: 0,
      done: false,
      min: null
    }
  }

  // const insertionSortInit = (array) => {
  //   return {
  //     array,
  //     swaps: 0,
  //     comparisons: 0,
  //     i: 0,
  //     j: 0,
  //     done: false,
  //     min: null
  //   }
  // }



  const selectionSortStateStep = (state) => {
    let min;
    let { array, swaps, comparisons, i, j, timer } = state;

    if (i <= 0) {
      clearInterval(state.timer)
      return {
        done: true,
        comparisons
      }
    } else
      if (!state?.done && array?.[j]) {
        min = i;
        if ((array[j].val > array[min].val)) {
          min = j
        }
        if (min != i) {
          let swap1 = array[i]
          let swap2 = array[j]

          array[i] = swap2
          array[j] = swap1

        }
      }
    comparisons++
    if (++j >= i) {
      i--
      j = 0;
    }
    return {
      array, swaps, comparisons, i, j, timer, min
    }
  }
  const bubbleSortStep = (statex) => {
    let { array, swaps, comparisons, i, j, timer } = statex;

    if (i <= 0) {
      clearInterval(statex.timer)
      return {
        done: true,
        comparisons
      }
    } else
      if (!statex.done) {

        if ((array?.[j]?.val > array?.[j + 1]?.val)) {
          let temp = array[j]
          array[j] = array[j + 1]
          array[j + 1] = temp
          swaps++
        }
        comparisons++
        if (++j >= i) {
          i--
          j = 0;
        }
        return {
          array, swaps, comparisons, i, j, timer
        }
      }

  }

  // const insertionSortStep = (statex) => {
  //   let { array, swaps, comparisons, i, j, timer } = statex;
  //   // if (i >= array.length-1) {
  //   //   clearInterval(timer)
  //   //   return {
  //   //     done: true,
  //   //     comparisons
  //   //   }
  //   if (false ){return
  //   } else
  //   if(!statex.done) {
  //     if((array?.[j]?.val < array?.[j+1]?.val )) {
  //       j++
  //       // i++

  //       console.log('less', j, i)
  //     } else if(
  //       array?.[j]?.val > array?.[j+1]?.val
  //     ){
  //       let swap1 = array[j]
  //       let swap2 = array[j + 1]

  //       array[j] = swap2
  //       array[j + 1] = swap1
  //       console.log('greater', j, i)
  //       j--
  //       // i--
  //     } else {
  //       console.log('else' , array[j], array[i])
  //       // i--
  //       j--
  //     }
  //   }
  //   comparisons++
  //   // if(++j >= i) {
  //   //   i--
  //   //   j=0;
  //   // }
  //   return {
  //     array,swaps, comparisons, i, j, timer
  //   }
  // }

  return (
    <>
      <div className="App" >
        <div id='bubble-sort'
        >
          <h2>BUBBLE SORT</h2>
          {newArray.map((x, i) => {
            return (
              <div key={x.val} style={{
                display: 'flex',
                height: x.val / 2 + 'px',
                width: 95 / (50 + 0.4) + 'vw',
                borderRadius: '0.15rem',
                margin: 'auto 0.1rem',
                backgroundColor: 'rgb(' + x.r + ',' + x.g + ',' + (x.val) + ')',
                boxShadow: '0rem 0rem 0.6rem 0.01rem rgba(0,0,0, 0.5)',
                transform: (i === state.j || i === state.j + 1) && 'scale(1.2)',
                transition: 'all 1s',
                filter: 'hue-rotate(300deg)',
              }} />
            )
          })}
        </div>
        <div id='selection-sort'>
          <h2>SELECTION SORT</h2>
          {newArray2.map((x, i) => {
            return (
              <div key={x.val} style={{
                display: 'flex',
                height: x.val / 2 + 'px',
                width: 195 / (50 + 0.4) + 'vw',
                borderRadius: '0.15rem',
                margin: 'auto 0.1rem',
                backgroundColor: 'rgba(' + x.r + ',' + x.g + ',' + (x.val) + ')',
                boxShadow: '0rem 0rem 0.6rem 0.01rem rgba(0,0,0, 0.5)',
                transform: (i === selectionSortState.min || i === selectionSortState.j) && 'scale(1.2)',
                filter: 'hue-rotate(60deg)',
                transition: 'all 0.4s'
              }} />
            )
          })}
        </div>
        {/* <div id='selection-sort'>
          <h2>SELECTION SORT</h2>
          {newArray3.map((x, i) => {
            return (
              <div key={x?.val} style={{
                display: 'flex',
                height: x?.val / 2 + 'px',
                width: 195 / (50 + 0.4) + 'vw',
                borderRadius: '0.15rem',
                margin: 'auto 0.1rem',
                backgroundColor: 'rgba(' + x?.r + ',' + x?.g + ',' + (x?.val) + ')',
                boxShadow: '0rem 0rem 0.6rem 0.01rem rgba(0,0,0, 0.5)',
                // transform: (i === insertionSort.i || i === insertionSort.j) && 'scale(1.4)',
                filter: 'hue-rotate(200deg)',
                transition: 'all 0.4s'
              }} />
            )
          })}
        </div> */}
      </div>
      <div style={{display: 'flex', flexDirection: 'column', margin: 'auto', width: '50vw'}}>

        <button disabled={disabled} onClick={handleSelectionSort} style={{padding: '0.2rem', borderRadius: '0.3rem', color: 'white', 'backgroundColor': 'purple'}}>
          SORT IT OUT, MATE!
        </button>
        <span>

          Faster
          <input disabled={disabled} type={'range'} min={5} max={250} step={5} value={sortSpeed} onChange={(e) => { setSortSpeed(e.target.value) }} />
          Slower
        </span>
      </div>
    </>
  );
}

export default App;
