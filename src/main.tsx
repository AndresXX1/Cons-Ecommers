import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { googleIdClient } from "./config";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={googleIdClient}>
        <App />
        <ToastContainer />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </Provider>
);
