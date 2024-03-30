import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright by Alberto Gomez ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
