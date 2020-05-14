import React, { useState } from "react";
import { Link } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import { Item, Items } from "../Type";

type MenuProps = {
  handleSelect: (item: Item) => void;
  emptySelect: () => void;
  items: Items;
  selectedItems: Item[];
};

function Menu({ handleSelect, emptySelect, items, selectedItems }: MenuProps) {
  const [shouldShowModal, showModal] = useState(false);
  return (
    <div>
      <div className="container">
        <div>
          <div className="header">
            <Link to="/">
              <CloseIcon
                style={{ color: "#9e9e9e" }}
                className="closeIcon"
                onClick={function () {
                  if (selectedItems.length < 3) {
                    emptySelect();
                  }
                }}
              />
            </Link>
            <div className="bold">시술메뉴</div>
            <AddIcon style={{ color: "#9e9e9e" }} />
          </div>
          <div id="item">
            {items ? (
              <ul>
                {Object.keys(items).map((key) => {
                  return (
                    <div
                      key={key}
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
                  );
                })}
              </ul>
            ) : null}
          </div>
        </div>
        <div className="selectFooter footer">
          서비스를 선택하세요(여러 개 선택가능)
          <Link
            to={selectedItems.length >= 3 ? "/" : "/menu"}
            onClick={function () {
              if (selectedItems.length < 3) {
                showModal(true);
              }
            }}
            className="footerButton"
          >
            완료
          </Link>
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

export default React.memo(Menu);
