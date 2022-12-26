import Header from "../header/Header";
import { useState } from "react";

import NotesMenu from "./notesMenu/NotesMenu";
const Home = () => {
  return (
    <div>
      <header>
        <Header></Header>
      </header>
      <NotesMenu />
    </div>
  );
};

export default Home;
