import {ADD_TRANSACTIONS, DELETE_TRANSACTIONS} from './types.js';

export const addTransaction = ({id, title, price, category, type}) => (dispatch) => {
    const newTransaction = {
        id,
        title,
        category,
        price,
        type
    }

    dispatch({type: ADD_TRANSACTIONS, payload: newTransaction})
    // console.log(id, title, price, category, type)
}

export const deleteTransaction = (id) => (dispatch) => {

    dispatch({type: DELETE_TRANSACTIONS, payload: id})
}