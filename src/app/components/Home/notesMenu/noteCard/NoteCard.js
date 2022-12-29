import "./NoteCard.css";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import Constants from "../../../../constants/Constants";

const NoteCard = (props) => {
  const user = useSelector((state) => state.auth.currentUser);
  const token = useSelector((state) => state.auth.token);
  const url = Constants.API_URL_DELETE_NOTE;

  const onClickEditButton = () => {
    if (props.noteOwner != user.email) {
      alert("You cannot edit a note that doesn't belong to you.");
    } else {
      var currentNote = {
        id: props.id,
        title: props.title,
        description: props.description,
        owner: props.noteOwner,
        dateCreated: props.dateCreated,
      };

      props.isEditing(currentNote);
    }
  };

  function deleteNote() {
    const toDeleteUrl = url + `/${props.id}?currentUserEmail=${user.email}`;
    console.log(toDeleteUrl);

    fetch(toDeleteUrl, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data == true) {
          alert("Succesfully deleted");
        } else {
          alert("You are not authorize to delete this post");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  const onClickDeleteButton = async () => {
    if (props.noteOwner != user.email) {
      alert("You cannot delete a note that doesn't belong to you.");
    } else {
      var response = window.confirm(
        "Are you sure you want to delete this note??"
      );
      if (response) {
        deleteNote();
      } else {
        console.log("no cancel");
      }
    }
  };

  return (
    <section className="card">
      <span className="title">
        <h2>{props.title}</h2>
      </span>
      <span className="date-created">
        Date created:{" "}
        {format(Date.parse(props.dateCreated), "yyyy/MM/dd hh:mm a")}
      </span>
      <span className="posted-by">posted by: {props.noteOwner}</span>
      <span className="posted-by">id: {props.id}</span>

      <hr></hr>

      <div className="description">{props.description}</div>

      <div className="buttons">
        <button type="submit" className="edit" onClick={onClickEditButton}>
          Edit
        </button>

        <button type="submit" className="delete" onClick={onClickDeleteButton}>
          Delete
        </button>
      </div>
    </section>
  );
};

export default NoteCard;
