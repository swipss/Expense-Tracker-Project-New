import { ADD_TRANSACTIONS } from "../actions/types";
import { DELETE_TRANSACTIONS } from "../actions/types";

const initialState = {
    transactions: [        
    ]
};

export default (state = initialState, {type, payload}) => {
    switch(type){
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [payload, ...state.transactions]
            }
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction.id != payload)
            }
        default:
            return state;
    }
}