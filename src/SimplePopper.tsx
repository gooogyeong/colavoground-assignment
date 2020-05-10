import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      border: "1px solid",
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
    },
  })
);

type Content = {
  count?: number;
  discount?: string;
};

type PopperProps = {
  [popperContent: string]: Content[];
};

function SimplePopper({ popperContent }: PopperProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Toggle Popper
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <div className={classes.paper}>{popperContent}</div>
      </Popper>
    </div>
  );
}

export default SimplePopper;
