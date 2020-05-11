import React from "react";
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
                    <EditIcon
                      style={{
                        marginLeft: "0.25em",
                        verticalAlign: "bottom",
                      }}
                    />
                  </li>
                  <li>{items[key].price}</li>
                </div>
                <CheckIcon
                  style={
                    selectedItems.includes(items[key])
                      ? {}
                      : { opacity: 0 /*display: "none"*/ }
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
