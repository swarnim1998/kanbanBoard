import React, { useState } from "react";
import { Paper, Collapse } from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import ListInputContainer from "./ListInputContainer";
const useStyle = makeStyles((theme) => ({
  root: {
    width: "300px",
    marginTop: theme.spacing(2),
  },
  addToCard: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(0, 1, 1, 1),
    background: "transparent",
    "&:hover": {
      background: fade("#000", 0.25),
    },
  },
}));

export default function NewListContainer(props) {
  const [open, setOpen] = useState(false);
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <ListInputContainer setOpen={setOpen} addList={props.addList} />
      </Collapse>
      <Collapse in={!open}>
        <Paper className={classes.addToCard} onClick={() => setOpen(!open)}>
          <div>+ Add a List</div>
        </Paper>
      </Collapse>
    </div>
  );
}
