import { useState } from "react";
import Constants from "../../../../constants/Constants";
import { useSelector } from "react-redux";

function EditForm(props) {
  const [updatedTitle, setUpdatedTitle] = useState(props.title);
  const token = useSelector((state) => state.auth.token);
  const [updatedDescription, setUpdatedDescription] = useState(
    props.description
  );

  function onUpdateNoteHandler(event) {
    const url = Constants.API_URL_PUT_NOTE;
    event.preventDefault();

    const toUpdate = {
      id: props.id,
      title: updatedTitle,
      description: updatedDescription,
      owner: props.owner,
      createdDate: props.createdDate,
    };

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(toUpdate),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        props.setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function onChangeTitle(event) {
    setUpdatedTitle(event.target.value);
  }

  function onChangeDescription(event) {
    setUpdatedDescription(event.target.value);
  }

  return (
    <div className="form">
      <form onSubmit={onUpdateNoteHandler}>
        <p>id: {props.id}</p>

        <label htmlFor="title">Title</label>
        <input
          type="text"
          onChange={onChangeTitle}
          value={updatedTitle}
          id="title"
        ></input>

        <label htmlFor="description">Description</label>
        <input
          type="text"
          onChange={onChangeDescription}
          value={updatedDescription}
          id="description"
        ></input>

        <button type="submit" className="update">
          Update
        </button>

        <button
          type="submit"
          className="cancel"
          onClick={props.updateEditingMode}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditForm;
