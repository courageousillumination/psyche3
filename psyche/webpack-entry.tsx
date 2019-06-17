import React from "react";
import ReactDom from "react-dom";

import SimpleComponent from "psyche/simple-component";

const root = document.createElement("div");
document.body.append(root);
ReactDom.render(<SimpleComponent />, root);
