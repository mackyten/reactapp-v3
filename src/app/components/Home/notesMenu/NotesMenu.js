import NoteCard from "./noteCard/NoteCard";
import "./NotesMenu.css";
import { useEffect, useState } from "react";
import Constants from "../../../constants/Constants";
import AddNoteForm from "./addNoteForm/AddNoteForm";
import { useSelector } from "react-redux";
import EditForm from "./editForm/EditForm";
import { ErrorPage } from "./ErrorPage/ErrorPage";

const NotesMenu = (props) => {
  const url = Constants.API_URL_GET_ALL_NOTES;
  const [notes, setNotes] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(false);

  const [dataToUpdate, setDataToUpdate] = useState(null);

  function isEditingHandler(_dataToUpdate) {
    setDataToUpdate(_dataToUpdate);
    console.log(_dataToUpdate);
    setIsEditing(true);
  }

  function cancelEditing() {
    setIsEditing(false);
  }

  useEffect(() => {
    getData();
  });

  const getData = async () => {
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((notesFromServer) => {
        setNotes(notesFromServer);
      })
      .catch((e) => {
        console.log(e);
        setError(true);
      });
  };

  const reversed = [...notes].reverse();

  const notesMenu = () => {
    return (
      <div className="notes-menu">
        <AddNoteForm reload={getData} />
        {reversed.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title}
            description={note.description}
            dateCreated={note.dateCreated}
            noteOwner={note.owner}
            isEditing={isEditingHandler}
          ></NoteCard>
        ))}
      </div>
    );
  };
  return (
    <div>
      {error ? (
        <ErrorPage />
      ) : isEditing ? (
        <EditForm data={dataToUpdate} cancelEditing={cancelEditing} />
      ) : (
        notesMenu()
      )}
    </div>
  );
};

export default NotesMenu;
