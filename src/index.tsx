import React from "react";
import "./styles/tailwind.css";
import "./styles/color.css";
import "./styles/font.css";
import { render } from "react-dom";
import { HistoryRouter } from 'react-router-dom';
import Router from './Router';
import customBrowserHistory from "Util/customBrowserHistory";
import "./styles/index.css";

document.addEventListener('DOMContentLoaded', () => {
  render(
    (
      <React.StrictMode>
        <HistoryRouter history={customBrowserHistory} >
          <Router />
        </HistoryRouter>
      </React.StrictMode>
    ),
    document.getElementById('root') as HTMLElement,
  );
});


if (module.hot) module.hot.accept();
