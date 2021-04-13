import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  // const [loading, setLoading] = useState(true)

  useEffect(() => {
    // setLoading(true)
    //'http://localhost:5000/notes/'
    axios.get('/notes/')
    .then(res => {
      // setLoading(false)
      setNotes(res.data)
    })
    .catch(err => {console.log(err);})
  }, [notes]);

  // if (loading) return "Loading..."; 

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    //`http://localhost:5000/notes/${id}`
    //https://note-keeps.herokuapp.com
    axios.delete(`/notes/${id}`)
      .then(res => console.log(res.data));
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map(noteItem => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
