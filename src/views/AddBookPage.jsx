import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBook } from "../store/booksSlice.js";
import { db } from "../firebase/config.js";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { selectUser } from "../store/userSlice.js";
import { useSelector } from "react-redux";



function AddBookPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  async function handleAddBook(e) {
    e.preventDefault();

    const newBook = {
      title: document.querySelector("input[name=title]").value,
      cover: document.querySelector("input[name=cover]").value,
      isRead: false,
      author: document.querySelector("input[name=author]").value,
      synopsis: document.querySelector("textarea[name=synopsis]").value,
      uid: user.id,
    };

    if (newBook.title && newBook.cover && newBook.author) {
 
      try {
        const docRef = await addDoc(collection(db, "book"), newBook);
        console.log("Document written with ID:", docRef.id);
      } catch (error) {
        console.error("Error adding document:", error);
      }
      alert("Book created successfully!");
      navigate("/");
    } else {
      alert("Please fill the mandatory fields.");
    }
  }

  const pageTitle = "Add Book";

  return (
    <>
      <div className="container">
        <Header pageTitle={pageTitle} />

        <form className="add-form">
          <div className="form-control">
            <label>Title *</label>
            <input type="text" name="title" placeholder="Add Book Title" />
          </div>
          <div className="form-control">
            <label>Book Cover *</label>
            <input type="text" name="cover" placeholder="Add Cover" />
          </div>

          <div className="form-control">
            <label>Author *</label>
            <input type="text" name="author" placeholder="Add Author" />
          </div>

          <div className="form-control">
            <label>Synopsis</label>
            <textarea
              type="text"
              name="synopsis"
              placeholder="Add a synopsis..."
            />
          </div>

          <button onClick={(e) => handleAddBook(e)} className="btn btn-block">
            Save Book
          </button>
        </form>
      </div>
    </>
  );
}

export default AddBookPage;
