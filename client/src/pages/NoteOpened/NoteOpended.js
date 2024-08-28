import { useNavigate, useParams } from "react-router-dom";
import HomePageHeader from "../../Components/HomePageHeader/HomePageHeader";
import { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";
import { deleteNoteId, getNoteById } from "../../api/notes/notes.api";
import "./NoteOpened.css";
import Footer from "../../Components/Footer/Footer";
import Swal from "sweetalert2";

function NoteOpened() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, changeIsLoading] = useState(true);
  const [noteDate, setNoteDate] = useState("");
  const [noteHeading, setNoteHeading] = useState("");
  const [noteBody, setNoteBody] = useState("");

  const fetchNote = async () => {
    try {
      let response = await getNoteById(id);
      setNoteDate(response.data.date);
      setNoteHeading(response.data.heading);
      setNoteBody(response.data.body);
    } catch (err) {
      console.log(err);
    }
    changeIsLoading(false);
  };

  const deleteNote = async () => {
    // if (window.confirm("Delete Note ?")) {
    //   await deleteNoteId(id);
    //   navigate("/home");
    // }
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You are about to delete this note.",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#f00",
      cancelButtonColor: "#0f0",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNoteId(id);
        navigate("/home");
      }
    });
  };

  const editNote = () => {
    // if (window.confirm("Edit Note ?")) {
    //   navigate(`/note/edit/${id}`);
    // }
    Swal.fire({
      icon: "question",
      title: "Edit Note ?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#f00",
      cancelButtonColor: "#0f0",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/note/edit/${id}`);
      }
    });
  };

  function showNotes() {
    return (
      <div className="open-note w-100 d-flex flex-column justify-content-start">
        <div className="date">
          <h6 className="rounded-2 p-2 border h-100 d-flex bg-light align-items-center">{noteDate}</h6>
        </div>
        <div className="heading">
          <h1 className="rounded-2 border p-2 h-100 d-flex bg-light align-items-center">{noteHeading}</h1>
        </div>
        <div className="body">
          <pre className="rounded-2 border p-2 h-100 bg-light">{noteBody}</pre>
        </div>
        <div className="footer-div">
          <button type="button" className="rounded border bg-black text-white" onClick={deleteNote}>
            delete
          </button>
          <button type="button" className="rounded border bg-black text-white" onClick={editNote}>
            Edit
          </button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    fetchNote();

    return () => {};
  });

  return (
    <div className="opened-note-div">
      <HomePageHeader />
      {isLoading ? <Loader /> : showNotes()}
      {/* <footer className="footer vw-100 border vh-20">
            <Footer/>
        </footer> */}
    </div>
  );
}

export default NoteOpened;