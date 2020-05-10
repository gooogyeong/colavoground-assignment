import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SimplePopper from "./SimplePopper";
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
  selectedDiscounts?: Discount[] /* | []*/ /*undefined;*/;
  defaultText: string | number;
  item: Discount | Item;
  //popperTitle: string;
  popperContent: Content[];
  selectCount?: (
    itemIdx: number | undefined,
    count: number | undefined
  ) => void;
};

function Expand({
  itemIdx,
  selectedDiscounts,
  defaultText,
  item,
  //popperTitle,
  popperContent,
  selectCount,
}: ExpandProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  //console.log(item); //{name: "기분이다 할인", rate: 0.05, items: Array(3)}
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
                console.log(item); //{name: "회원권 할인", rate: 0.1, items: Array(3)}
                console.log(selectedDiscounts);
                console.log(itemIdx);
                console.log(content); //{count: 1, name: "드라이", price: 30000}
                return (
                  <li className="discountCheck">
                    {content.name}
                    {
                      <CheckIcon
                      //style={
                      //  selectedDiscounts !== undefined &&
                      //  typeof itemIdx === "number" &&
                      //  ({ selectedDiscounts }: Discount[])[itemIdx].items.includes(content)
                      //    ? {}
                      //    : { display: "none" }
                      //}
                      />
                    }
                  </li>
                );
              }
            })}
          </ul>
          <div>
            <button>삭제</button>
            <button>{typeof defaultText === "number" ? "완료" : "확인"}</button>
          </div>
        </div>
      </Popper>
    </div>
  );
}

export default Expand;
