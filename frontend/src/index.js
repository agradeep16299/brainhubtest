import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StateProvider } from "./StateProvider";
import reducer, { initialState } from "./reducer";
import { StoreProvider } from './Store';
ReactDOM.render(
  <React.StrictMode>
  <StoreProvider>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
