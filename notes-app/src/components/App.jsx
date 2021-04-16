import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  const [isUpdatedList, setUpdatedList] = useState([true])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
    //'http://localhost:5000/notes/'
  axios.get('/notes/')
    .then(res => {
      setLoading(false)
      setUpdatedList(true)
      setNotes(res.data)
    })
    .catch(err => {console.log(err);})
    }
    fetchData();
  }, [isUpdatedList]);

  if (loading) return "Loading..."; 

  function updateList() {
    setUpdatedList(false)
  }

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
    updateList();
  }

  function deleteNote(id) {
    //`http://localhost:5000/notes/${id}`
    //https://note-keeps.herokuapp.com
    axios.delete(`/notes/${id}`)
      .then(res => {
        console.log(res.data);
        updateList();
      });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} updateList={updateList}/>
      {notes.map(noteItem => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            updateList={updateList}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
