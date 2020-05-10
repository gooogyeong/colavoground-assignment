import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

type CounterProps = {
  //default: number;
};

function Counter(/*{ default }: CounterProps*/) {
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        {/* <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel> */}
        <Select
          //labelId="demo-simple-select-outlined-label"
          //id="demo-simple-select-outlined"
          //value={age}
          defaultValue={1}
          onChange={handleChange}
          //label="Age"
        >
          {/* <MenuItem value=""><em>None</em></MenuItem> */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
            <MenuItem value={count}>{count}</MenuItem>
          ))}
          {/* <MenuItem value={10}>1</MenuItem>
          <MenuItem value={20}>2</MenuItem>
          <MenuItem value={30}>3</MenuItem> */}
        </Select>
      </FormControl>
    </div>
  );
}

export default Counter;
