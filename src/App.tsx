import React, { useState, useEffect, useCallback } from "react";
import { Switch, Route } from "react-router-dom";

import axios from "axios";
import "./App.css";
import CartHome from "./Components/CartHome";
import Menu from "./Components/Menu";
import DiscountMenu from "./Components/DiscountMenu";
import { Item, Discount, Items, Discounts } from "./Type";

//useCallback() 레퍼런스: https://xiubindev.tistory.com/102
function App() {
  const [items, setItems] = useState<Items | {}>({});
  const [discounts, setDiscounts] = useState<Discounts | {}>({});
  const [selectedItems, select] = useState<Item[]>([]);
  const [selectedDiscounts, discountPrice] = useState<Discount[]>([]);

  const getServerData = () => {
    return axios
      .get(
        "https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData"
      )
      .then((serverResponse: any) => {
        //! type any
        setItems(serverResponse.data.items);
        const discountsData = serverResponse.data.discounts;
        for (let key in discountsData) {
          discountsData[key].items = [];
        }
        setDiscounts(discountsData);
      });
  };

  useEffect(() => {
    getServerData();
  }, []);

  const selectCount = useCallback(
    (itemIdx: number | undefined, count: number | undefined) => {
      if (typeof itemIdx === "number" && count) {
        const updatedSelectedItems = [...selectedItems];
        updatedSelectedItems[itemIdx].count = count;
        select(updatedSelectedItems);
      }
    },
    [selectedItems]
  );

  const handleSelect = useCallback(
    (item: Item) => {
      if (!selectedItems.includes(item)) {
        select([...selectedItems, item]);
        if (selectedDiscounts.length) {
          const updatedSelectedDiscounts = [...selectedDiscounts];
          for (let i = 0; i < updatedSelectedDiscounts.length; i++) {
            updatedSelectedDiscounts[i].items = [...selectedItems, item];
          }
          discountPrice(updatedSelectedDiscounts);
        }
      } else {
        const updatedSelectedItems = [...selectedItems];
        updatedSelectedItems.splice(selectedItems.indexOf(item), 1);
        select(updatedSelectedItems);
        if (selectedDiscounts.length) {
          const updatedSelectedDiscounts = [...selectedDiscounts];
          for (let i = 0; i < updatedSelectedDiscounts.length; i++) {
            updatedSelectedDiscounts[i].items = updatedSelectedItems;
          }
          discountPrice(updatedSelectedDiscounts);
        }
      }
    },
    [selectedItems, selectedDiscounts]
  );

  const emptySelect = useCallback(() => {
    select([]);
    if (selectedDiscounts.length) {
      const updatedSelectedDiscounts = [...selectedDiscounts];
      updatedSelectedDiscounts.forEach((dc) => (dc.items = []));
      discountPrice(updatedSelectedDiscounts);
    }
  }, [selectedDiscounts]);

  const emptyDCSelect = useCallback(() => {
    discountPrice([]);
  }, []);

  const handleDiscount = useCallback(
    (discount: Discount) => {
      let updatedSelectedDiscounts = [...selectedDiscounts];
      if (!selectedDiscounts.includes(discount)) {
        updatedSelectedDiscounts = [...selectedDiscounts, discount];
        for (let i = 0; i < updatedSelectedDiscounts.length; i++) {
          updatedSelectedDiscounts[i].items = selectedItems;
        }
        discountPrice(updatedSelectedDiscounts);
      } else {
        updatedSelectedDiscounts.splice(selectedDiscounts.indexOf(discount), 1);
        discountPrice(updatedSelectedDiscounts);
      }
    },
    [selectedItems, selectedDiscounts]
  );

  const selectDiscountItem = useCallback(
    (itemIdx: number, item: Item) => {
      const dcItems: Item[] = selectedDiscounts[itemIdx].items;
      const updatedSelectedDiscounts = [...selectedDiscounts];
      const updatedDcItems = [...dcItems];
      const i: number = dcItems.indexOf(item);
      if (i !== -1) {
        updatedDcItems.splice(i, 1);
        updatedSelectedDiscounts[itemIdx].items = updatedDcItems;
      } else {
        updatedSelectedDiscounts[itemIdx].items = [...dcItems, item];
      }
      discountPrice(updatedSelectedDiscounts);
    },
    [selectedDiscounts]
  );

  return (
    <div className="app">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <CartHome
              select={select}
              selectCount={selectCount}
              handleSelect={handleSelect}
              selectedItems={selectedItems}
              selectedDiscounts={selectedDiscounts}
              discountPrice={discountPrice}
              selectDiscountItem={selectDiscountItem}
            />
          )}
        />
        <Route
          exact
          path="/menu"
          render={() => (
            <Menu
              handleSelect={handleSelect}
              emptySelect={emptySelect}
              items={items}
              selectedItems={selectedItems}
            />
          )}
        />
        <Route
          exact
          path="/discount"
          render={() => (
            <DiscountMenu
              handleDiscount={handleDiscount}
              emptyDCSelect={emptyDCSelect}
              discounts={discounts}
              selectedDiscounts={selectedDiscounts}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
