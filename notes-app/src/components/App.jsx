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

  // if (loading) return "Loading..."; 

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
    axios.delete(`/notes/${id}`)
      .then(res => {
        console.log(res.data);
        updateList();
      });
  }

  return (
    <div className="page-container">
      <Header />
      <CreateArea onAdd={addNote} updateList={updateList} />
      {loading && <div className="loading-container"><img src='../loading.gif' alt="loading..."/></div>} 
      
      <div className="flex-notes-container">
      {!loading && 
        <div className="notes-container-notloading">
          {notes.map(noteItem => {
        return (
          <Note className="flex-note"
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            updateList={updateList}
          />
        );
      })}
        </div>
      }    
      </div>
      
        <Footer />
    </div>
  );
}

export default App;
