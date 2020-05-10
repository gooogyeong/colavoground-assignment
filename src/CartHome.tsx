import React, { useState } from "react";

import CloseIcon from "@material-ui/icons/Close";
import AddCircleIcon from "@material-ui/icons/AddCircle";

//import Counter from "./Counter";
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
  showMenu: () => void;
  showDiscount: () => void;
  selectCount: (itemIdx: number | undefined, count: number | undefined) => void;
  selectedItems: Item[];
  selectedDiscounts: Discount[];
  //discountPrice: Dispatch<SetStateAction<Discount[]>>; //() => void;
};

function CartHome({
  showMenu,
  showDiscount,
  selectCount,
  selectedItems,
  selectedDiscounts,
}: //discountPrice,
CartHomeProps) {
  //const [discountSum, discountFromSum] = useState(0);

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
          <button className="headerButton" onClick={showDiscount}>
            <AddCircleIcon />
            할인
          </button>
        </div>
      </div>
      <div>
        <ul>
          {selectedItems.map((item, itemIdx) => (
            <div id="cart-item">
              <div>
                <li>{item.name}</li>
                <li>{item.price}</li>
              </div>
              <div>
                <Expand
                  itemIdx={itemIdx}
                  defaultText={item.count}
                  item={item}
                  //popperTitle={item.name}
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
                />
              </div>
            </div>
          ))}
        </ul>
        <ul>
          {selectedDiscounts.map((discount, discountIdx) => (
            <div id="discount-item">
              <div>
                <li>{discount.name}</li>
                <li>
                  {
                    /*selectedItems*/ discount.items
                      .map((item) =>
                        item.count > 1
                          ? `${item.name}X${item.count}`
                          : item.name
                      )
                      .join(",")
                  }
                </li>
                <li>
                  -
                  {discount.items.reduce(function (acc, curr) {
                    const discountPrice = acc + curr.price * curr.count;
                    //discountFromSum(
                    //  discountSum + discountPrice * discount.rate
                    //);
                    return discountPrice;
                  }, 0) * discount.rate}{" "}
                  원({discount.rate * 100} %)
                </li>
              </div>
              <div>
                <Expand
                  itemIdx={discountIdx /*itemIdx*/}
                  selectedDiscounts={selectedDiscounts}
                  defaultText="수정"
                  item={discount}
                  //popperTitle={discount.name}
                  popperContent={selectedItems}
                />
              </div>
            </div>
          ))}
        </ul>
      </div>
      <div id="calculator">
        <div id="sum">
          <div>합계</div>
          <div>
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
        <button>다음</button>
      </div>
    </div>
  );
}

export default CartHome;
