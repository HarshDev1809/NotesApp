import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNoteById, updateNote } from "../../api/notes/notes.api";
import HomePageHeader from "../../Components/HomePageHeader/HomePageHeader";
import Loader from "../../Components/Loader/Loader";
import { inputDate , outputDate} from "../../Modules/date";
import "./EditNotePage.css"
import Footer from "../../Components/Footer/Footer";
import Swal from "sweetalert2";
const {todayDateString, todayDate} = require("../../Modules/date");

function EditNotePage() {
    const navigate = useNavigate();
  const { id } = useParams();
  const [noteDate, setNoteDate] = useState("");
  const [noteHeading, setNoteHeading] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [inputNoteDate, setInputNoteDate] = useState("")
  const noteDetails = {
    date: noteDate,
    heading : noteHeading,
    body : noteBody
  }

  const fetchNote = async () => {
    const response = await getNoteById(id);
    console.log();
    setNoteDate(response.data.date);
    setInputNoteDate(inputDate(response.data.date));
    setNoteHeading(response.data.heading);
    setNoteBody(response.data.body);
    setIsLoading(false);
  };

  const cancelChanges = () => {
    // if(window.confirm("Cancel Changes ?")){
    //     navigate(`/note/${id}`);
    // }
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You are about to cancel changes.",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#f00",
      cancelButtonColor: "#0f0",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/note/${id}`);
      }
    });
  };

  function reverseDate(s){
    s = s.split("-").reverse();
    return `${s[0]}-${s[1]}-${s[2]}`
    
}

  const saveChanges = async (e) =>{
    e.preventDefault()
    // if(window.confirm("Save Changes ?")){
    //     const date = outputDate(noteDate);
    //     // setNoteDate(date)
    //     console.log(date);
    //     console.log(noteDetails)    
    //     await updateNote(id,noteDetails);
    //     navigate("/home");
    // }
    Swal.fire({
      icon: "question",
      title: "Save Changes ?",
      text: "Are you sure you want to save changes?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#f00",
      cancelButtonColor: "#0f0",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const date = outputDate(noteDate);
        // setNoteDate(date)
        console.log(date);
        await updateNote(id, noteDetails);
        navigate("/home");
      }
    });
  }

  const changeDate =  (e) =>{
    
    if(e.target.value !== reverseDate(todayDate())){
      if(window.confirm(`Today's Date is ${todayDateString()}. Change Date to ${outputDate(e.target.value)} ? `)){
        setInputNoteDate(e.target.value);
      setNoteDate(outputDate(e.target.value));
    }
    }
    setInputNoteDate(e.target.value);
    setNoteDate(outputDate(e.target.value));
  }

  const changeHeading = (e) =>{
    setNoteHeading(e.target.value);
  }

  const changeBody = (e) => {
    setNoteBody(e.target.value);
  }

  const showNote = () => {
    return (
      <div className="edit-note-div">
        <div className="edit-note w-100">
          <form onSubmit = {saveChanges}>
            <div className="date">
              <input className="rounded-2 p-1 bg-light border" type="date" value={inputNoteDate} onChange = {changeDate}></input>
            </div>
            <div className="heading">
              <input type="text" className="rounded-2 border bg-light p-1" value={noteHeading} onChange = {changeHeading}></input>
            </div>
            <div className="body">
              <textarea value={noteBody} className="rounded-2 bg-light border p-2 h-100" rows={2} required onChange = {changeBody}></textarea>
            </div>
            <div className="footer-div">
              <button type="button" className="rounded border bg-black text-white" onClick={cancelChanges}>
                Cancel
              </button>
              <button type="submit" className="rounded border bg-black text-white">save</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  useEffect(() => {
    fetchNote();
  }, []);

  return (
    <div className="edit-note-div-main">
      <HomePageHeader />
      {isLoading ? <Loader /> : showNote()}
      {/* <footer className="footer vw-100 border vh-20">
            <Footer/>
        </footer> */}
    </div>
  );
}

export default EditNotePage;
