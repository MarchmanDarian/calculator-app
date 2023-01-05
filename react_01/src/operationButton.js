import { ACTIONS } from "./App";

export default function OperationButton({dispatch,  operator} ){
    return (
    <button onClick={()=> dispatch({type: ACTIONS.CHOOSE_OPERATOR, payload: { operator }  })}>
    { operator }
    </button>
)}