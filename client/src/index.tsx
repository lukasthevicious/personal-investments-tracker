import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

import { reducers } from "./state/reducers";
const store = createStore(reducers, compose(applyMiddleware(thunk)));

//Typescript + Redux requirements - from official documentation
//https://redux.js.org/tutorials/typescript-quick-start

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
