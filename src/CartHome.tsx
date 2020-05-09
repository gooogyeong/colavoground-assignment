import React from "react";

import CloseIcon from "@material-ui/icons/Close";
import AddCircleIcon from "@material-ui/icons/AddCircle";

type Item = {
  count: number;
  name: string;
  price: number;
};

type CartHomeProps = {
  showMenu: () => void;
};

function CartHome({ showMenu }: CartHomeProps) {
  return (
    <div className="container">
      <div className="close">
        <CloseIcon />
      </div>
      <div id="header">
        <div className="userName">곽지우</div>
        <div className="datetime">datetime</div>
        <div>
          <button className="headerButton" onClick={showMenu}>
            <AddCircleIcon />
            시술
          </button>
          <button className="headerButton">
            <AddCircleIcon />
            할인
          </button>
        </div>
      </div>
      <div id="cart-item">
        {/*items ? (
          <div>
            <ul>
              item
              {/*Object.keys(state.items).map((id) => (
                  <li>{state.items.id.name}</li>
                ))
            </ul>
          </div>
        ) : (
          <div>no item</div>
        )}*/}
      </div>
      <div id="calculator">
        <div id="sum">
          <div>합계</div>
          <div>0원</div>
        </div>
        <button>다음</button>
      </div>
    </div>
  );
}

export default CartHome;
