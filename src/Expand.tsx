import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
//import SimplePopper from "./SimplePopper";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import CheckIcon from "@material-ui/icons/Check";

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

type Item = {
  count: number;
  name: string;
  price: number;
};

type Content = number | Item;

type Discount = {
  name: string;
  rate: number;
  items: Item[];
};

type ExpandProps = {
  itemIdx?: number;
  selectedItems?: Item[];
  selectedDiscounts?: Discount[] /* | []*/ /*undefined;*/;
  defaultText: string | number;
  item: Discount | Item;
  popperContent: Content[];
  selectCount?: (
    itemIdx: number | undefined,
    count: number | undefined
  ) => void;
  selectDiscountItem?: (itemIdx: number, item: Item) => void;
};

function Expand({
  itemIdx,
  selectedItems,
  selectedDiscounts,
  defaultText,
  item,
  popperContent,
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
      <button aria-describedby={id} onClick={handleClick}>
        {defaultText}
        <ExpandMoreIcon />
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <div className={classes.paper}>
          <div className="popperTitle">{item.name}</div>
          <ul
            className="option"
            style={{ maxHeight: "8em", overflowY: "scroll" }}
          >
            {popperContent.map(function (content: Content) {
              if (typeof content === "number") {
                return (
                  <li
                    /*style={
                      selectedItems !== undefined &&
                      typeof itemIdx === "number" &&
                      selectedItems[itemIdx].count === content
                        ? {
                            fontSize: "200%",
                            color: "black",
                          }
                        : {}
                    }*/
                    className="count"
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
                    {content.name}
                    {
                      <CheckIcon
                        style={
                          selectedDiscounts !== undefined &&
                          typeof itemIdx === "number" &&
                          selectedDiscounts[itemIdx].items.includes(content)
                            ? {}
                            : { display: "none" }
                        }
                      />
                    }
                  </li>
                );
              }
            })}
          </ul>
          <div>
            <button onClick={handleClick}>삭제</button>
            <button onClick={handleClick}>
              {typeof defaultText === "number" ? "완료" : "확인"}
            </button>
          </div>
        </div>
      </Popper>
    </div>
  );
}

export default Expand;
