import reducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// convert object to string and store in sessionStorage
function saveToSessionStorage(state) {
  try {
    const serialisedState = JSON.stringify(state);
    sessionStorage.setItem("persistantState", serialisedState);
  } catch (err) {
    console.error(err);
  }
}

// load string from sessionStarage and convert into an Object
// invalid output must be undefined
function loadFromSessionStorage() {
  try {
    const serialisedState = sessionStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (error) {
    return undefined;
  }
}

// create our store from our rootReducers and use loadFromsessionStorage
// to overwrite any values that we already have saved
const store = createStore(
  reducer,
  loadFromSessionStorage(),
  applyMiddleware(thunk)
);

// listen for store changes and use saveToSessionStorage to
// save them to sessionStorage
store.subscribe(() => saveToSessionStorage(store.getState()));

export default store;
