import { useReducer } from "react";
import "./style.css"
import DigitButton from "./digitButton";
import OperationButton from "./operationButton";


//actions
export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  CHOOSE_OPERATOR: "choose-operator",
  EVALUATE: "evaluate"
}


//reducer
function reducer(state, { type, payload }){
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrigth == true) return{
        ...state,
        currentNumber: payload.digit,
        overwrigth:false
      }
      if (payload.digit === '0' && state.currentNumber === '0'){
        return state 
      }
      if (payload.digit === '.' && state.currentNumber.includes(".") )
      {return state}
    return {
      ...state,
      currentNumber: `${state.currentNumber || " "}${payload.digit}`
    }
    case ACTIONS.CHOOSE_OPERATOR:
      if(state.currentNumber == null && state.previousNumber == null){
        return state}
      if(state.previousNumber == null){
        return{
          ...state,
          currentNumber: null,
          previousNumber: state.currentNumber,
          operator: payload.operator
        }  
      }
      if (state.currentNumber == null){
        return {
          ...state,
          currentNumber: null,
          previousNumber: state.previousNumber,
          operator: payload.operator
        }
      }

      return{
        ...state,
        previousNumber: evaluate(state),
        operator: payload.operator,
        currentNumber: null
      }
      

    case ACTIONS.CLEAR: 
    return {}

    case ACTIONS.DELETE_DIGIT:
     if(state.overwrigth == true){
      return {
        ...state,
        currentNumber: null,
        overwrigth: false
      }
     }
     if (state.currentNumber == null) return state
     if (state.currentNumber.length === 1 ) {
      return { ...state,
         currentNumber: 0}
    }
    return{
      ...state,
      currentNumber: state.currentNumber.slice(0,-1)
    }
     
    case ACTIONS.EVALUATE:
      if(state.operator == null || state.previousNumber == null || state.currentNumber == null){
        return state
      }
      return{
        ...state,
        overwrigth: true,
        currentNumber: evaluate(state),
        previousNumber:null,
        operator: null
      }

  }}


//functions

function evaluate({currentNumber,previousNumber,operator}) {
 const prev = parseFloat(previousNumber)
 const current = parseFloat(currentNumber)
  if(isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch(operator){
    case '+':
      computation = prev + current
      break
    case '-':
      computation = prev - current
      break
    case '/':
      computation = prev / current
      break
    case '*':
      computation = prev * current
}
return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

function FormatNumber(number){
  if (number == null) return 
  const [integer, decimal] = number.split('.')
  if(decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

//app
function App() {
  const [{currentNumber, previousNumber, operator}, dispatch] = useReducer(reducer, {});


  return (
    <div className="calculatorGrid">
      <div className="output">
        <div className="previous-number">{FormatNumber(previousNumber)} {operator}</div>
        <div className="current-number">{FormatNumber(currentNumber)}</div>
      </div>
      <button className="span-two" onClick={()=> dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button onClick={()=> dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationButton operator='/' dispatch={dispatch}/>
      <DigitButton digit='1' dispatch={dispatch}/>
      <DigitButton digit='2' dispatch={dispatch}/>
      <DigitButton digit='3' dispatch={dispatch}/>
      <OperationButton operator='*' dispatch={dispatch}/>
      <DigitButton digit='4' dispatch={dispatch}/>
      <DigitButton digit='5' dispatch={dispatch}/>
      <DigitButton digit='6' dispatch={dispatch}/>
      <OperationButton operator='+' dispatch={dispatch}/>
      <DigitButton digit='7' dispatch={dispatch}/>
      <DigitButton digit='8' dispatch={dispatch}/>
      <DigitButton digit='9' dispatch={dispatch}/>
      <OperationButton operator='-' dispatch={dispatch}/>
      <DigitButton digit='.' dispatch={dispatch}/>
      <DigitButton digit='0' dispatch={dispatch}/>
      <button  className='span-two' onClick={()=> dispatch({type: ACTIONS.EVALUATE})}>=</button>

    </div>
  );
}

export default App;
