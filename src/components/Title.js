import React, { useState } from "react";
import { Typography, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  editableTitleContainer: {
    margin: theme.spacing(1),
    display: "flex",
  },
  editableTitle: {
    flexGrow: 1,
    fontSize: "1.2rem",
    fontWeight: "bold",
    fontFamily: 'serif'
  },
  editTitle: {
    flexGrow: 1,
    background: "white",
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

export default function Title(props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(props.data.name);
  const classes = useStyles();

  const saveChange = async () => {
    setOpen(!open);
    const id = props.data.id;
    const lists = JSON.parse(localStorage.getItem('lists'))
    const listIndex = lists.findIndex(list => list.id == id)
    
    lists[listIndex].name = title
    localStorage.setItem('lists', JSON.stringify(lists))
  };

  return (
    <div>
      {open ? (
        <div>
          <InputBase
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={classes.editTitle}
            onBlur={() => saveChange()}
            fullWidth
          />
        </div>
      ) : (
        <div className={classes.editableTitleContainer}>
          <Typography
            onClick={() => setOpen(!open)}
            className={classes.editableTitle}
          >
            {title}
          </Typography>
          <div className="circle">
            {props.data.cards.length}
          </div>
        </div>
      )}
    </div>
  );
}
