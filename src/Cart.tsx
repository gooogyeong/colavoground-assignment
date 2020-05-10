import React, { useState, useReducer, useEffect } from "react";
//import { flexbox } from "@material-ui/system";
import CartHome from "./CartHome";
import Menu from "./Menu";
import DiscountMenu from "./DiscountMenu";
import axios from "axios";
type State = "home" | "menu" | "discount";

type Item = {
  count: number;
  name: string;
  price: number;
};

type Items = {
  [key: string]: Item;
};

type Discount = {
  name: string;
  rate: number;
  items: [] | Item[];
};

type Discounts = {
  [key: string]: Discount;
};

function Cart() {
  const [state, setState] = useState("home");
  const [items, setItems] = useState<Items | {}>({});
  const [discounts, setDiscounts] = useState<Discounts | {}>({});
  const [selectedItems, select] = useState<Item[]>([]);
  const [selectedDiscounts, discountPrice] = useState<Discount[]>([]);

  const getServerData = () => {
    return axios
      .get(
        "https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData"
      )
      .then((serverData: any) => {
        //! type any
        //console.log(serverData.data);
        setItems(serverData.data.items);
        const discountsData = serverData.data.discounts;
        for (let key in discountsData) {
          discountsData[key].items = [];
        }
        //const newDiscounts = Object.keys(serverData.data.discounts).map((key) => serverData.data.discounts)
        setDiscounts(
          discountsData /*.map((discount) => (discount.items = []))*/
          /*serverData.data
            .discounts*/
        );
      });
  };

  useEffect(() => {
    getServerData();
  }, []);

  const showHome = () => {
    setState("home");
  };

  const showMenu = () => {
    setState("menu");
  };

  const showDiscount = () => {
    setState("discount");
  };

  const selectCount = (
    itemIdx: number | undefined,
    count: number | undefined
  ) => {
    if (typeof itemIdx === "number" && count) {
      const updatedSelectedItems = [...selectedItems];
      updatedSelectedItems[itemIdx].count = count;
      select(updatedSelectedItems);
    }
  };

  const handleSelect = (item: Item) => {
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
      }
    }
  };

  const handleDiscount = (discount: Discount) => {
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
  };

  return (
    <div style={{ height: "100%" }}>
      {state === "home" && (
        <CartHome
          showMenu={showMenu}
          showDiscount={showDiscount}
          selectCount={selectCount}
          selectedItems={selectedItems}
          selectedDiscounts={selectedDiscounts}
          //discountPrice={discountPrice}
        />
      )}
      {state === "menu" && (
        <Menu
          showHome={showHome}
          handleSelect={handleSelect}
          items={items}
          selectedItems={selectedItems}
        />
      )}
      {state === "discount" && (
        <DiscountMenu
          showHome={showHome}
          handleDiscount={handleDiscount}
          discounts={discounts}
          selectedDiscounts={selectedDiscounts}
        />
      )}
    </div>
  );
}

export default Cart;
