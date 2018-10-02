import throttle from "lodash/throttle";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
// middleware
import thunk from "redux-thunk";
import { loadState, saveState } from "./localStorage";
import audiosets from "./model/audiosets";

export default function create() {
  const initialState = loadState();

  const reducer = combineReducers({ audiosets });
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
  store.subscribe(
    throttle(() => {
      // saveState({
      //   todos: store.getState().todos
      // });
    }, 1000)
  );
  return store;
}
