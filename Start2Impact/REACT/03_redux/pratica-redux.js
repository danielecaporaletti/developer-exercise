const redux = require('redux');

const createStore = redux.createStore;

//REDUCER (cambia ci che è dentro lo store)

const initialState = {
    counter: 1
}

const reducer = (state = initialState, action) => {
    return state;
}

//STORE
const store = createStore(reducer);
console.log(store.getState());



//DISPATCH ACTION

//SUBSCRIPTION