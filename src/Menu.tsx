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

function cartReducer(state: State, action: Action): State {
  switch (action.type) {
    case "GET_SERVER_DATA":
      return {
        ...state,
        //currency_code: action.data["currency_code"],
        //discounts: action.data.discounts,
        items: action.data.items,
      };
  }
}

type MenuProps = {
  showHome: () => void;
};

type Item = {
  count: number;
  name: string;
  price: number;
};

type Items = {
  [key: string]: Item;
  //item: Item;
};

type CheckItems = {
  [key: string]: string;
};

function Menu({ showHome }: MenuProps) {
  const [items, setItems] = useState<Items | null>(null);
  const [checkedItems, checkItem] = useState<string[]>([]); //<CheckItems[]>([]);

  const getServerData = () => {
    return axios
      .get(
        "https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData"
      )
      .then((serverData: any) => {
        console.log(serverData.data.items);
        // const items = [];
        // for (let key in serverData.data.items) {
        //   items.push(serverData.data.items[key]);
        // }
        setItems(serverData.data.items);
        //dispatch({ type: "GET_SERVER_DATA", data: serverData.data });
      });
  };

  useEffect(() => {
    getServerData();
  }, []);

  const handleCheck = (key: string) => {
    checkItem([...checkedItems, key]);
  };

  return (
    <div className="container">
      <div className="header">
        <CloseIcon className="closeIcon" onClick={showHome} />
        <div>시술메뉴</div>
        <AddIcon />
      </div>
      <div id="item">
        {items ? (
          <ul>
            {Object.keys(items).map((key) => (
              <div className="menuItem" onClick={() => handleCheck(key)}>
                <div className="menuContent">
                  <li>
                    {items[key].name}
                    <EditIcon />
                  </li>
                  <li>{items[key].price}</li>
                </div>
                <CheckIcon
                  style={checkedItems.includes(key) ? {} : { display: "none" }}
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
