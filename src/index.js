import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import reportWebVitals from "./reportWebVitals";

TimeAgo.addDefaultLocale(en)




const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,

  document.getElementById("root")
);
reportWebVitals();
