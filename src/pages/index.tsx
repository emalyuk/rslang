import React, { FC } from "react";
import { Store } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";

interface RootProps {
  store: Store<any>;
}

const Root: FC = () => (
  //   <Provider store={store as any}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  //   </Provider>
);

export default Root;
