import { useNavigate } from "react-router-dom";
import "./NewNote.css";
import { useEffect, useState } from "react";
import { createNote } from "../../api/notes/notes.api";
import swal from "sweetalert2";
const { todayDateString, todayDate } = require("../../Modules/date");

function NewNote() {
  const navigate = useNavigate();
  const [noteHeading, changeNoteHeading] = useState("");
  const [noteBody, changeNoteBody] = useState("");
  const noteDetails = {
    date: todayDateString(),
    heading: noteHeading,
    body: noteBody,
  };

  function changeHeading(e) {
    changeNoteHeading(e.target.value);
  }

  function changeBody(e) {
    changeNoteBody(e.target.value);
  }

  function cancelChanges() {
    swal
      .fire({
        icon: "warning",
        title: "Are you sure?",
        text: "You are about to cancel changes.",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: "#f00",
        cancelButtonColor: "#0f0",
      })
      .then((result) => {
        if (result.isConfirmed) {
          navigate("/home");
        }
      });
  }

  async function saveChanges(e) {
    e.preventDefault();
    // if (window.confirm("Save Changes ?")) {
    //   try {
    //     await createNote(noteDetails);
    //     navigate("/home");
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    swal
      .fire({
        icon: "question",
        title: "Save Changes ?",
        text: "Are you sure you want to save changes?",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: "#f00",
        cancelButtonColor: "#0f0",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await createNote(noteDetails);
            navigate("/home");
          } catch (err) {
            console.log(err);
          }
        }
      });
  }

  return (
    <div className="new-note-div">
      <div className="new-note p-2">
        <form onSubmit={saveChanges}>
          <div className="new-note-date">
            <p className="rounded border p-1">{todayDateString()}</p>
          </div>
          <div className="new-note-heading">
            <input
              className="rounded border p-1"
              type="text"
              value={noteHeading}
              onChange={changeHeading}
            ></input>
          </div>
          <div className="new-note-body">
            <textarea
              className="rounded border p-1"
              value={noteBody}
              onChange={changeBody}
              required
            ></textarea>
          </div>
          <div className="footer-div">
            <button type="button" className="border" onClick={cancelChanges}>
              Cancel
            </button>
            <button type="submit" className="border">
              save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewNote;
