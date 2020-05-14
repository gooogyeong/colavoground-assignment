import React from "react";
import { Link } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import { Discount, Discounts } from "../Type";

type DiscountProps = {
  handleDiscount: (discount: Discount) => void;
  emptyDCSelect: () => void;
  discounts: Discounts;
  selectedDiscounts: Discount[];
};

function DiscountMenu({
  handleDiscount,
  discounts,
  selectedDiscounts,
}: DiscountProps) {
  return (
    <div className="container">
      <div>
        <div className="header">
          <Link to="/">
            <CloseIcon style={{ color: "#9e9e9e" }} className="closeIcon" />
          </Link>
          <div className="bold">할인</div>
          <AddIcon style={{ color: "#9e9e9e" }} />
        </div>
        <div id="discount">
          {discounts ? (
            <ul>
              {Object.keys(discounts).map((key) => (
                <div
                  key={key}
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
                        : { opacity: 0 }
                    }
                  />
                </div>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
      <div className="selectFooter footer">
        할인을 선택하세요(여러 개 선택가능)
        <Link to="/" className="footerButton">
          완료
        </Link>
      </div>
    </div>
  );
}

export default React.memo(DiscountMenu);
