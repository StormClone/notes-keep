import React, {useState} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import Zoom from "@material-ui/core/Zoom";
import axios from "axios";
import { InputTitle, InputContent } from "./InputNoteConfig";

function Note(props) {
  const [showButtons, setShowButtons] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [note, setNote] = useState({
    title: props.title,
    content: props.content
  });

  ///////Start of Button Functions/////////
  ///Delete Button
  function handleDeleteClick() {
    props.onDelete(props.id);
  }

  ///Edit Button
  function handleEditClick() {
    setEditMode(!isEditMode);
  }

  ///Submit Button
  function handleSubmitClick() {
    const data = {
      title: note.title,
      content: note.content
    }

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };

    //`http://localhost:5000/notes/update/${props.id}`
    axios.put(
     `/notes/update/${props.id}`,
      data, headers
    ).then(res => console.log(res.data));

    setEditMode(false);
  }

  ///Cancel Button
  function handleCancelClick() {
    setNote({
      title: props.title,
      content: props.content
    })

    setEditMode(false);
  }
  ////////End of Button Functions/////////

  ///Hide or Unhide Edit and Delete Buttons
  function overMouse() {
    setShowButtons(!showButtons);
  }

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

  ///Render
  return (
    <div className="note" onMouseOver={overMouse} onMouseOut={overMouse}>
      {isEditMode ? <InputTitle handleChange={handleChange} note={note} /> : <h1>{props.title}</h1>}
      
      {isEditMode ? <InputContent handleChange={handleChange} note={note} /> : <p>{props.content}</p> } 

      <Zoom in={showButtons}>
        <button title="Delete" onClick={handleDeleteClick}>
          <DeleteIcon />
        </button>
      </Zoom>

      <Zoom in={showButtons && !isEditMode}>
        <button title="Edit" onClick={handleEditClick}>
          <EditIcon />
        </button>
      </Zoom>

      <Zoom in={isEditMode}>
        <button title="Done" onClick={handleSubmitClick}>
          <DoneIcon />
        </button>
      </Zoom>

      <Zoom in={isEditMode}>
        <button title="Cancel" onClick={handleCancelClick}>
          <CancelIcon />
        </button>
      </Zoom>
    </div>
  );
}

export default Note;
