import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likedQuotes, setLikedQuotes] = useState(() => {
    const saved = localStorage.getItem("likedQuotes");
    return saved ? JSON.parse(saved) : [];
  });
  const getQuote = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/quotes/random");
      const data = await response.json();
      setQuote(data.quote);
      setAuthor(data.author);
      setLiked(false);
      setLoading(false);
    } catch (error) {
      setQuote("Unable to fetch quote");
      setAuthor("");
      setLoading(false);
    }
  };
  useEffect(() => {
    getQuote();
  }, []);
  useEffect(() => {
    localStorage.setItem("likedQuotes", JSON.stringify(likedQuotes));
  }, [likedQuotes]);
  const handleLike = () => {
    if (!liked) {
      setLikedQuotes([...likedQuotes, { quote, author }]);
      setLiked(true);
    }
  };
  const handleReset = () => {
    setLikedQuotes([]);           
    setLiked(false);             
    localStorage.removeItem("likedQuotes");  
  };
  return (
    <div className="container">
      <div className="leftSection">
        {/* Quote Card */}
        <div className="card">
          <h1>Daily Motivation</h1>
          {loading ? (
            <p>Loading quote...</p>
          ) : (
            <>
              <p className="quote">"{quote}"</p>
              <p className="author">- {author}</p>
            </>
          )}
          <div className="buttons">
            <button onClick={getQuote} disabled={loading}>
              New Quote
            </button>
            <button onClick={handleLike}>
              {liked ? "Liked" : "Like"}
            </button>
            <button onClick={handleReset}>
              Reset
            </button>
          </div>
          <p className="likes">Total Liked Quotes: {likedQuotes.length}</p>
        </div>
        {/* Liked Quotes Card */}
        <div className="likedCard">
          <h2>Liked Quotes</h2>
          {likedQuotes.length === 0 ? (
            <p>No liked quotes yet</p>
          ) : (
            likedQuotes.map((item, index) => (
              <div key={index} className="likedItem">
                <p>"{item.quote}"</p>
                <small>- {item.author}</small>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
export default App;