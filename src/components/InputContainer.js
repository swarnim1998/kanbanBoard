import React, { useState } from "react";
import { Paper, Typography, Collapse } from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import InputCard from "./InputCard";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyle = makeStyles((theme) => ({
  root: {
    width: "300px",
    marginTop: theme.spacing(2),
  },
  addToCard: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(0, 1, 1, 1),
    background: "#EBECF0",
    "&:hover": {
      background: fade("#000", 0.25),
    },
  },
}));

export default function Input(props) {
  const [open, setOpen] = useState(false);
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <InputCard
          setOpen={setOpen}
          addCard={props.addCard}
          data={props.data}
        />
      </Collapse>
      <Collapse in={!open}>
        <Paper className={classes.addToCard} onClick={() => setOpen(!open)}>
          <Typography style={{display: 'flex'}}>
            <AddCircleOutlineIcon style={{marginRight: '5px'}}/> 
            <span>Add a Task</span>  
          </Typography>
        </Paper>
      </Collapse>
    </div>
  );
}
