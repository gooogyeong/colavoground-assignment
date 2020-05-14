import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import CheckIcon from "@material-ui/icons/Check";
import { Item, Discount } from "../Type";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      border: "1px solid",
      width: "9em",
      maxHheight: "13em",
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
    },
  })
);

type Content = number | Item;

type ExpandProps = {
  select: (itemArr: Item[]) => void;
  itemIdx?: number;
  selectedItems?: Item[];
  selectedDiscounts: Discount[];
  discountPrice: (dcArr: Discount[]) => void;
  defaultText: string | number;
  item: Discount | Item;
  popperContent: Content[];
  handleSelect: (item: Item) => void;
  selectCount?: (
    itemIdx: number | undefined,
    count: number | undefined
  ) => void;
  selectDiscountItem?: (itemIdx: number, item: Item) => void;
};

function Expand({
  select,
  itemIdx,
  selectedItems,
  selectedDiscounts,
  defaultText,
  item,
  popperContent,
  discountPrice,
  selectCount,
  selectDiscountItem,
}: ExpandProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  return (
    <div>
      <button
        className="popperButton"
        aria-describedby={id}
        onClick={handleClick}
      >
        {defaultText}
        <ExpandMoreIcon style={{ verticalAlign: "middle" }} />
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <div className={classes.paper}>
          <div className="popperTitle">{item.name}</div>
          <hr></hr>
          <ul
            className="option"
            style={{ maxHeight: "8em", overflowY: "scroll" }}
          >
            {popperContent.map(function (content: Content, i) {
              if (typeof content === "number") {
                return (
                  <li
                    key={`count_${content}`}
                    className={
                      selectedItems !== undefined &&
                      typeof itemIdx === "number" &&
                      selectedItems[itemIdx].count === content
                        ? "count bold black"
                        : "count"
                    }
                    onClick={() => {
                      if (
                        typeof selectCount === "function" &&
                        typeof itemIdx === "number"
                      ) {
                        selectCount(itemIdx, content);
                      }
                    }}
                  >
                    {content}
                  </li>
                );
              } else {
                return (
                  <li
                    key={`dc_item_${i}`}
                    className="discountCheck"
                    onClick={() => {
                      if (
                        typeof selectDiscountItem === "function" &&
                        typeof itemIdx === "number"
                      ) {
                        selectDiscountItem(itemIdx, content);
                      }
                    }}
                  >
                    <div>
                      <div>{content.name}</div>
                      <div className="smallChar pink">{content.price}</div>
                    </div>
                    {
                      <CheckIcon
                        style={
                          selectedDiscounts !== undefined &&
                          typeof itemIdx === "number" &&
                          selectedDiscounts[itemIdx].items.includes(content)
                            ? { marginRight: "-1em", color: "#b084f4" }
                            : { display: "none" }
                        }
                      />
                    }
                  </li>
                );
              }
            })}
          </ul>
          <hr></hr>
          <div className="action">
            <button
              className="pink bold"
              style={{ backgroundColor: "transparent" }}
              onClick={function (e) {
                const selectedItemsName =
                  selectedItems !== undefined
                    ? selectedItems.map((item) => item.name)
                    : [];
                const selectedDcsName =
                  selectedDiscounts !== undefined
                    ? selectedDiscounts.map((dc) => dc.name)
                    : [];
                const itemIdx = selectedItemsName.indexOf(item.name);
                const dcIdx = selectedDcsName.indexOf(item.name);
                const updatedSelectedDiscounts =
                  selectedDiscounts !== undefined ? [...selectedDiscounts] : [];
                console.log(updatedSelectedDiscounts);
                if (itemIdx !== -1) {
                  const updatedSelectedItems =
                    selectedItems !== undefined ? [...selectedItems] : [];
                  updatedSelectedItems.splice(itemIdx, 1);
                  select(updatedSelectedItems);
                  for (let i = 0; i < updatedSelectedDiscounts.length; i++) {
                    updatedSelectedDiscounts[i].items = updatedSelectedItems;
                  }
                  discountPrice(updatedSelectedDiscounts);
                } else {
                  updatedSelectedDiscounts.splice(dcIdx, 1);
                  discountPrice(updatedSelectedDiscounts);
                }
                handleClick(e);
              }}
            >
              삭제
            </button>
            {"|"}
            <button
              className="lightGrey bold"
              style={{ backgroundColor: "transparent" }}
              onClick={handleClick}
            >
              {typeof defaultText === "number" ? "완료" : "확인"}
            </button>
          </div>
        </div>
      </Popper>
    </div>
  );
}

export default React.memo(Expand);
