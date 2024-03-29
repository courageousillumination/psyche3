/**
 * This module attempts to render Psyche to the document.
 * This can be used as an entry point while developing.
 */

import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

import PsycheRouter from "psyche/components/router";
import store from "psyche/store";
import { installServiceWorker } from "psyche/utils/worker";

const root = document.createElement("div");
root.setAttribute("style", "height: 100%");
document.body.append(root);

installServiceWorker();

ReactDom.render(
  <Provider store={store}>
    <HashRouter>
      <PsycheRouter />
    </HashRouter>
  </Provider>,
  root
);
