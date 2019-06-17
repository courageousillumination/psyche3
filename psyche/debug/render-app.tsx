/**
 * This module attempts to render Psyche to the document.
 * This can be used as an entry point while developing.
 */

import React from "react";
import ReactDom from "react-dom";

import Psyche from "psyche/components/psyche";

const root = document.createElement("div");
document.body.append(root);
ReactDom.render(<Psyche />, root);
