import React, { FC } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "pages/app/store";
import App from "./app/App";

const Root: FC = () => (
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

export default Root;
