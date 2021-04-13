import React from "react";

export function InputTitle({handleChange, note,}) {
    return (
        <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            maxLength = "20"
            autoComplete = "false"
            autoFocus
          />
    )
}

export function InputContent({handleChange, note, rowExpand}) {
    return (
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={rowExpand ? rowExpand : "3"}
        />
    )
}
