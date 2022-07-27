import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import { StoreProvider } from "./store";
import HouseContextProvider from "store/context";
import { QueryClient, QueryClientProvider } from "react-query";
// import Spinner from "components/Spinner";
import reportWebVitals from "./reportWebVitals";

// const queryClient = new QueryClient({
//   defaultOptions: { queries: { suspense: true } },
// });

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <HouseContextProvider>
      <QueryClientProvider client={queryClient}>
          <App />
      </QueryClientProvider>
    </HouseContextProvider>
  </React.StrictMode>,

  document.getElementById("root")
);

// root.render(
//   <HouseContextProvider>
//     <QueryClientProvider client={queryClient}>
//       <React.StrictMode>
//         <App />
//       </React.StrictMode>
//     </QueryClientProvider>
//   </HouseContextProvider>
// );

// 0811970671 access bank

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
