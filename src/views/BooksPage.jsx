import Book from "../components/Book.jsx";
import Header from "../components/Header.jsx";
import { useSelector } from "react-redux";
import { selectBooks } from "../store/booksSlice.js";
import { selectUser } from "../store/userSlice.js";
import { db } from "../firebase/config.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import FullPageLoader from "../components/FullPageLoader.jsx";
function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setloading] = useState(true);
  // const books = useSelector(selectBooks);
  const pageTitle = "📖 Book List with Router, Redux & Firebase";
  const user = useSelector(selectUser);

  useEffect(() => {
    async function fetchBooks() {
      const q = query(
        collection(db, "book"),
        where("uid", "==", user.id)
      );

      const querySnapshot = await getDocs(q);
      const booksArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksArray);
      console.log('xxxxxxxxxxxxxxxxx',booksArray[0].id );
      
      if (books) {
        setloading(false);
      }
    }

    fetchBooks();
  }, []);
  console.log(books);

  return (
    <>
      {loading ? (
        <FullPageLoader />
      ) : (
        <div className="container">
          <Header pageTitle={pageTitle} />
          <div className="books-container">
            <div className="books-list">
              {books.map((book) => (
                <Book key={book.id} book={book} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BooksPage;
