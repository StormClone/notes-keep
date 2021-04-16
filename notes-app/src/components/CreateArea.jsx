import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import axios from "axios";
import { InputTitle, InputContent } from "./InputNoteConfig";

function CreateArea(props) {
  ///States
  const [expand, setExpand] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  //////Start of Expand and Shrink Functions//////
  ///Expand when user clicks the input area
  function eventHandleClick() {
    setExpand(true);
  }

  ///Shrink when user clicks away from the input area
  const handleClickAway = () => {
    setExpand(false)
  };
  ///////End of Expand Functions//////

  ///Handle change in text for input fields
  function handleChange(event) {
    const { name, value } = event.target;
    
    if (event.target.name === "title") {
      event.target.value.length === 20 && console.log("Max Characters reached");
      
    }

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  ///Submit Button
  function submitNote(event) {
    const data = {
      title: note.title,
      content: note.content
    }

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };

    axios.post(
      '/notes/add',
      data, headers
    ).then(res => console.log(res.data));

    setNote({
      title: "",
      content: ""
    });
    setExpand(false);
    props.updateList();
    event.preventDefault();
  }

  ///render
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
    <div>
      <form className="create-note" onClick={eventHandleClick}>
        {expand && <InputTitle handleChange={handleChange} note={note}/>}

        <InputContent handleChange={handleChange} note={note} rowExpand={expand ? "3" : "1"}/>

        <Zoom in={expand}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
    </ClickAwayListener>
  );
}

export default CreateArea;
