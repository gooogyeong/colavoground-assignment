import React, { useState } from "react";
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
  emptySelect: () => void;
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

function Menu({
  showHome,
  handleSelect,
  emptySelect,
  items,
  selectedItems,
}: MenuProps) {
  const [shouldShowModal, showModal] = useState(false);
  const [menuCart, setMenuCart] = useState<Item[]>([...selectedItems]);
  return (
    <div>
      <div className="container">
        <div>
          <div className="header">
            <CloseIcon
              style={{ color: "#9e9e9e" }}
              className="closeIcon"
              onClick={function () {
                //if (selectedItems.length >= 3) {
                if (selectedItems.length < 3) {
                  emptySelect();
                }
                showHome();
                //} else {
                //   showModal(true);
              }}
            />
            <div className="bold">시술메뉴</div>
            <AddIcon style={{ color: "#9e9e9e" }} />
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
                      <li className="bold">
                        {items[key].name}
                        <EditIcon
                          style={{
                            color: "#e0e0e0",
                            marginLeft: "0.25em",
                            verticalAlign: "bottom",
                          }}
                        />
                      </li>
                      <li className="grey smallChar listItem">
                        {items[key].price}
                      </li>
                    </div>
                    <CheckIcon
                      style={
                        selectedItems.includes(items[key])
                          ? { color: "#b084f4" }
                          : { opacity: 0 }
                      }
                    />
                  </div>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
        <div
          className="selectFooter footer"
          onClick={function () {
            if (selectedItems.length >= 3) {
              showHome();
            } else {
              showModal(true);
            }
          }}
        >
          서비스를 선택하세요(여러 개 선택가능)
          <button className="footerButton">완료</button>
        </div>
      </div>
      <div
        id="threeItemModal"
        style={shouldShowModal ? {} : { display: "none" }}
        onClick={() => showModal(false)}
      >
        <div className="modalContent">
          최소 3개 이상의 시술을 선택해야합니다
        </div>
      </div>
    </div>
  );
}

export default Menu;
