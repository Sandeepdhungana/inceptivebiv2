import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./state/store.js";
import { Provider } from "react-redux";
import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from "@aws-amplify/ui-react";

import { Amplify } from "aws-amplify";

import "@aws-amplify/ui-react/styles.css";
import { awsConfig } from "./aws-exports.js";

Amplify.configure(awsConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  </Provider>
);
