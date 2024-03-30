import React, { useState, useEffect, useRef } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {

  const[isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({title: "", content: ""});
  const notesAreaRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notesAreaRef.current && !notesAreaRef.current.contains(event.target)) {
        setExpanded(false);
      }
    }

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
    
  }

  function submitNote() {
    if (note.title.trim() !== "" || note.content.trim() !== "") {
      props.onAdd(note);
      setNote({
        title: "",
        content: ""
      });
    }
  }
  
  

  function handleKeyPress(event) {
    if (event.key === "Enter" && !event.shiftKey && isExpanded) {
      submitNote();
      event.preventDefault();
    }
  }

  function expand(){
    setExpanded(true);
  }

  function handleSubmit(event) {
    event.preventDefault(); 
    submitNote();
  }
  
  return (
    <div ref={notesAreaRef} >
      <form className="create-note" onSubmit={handleSubmit}>
      {isExpanded && (
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
          autoFocus
          onKeyDown={handleKeyPress}
          
        />
        )}
        <textarea
          onClick={expand}
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Notes..."
          rows={isExpanded ? 3 : 1}
          onKeyDown={handleKeyPress}
        
        />
        <Zoom in={isExpanded}><Fab type="submit"><AddBoxIcon /></Fab></Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
