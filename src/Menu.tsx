import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";

type Discount = {
  name: string;
  rate: number; //! decimal = number?
};

type Data = {
  currency_code: string;
  discounts: Discount;
  items: Item;
};

type State = {
  currency_code: string;
  discounts: object;
  items: object;
};

type Action = { type: "GET_SERVER_DATA"; data: Data };

// function cartReducer(state: State, action: Action): State {
//   switch (action.type) {
//     case "GET_SERVER_DATA":
//       return {
//         ...state,
//         items: action.data.items,
//       };
//   }
// }

type MenuProps = {
  showHome: () => void;
  handleSelect: (item: Item) => void;
  items: Items;
  selectedItems: Item[];
};

type Item = {
  count: number;
  name: string;
  price: number;
};

type Items = {
  [key: string]: Item;
};

function Menu({ showHome, handleSelect, items, selectedItems }: MenuProps) {
  return (
    <div className="container">
      <div className="header">
        <CloseIcon
          className="closeIcon"
          onClick={function () {
            if (selectedItems.length >= 3) {
              //console.log(selectedItems);
              showHome();
            } else {
              alert("최소 3개 이상의 시술을 선택해야합니다");
            }
          }}
        />
        <div>시술메뉴</div>
        <AddIcon />
      </div>
      <div id="item">
        {items ? (
          <ul>
            {Object.keys(items).map((key) => (
              <div
                className="menuItem"
                onClick={() => {
                  handleSelect(items[key]);
                }}
              >
                <div className="menuContent">
                  <li>
                    {items[key].name}
                    <EditIcon />
                  </li>
                  <li>{items[key].price}</li>
                </div>
                <CheckIcon
                  style={
                    selectedItems.includes(items[key])
                      ? {}
                      : { display: "none" }
                  }
                />
              </div>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default Menu;
