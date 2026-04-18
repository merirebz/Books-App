
import { useState, useRef } from "react";
import "./book.css";

function App() {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const inputRef = useRef(null);
  const resultRef = useRef(null);

  const apiKey = "your_api_key_here";

  function handleChange(e) {
    setBook(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!book.trim()) return;

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${book}&key=${apiKey}&maxResults=20`
      );

      const data = await response.json();
      setResult(data.items || []);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);

      inputRef.current.focus();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="header">
      
      <nav className="navbar">
        <h2 className="logo">BOOKS</h2>

        <ul className="nav-links">
          <li>CATALOGUE</li>
          <li>GALLERY</li>
          <li>ABOUT US</li>
          <li>CONTACT</li>
        </ul>

        <div className="auth">
          <span>LOGIN</span>
          <button className="signup">SIGN UP</button>
        </div>
      </nav>

      <div className="hero">
        <div className="hero-left">
          <h1 className="title-main">Discover Your Next Favorite Book</h1>
          <p className="desc">
             Explore thousands of books from every genre. Search by title and find the perfect read in seconds.
          </p>

          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              placeholder="BOOK TITLE"
              className="input-box"
              type="text"
              value={book}
              onChange={handleChange}
            />


            <button className="btn-search">SEARCH</button>
          </form>
        </div>

        <div className="hero-right">
          <img src="./header.png" alt="books" />
        </div>
      </div>

      <div className="res" ref={resultRef}>
        {result.map((item) => (
          <div key={item.id} className="book">
            <a href={item.volumeInfo.previewLink} target="_blank" rel="noreferrer">
              {item.volumeInfo.imageLinks?.thumbnail && (
                <img
                  src={item.volumeInfo.imageLinks.thumbnail}
                  alt={item.volumeInfo.title}
                />
              )}
            </a>
            <h3>{item.volumeInfo.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
