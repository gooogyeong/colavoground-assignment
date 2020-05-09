import React, { useState, useReducer, useEffect } from "react";
//import { flexbox } from "@material-ui/system";

import CartHome from "./CartHome";
import Menu from "./Menu";

type State = "home" | "menu" | "discount";

function Cart() {
  const [state, setState] = useState("menu");

  const showHome = () => {
    setState("home");
  };

  const showMenu = () => {
    setState("menu");
  };

  return (
    <div>
      {state === "home" && <CartHome showMenu={showMenu} />}
      {state === "menu" && <Menu showHome={showHome} />}
    </div>
  );
}

export default Cart;
