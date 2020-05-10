import React, { useState, useReducer, useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";

type Item = {
  count: number;
  name: string;
  price: number;
};

type Discount = {
  name: string;
  rate: number;
  items: [] | Item[];
};

type Discounts = {
  [key: string]: Discount;
};

type DiscountProps = {
  showHome: () => void;
  handleDiscount: (discount: Discount) => void;
  discounts: Discounts;
  selectedDiscounts: Discount[];
};

function DiscountMenu({
  showHome,
  handleDiscount,
  discounts,
  selectedDiscounts,
}: DiscountProps) {
  return (
    <div className="container">
      <div className="header">
        <CloseIcon className="closeIcon" onClick={showHome} />
        <div>할인</div>
        <AddIcon />
      </div>
      <div>
        {discounts ? (
          <ul>
            {Object.keys(discounts).map((key) => (
              <div
                className="discountItem"
                onClick={() => {
                  handleDiscount(discounts[key]);
                }}
              >
                <div>
                  <li>{discounts[key].name}</li>
                  <li>{discounts[key].rate * 100} %</li>
                </div>
                <CheckIcon
                  style={
                    selectedDiscounts.includes(discounts[key])
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

export default DiscountMenu;
