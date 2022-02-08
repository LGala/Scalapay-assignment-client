import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../src/reducers/rootReducer";

import { ErrorPage } from "./views/ErrorPage";
import CreateOrder from "./views/CreateOrder";
import ChooseItems from "./views/ChooseItems";
import { TopBar } from "./components/TopBar";

import "./styles/global.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const storex = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

render(
  <Provider store={storex}>
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<ChooseItems />} />
        <Route path="/create-order" element={<CreateOrder />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
