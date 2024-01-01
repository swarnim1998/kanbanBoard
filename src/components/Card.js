import React, { useState } from "react";
import { Paper, InputBase, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const useStyle = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(0.7, 1, 0.7, 2),
    margin: theme.spacing(1)
  },
  input: {
    background: "white",
    padding: theme.spacing(0.7, 1, 0.7, 2),
    marginLeft: "7px",
    width: "95%",
    borderRadius: "5px",
  },
}));

export default function Card(props) {
  const [open, setOpen] = useState(false);
  const [text, changeText] = useState(props.data.name);
  const classes = useStyle();

  const update = () => {
    props.updateCard(props.data.id, text)
    setOpen(!open)
  }
  
  const onDragStart = (ev, data) => {
    ev.dataTransfer.setData("card", JSON.stringify(data))
    console.log("dra", data)
  }
  
  const onDropOver = (ev, listId) => {
    const dragData = ev.dataTransfer.getData("card")
    console.log("dragData", JSON.parse(dragData))
    console.log("dropId", listId)
  }
  console.log("card", props.data)
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const date = new Date()
  const month = monthNames[date.getMonth()]
  const day = date.getDate()
  return (
    <div>
      {open ? (
        <InputBase
          className={classes.input}
          onBlur={() => update()}
          value={text}
          onChange={(e) => changeText(e.target.value)}
        />
      ) : (
      <Paper className={classes.card}
       draggable onDragStart={(e) => onDragStart(e, {id: props.data.id, listId: props.listId})}
      //  onDrop={(e) => onDropOver(e, props.listId)}
      >
        <div className="card-content">
          <span className="main-card-content" onClick={() => setOpen(!open)}>
            <Typography style={{ fontSize: "1rem", fontWeight: "bold", color: '#1f2c47ff', fontFamily: 'san-serif'}}>
              {text}
            </Typography>
          </span>
          <div >
            <DeleteIcon
              className="delete"
              onClick={() => props.deleteCard(props.data.id)}
            />
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <AccessTimeIcon style={{fontSize: '0.75rem', marginRight: '3px', color: '#6b7387ff'}}/>
          <span style={{fontFamily: 'serif', fontSize: '0.75rem', color: '#6b7387ff'}}>
            {`${month} ${day}`}
          </span>
        </div>
      </Paper>
      )}
    </div>
  );
}
