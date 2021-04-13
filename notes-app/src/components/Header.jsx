import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";

function Header() {
  return (
    <header>
    <a href="/">
      <h1>
        <HighlightIcon />
        Note Keeps
      </h1>
      </a>
    </header>
  );
}

export default Header;
