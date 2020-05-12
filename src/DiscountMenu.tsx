import React from "react";
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
  emptyDCSelect: () => void;
  discounts: Discounts;
  selectedDiscounts: Discount[];
};

function DiscountMenu({
  showHome,
  handleDiscount,
  emptyDCSelect,
  discounts,
  selectedDiscounts,
}: DiscountProps) {
  return (
    <div className="container">
      <div>
        <div className="header">
          <CloseIcon
            style={{ color: "#9e9e9e" }}
            className="closeIcon"
            onClick={showHome}
          />
          <div className="bold">할인</div>
          <AddIcon style={{ color: "#9e9e9e" }} />
        </div>
        <div id="discount">
          {discounts ? (
            <ul>
              {Object.keys(discounts).map((key) => (
                <div
                  className="discountItem"
                  onClick={() => {
                    handleDiscount(discounts[key]);
                  }}
                >
                  <div className="menuContent">
                    <li className="bold">
                      {discounts[key].name}
                      <EditIcon
                        style={{
                          color: "#e0e0e0",
                          marginLeft: "0.25em",
                          verticalAlign: "bottom",
                        }}
                        className="editICon"
                      />
                    </li>
                    <li className="grey smallChar listItem">
                      {discounts[key].rate * 100} %
                    </li>
                  </div>
                  <CheckIcon
                    style={
                      selectedDiscounts.includes(discounts[key])
                        ? { color: "#b084f4" }
                        : { opacity: 0 /* display: "none"*/ }
                    }
                  />
                </div>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
      <div className="selectFooter footer" onClick={showHome}>
        할인을 선택하세요(여러 개 선택가능)
        <button className="footerButton">완료</button>
      </div>
    </div>
  );
}

export default DiscountMenu;
