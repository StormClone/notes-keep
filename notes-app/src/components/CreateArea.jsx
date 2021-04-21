import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import Slide from '@material-ui/core/Slide';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Alert} from '@material-ui/lab';
import axios from "axios";
import { InputTitle, InputContent } from "./InputNoteConfig";

function CreateArea(props) {
  ///States
  const [expand, setExpand] = useState(false);
  const [isMaxAlertOn, setMaxAlertOn] = useState(false);
  const [isEmptyAlertOn, setEmptyAlertOn] = useState(false);
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


  //////Start of Alert Handlers///////
  function handleTitleAlert() {
    setMaxAlertOn(true);
    setTimeout(() => {
      setMaxAlertOn(false);
    }, 5000);
  }

  function handleEmptyAlert() {
    setEmptyAlertOn(true);
    setTimeout(() => {
      setEmptyAlertOn(false);
    }, 5000);
  }

  /////End of Alert Handlers////////


  ///Handle change in text for input fields
  function handleChange(event) {
    const { name, value } = event.target;
    
    if (event.target.name === "title") {
      event.target.value.length === 20 && handleTitleAlert();
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

    if (note.title === "" || note.content === "") {
      handleEmptyAlert();
    } else {
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
  }

  ///render
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
    <div>
      <div className="alert-container">
        <div className={isMaxAlertOn ? "" : "hideAlert"}>
            <Slide in={isMaxAlertOn} direction="down">
            <Alert className="alert" severity="warning" variant="filled">Reached Title's max character limit.</Alert>
          </Slide>
        </div>

        <div className={isEmptyAlertOn ? "" : "hideAlert"}>
        <Slide in={isEmptyAlertOn} direction="down">
            <Alert className="alert" severity="warning" variant="filled">Please type a Title and a Note.</Alert>
          </Slide>
        </div>
      </div>
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
