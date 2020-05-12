import React from "react";
import Clock from "./Clock";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import Expand from "./Expand";

type Item = {
  count: number;
  name: string;
  price: number;
};

type Discount = {
  name: string;
  rate: number;
  items: Item[];
};

type CartHomeProps = {
  select: (itemArr: Item[]) => void;
  showMenu: () => void;
  showDiscount: () => void;
  selectCount: (itemIdx: number | undefined, count: number | undefined) => void;
  handleSelect: (item: Item) => void;
  selectedItems: Item[];
  selectedDiscounts: Discount[];
  discountPrice: (dcArr: Discount[]) => void;
  selectDiscountItem: (itemIdx: number, item: Item) => void;
};

function CartHome({
  select,
  showMenu,
  showDiscount,
  selectCount,
  handleSelect,
  selectedItems,
  selectedDiscounts,
  discountPrice,
  selectDiscountItem,
}: CartHomeProps) {
  return (
    <div className="container">
      <div>
        <div className="header">
          <CloseIcon style={{ color: "#9e9e9e" }} />
          <div>
            <div className="userName bold">곽지우</div>
            <Clock />
          </div>
          <AddIcon style={{ opacity: 0 }} />
        </div>
        <div className="headerButtonContainer">
          <button className="headerButton hair bold" onClick={showMenu}>
            <AddCircleIcon style={{ verticalAlign: "bottom", color: "" }} />
            시술
          </button>
          <button className="headerButton discount bold" onClick={showDiscount}>
            <AddCircleIcon style={{ verticalAlign: "bottom" }} />
            할인
          </button>
        </div>
        <div id="cart">
          <ul>
            {selectedItems.map((item, itemIdx) => (
              <div id="cart-item">
                <div>
                  <li className="grey bold ">{item.name}</li>
                  <li className="lightGrey smallChar listItem">{item.price}</li>
                </div>
                <div>
                  <Expand
                    select={select}
                    itemIdx={itemIdx}
                    selectedItems={selectedItems}
                    handleSelect={handleSelect}
                    defaultText={item.count}
                    item={item}
                    popperContent={[
                      1,
                      2,
                      3,
                      4,
                      5,
                      6,
                      7,
                      8,
                      9,
                      10,
                      11,
                      12,
                      13,
                      14,
                      15,
                    ]}
                    selectCount={selectCount}
                    discountPrice={discountPrice}
                  />
                </div>
              </div>
            ))}
          </ul>
          <ul style={{ marginTop: "-0.9em" }}>
            {selectedDiscounts.map((discount, discountIdx) => (
              <div id="discount-item">
                <div>
                  <li className="grey bold ">{discount.name}</li>
                  <li className="lightGrey smallChar">
                    {discount.items
                      .map((item) =>
                        item.count > 1
                          ? `${item.name}X${item.count}`
                          : item.name
                      )
                      .join(",")}
                  </li>
                  <li className="bold listItem pink">
                    -
                    {discount.items.reduce(function (acc, curr) {
                      const discountPrice = acc + curr.price * curr.count;
                      return discountPrice;
                    }, 0) * discount.rate}{" "}
                    원({discount.rate * 100} %)
                  </li>
                </div>
                <div>
                  <Expand
                    select={select}
                    itemIdx={discountIdx}
                    selectedDiscounts={selectedDiscounts}
                    handleSelect={handleSelect}
                    defaultText="수정"
                    item={discount}
                    popperContent={selectedItems}
                    selectDiscountItem={selectDiscountItem}
                    discountPrice={discountPrice}
                  />
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>

      <div id="calculator" className="footer">
        <div>
          <hr className="totalLine"></hr>
        </div>
        <div id="sum">
          <div className="sumText lightGrey">합계</div>
          <div className="total">
            {selectedItems.reduce(function (acc, curr) {
              return acc + curr.price * curr.count;
            }, 0) -
              selectedDiscounts.reduce(function (acc, curr) {
                const discount = curr.items.reduce(function (acc2, curr) {
                  return acc2 + curr.count * curr.price;
                }, 0);
                return acc + discount * curr.rate;
              }, 0)}
            원
          </div>
        </div>
        <button className="footerButton">다음</button>
      </div>
    </div>
  );
}

export default CartHome;
