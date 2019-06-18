/**
 * This module attempts to render Psyche to the document.
 * This can be used as an entry point while developing.
 */

import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";

import Psyche from "psyche/components/psyche";
import store from "psyche/store";

const root = document.createElement("div");
document.body.append(root);
ReactDom.render(
  <Provider store={store}>
    <Psyche />
  </Provider>,
  root
);
