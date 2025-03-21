import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const ROUTES = [
  { path: "/opredelitel/", element: <App /> },
  { path: "/opredelitel/:blockId", element: <App /> },
  { path: "*", element: <div>Page not found</div> }, // Обработчик 404
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      {ROUTES.map(({ path, element }, index) => (
        <Route key={index} path={path} element={element} />
      ))}
    </Routes>
  </BrowserRouter>,
);
