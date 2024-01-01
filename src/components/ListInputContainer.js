import React, { useState } from "react";
import { Paper, InputBase, Button, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles, fade } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  card: {
    paddingBottom: theme.spacing(4),
    margin: theme.spacing(0, 1, 1, 1),
  },
  input: {
    marginLeft: theme.spacing(1),
  },
  btnConform: {
    backgroundColor: "#101c5c",
    "&:hover": {
      background: fade("#101c5c", 0.25),
    },
    margin: theme.spacing(0, 1, 1, 1),
    color: 'white'
  },
}));

export default function ListInputContainer(props) {
  const classes = useStyle();
  const [cardTitle, setCardTitle] = useState();
  const handle = (e) => {
    setCardTitle(e.target.value);
  };

  const addList = () => {
    props.addList(cardTitle)
    setCardTitle('')
    props.setOpen(false)
  }
  return (
    <div>
      <div>
        <Paper className={classes.card}>
          <InputBase
            onChange={handle}
            value={cardTitle}
            multiline
            fullWidth
            className={classes.input}
            placeholder="Enter title..."
          />
        </Paper>
      </div>
      <div>
        <Button
          className={classes.btnConform}
          onClick={() => addList(cardTitle)}
        >
          Add List
        </Button>
        <IconButton>
          <ClearIcon onClick={() => props.setOpen(false)} />
        </IconButton>
      </div>
    </div>
  );
}
