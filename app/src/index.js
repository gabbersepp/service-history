import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { createStore } from "redux";
import { reduce } from "./reducer/index";
import { Provider } from "react-redux";
import { setStore } from "./logic/GlobalStore";
import "./style/index.css";

const store = createStore(reduce);
setStore(store);

const e = document.getElementById("root");
if (!e) {
    let root = document.createElement('div');
    root.id = "root";
    document.body.appendChild( root );
}

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);