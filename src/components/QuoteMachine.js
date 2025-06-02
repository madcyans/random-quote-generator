import React, { useState } from 'react';

// A sample list of quotes. This array can later be replaced by data from an API.
const quotes = [
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "The best way to predict your future is to create it.", author: "Abraham Lincoln" },
  { text: "Fix the cause, not the symptom.", author: "Steve Maguire" },
  { text: "The most dangerous phrase in the language is, ‘We’ve always done it this way.’", author: "Buddha" },
  { text: "In the beginner’s mind, there are many possibilities; in the expert’s mind, there are few.", author: "Shunryu Suzuki"},
  { text: "You might not think that programmers are artists, but programming is an extremely creative profession. It’s logic-based creativity.", author: "John Romero"},
  { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
];

// Define an array of background colors for the animation.
const colors = [
  "#ffadad", // pastel red
  "#ffd6a5", // pastel peach
  "#fdffb6", // pastel yellow
  "#caffbf", // pastel green
  "#9bf6ff", // pastel cyan
  "#a0c4ff", // pastel blue
  "#bdb2ff", // pastel lavender
];

function QuoteMachine() {
  function getRandomQuoteAndRemove(array) {
    const copy = [...array]; // Create a shallow copy of the array
    const randomIndex = Math.floor(Math.random() * copy.length); // Get a random index
    const selected = copy[randomIndex]; // Select the quote at that index
    copy.splice(randomIndex, 1); // Remove the selected quote from the copy
    return { selected, remaining: copy }; // Return the selected quote and the remaining quotes
  }
  const initial = getRandomQuoteAndRemove(quotes); // Get the first random quote and the remaining quotes
  const [currentQuote, setCurrentQuote] = useState(initial.selected); // Set the initial quote to the first random quote
  const [unusedQuotes, setUnusedQuotes] = useState(initial.remaining); // Set the remaining quotes
  const [bgColor, setBgColor] = useState(colors[0]); // Set the initial background color to the first color in the array
  const [fade, setFade] = useState(true); // State variable to control the fade effect

  // Updates the quote when the user clicks the button.
  const handleNewQuote = () => {
    // Fade out the text.
    setFade(false);
    setTimeout(() => {
      let availableQuotes;
      // If there are still unused quotes, use those.
      if (unusedQuotes.length > 0) {
        availableQuotes = unusedQuotes;
      } else {
        // All quotes have been used.
        // If there's more than one quote, filter out the current one to avoid an immediate repeat.
        availableQuotes = quotes.length > 1 
          ? quotes.filter(q => q.text !== currentQuote.text)
          : [...quotes];
      }
      
      // Pick a random quote from the available pool.
      const { selected, remaining } = getRandomQuoteAndRemove(availableQuotes);
      setCurrentQuote(selected);
      setUnusedQuotes(remaining);

      // Choose a new background color that's different from the current one.
      let newColor = colors[Math.floor(Math.random() * colors.length)];
      while (newColor === bgColor && colors.length > 1) {
        newColor = colors[Math.floor(Math.random() * colors.length)];
      }
      setBgColor(newColor);

      //Fade the text back in.
      setFade(true);
    }, 500); // 500ms delay for the fade-out animation
  };

  return (
    // Wrapper element with id="quote-box"
    <div
    id="quote-box"
    style={{
      backgroundColor: bgColor,
      transition: "background-color 1s ease-in-out",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "20px",
    }}
    >
        <div
        style={{
            backgroundColor: "#f5f5f5",
            border: "2px solid #333",
            borderRadius: "10px",
            padding: "clamp(30px, 5vw, 50px",
            maxWidth: "600px",
            width: "100%",
        }}
        >
        <div
          id="quote-text-container"
          style={{
            display: "flex",
            alignItems: "flex-start",
            textAlign: "left",
            opacity: fade ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          {/* Opening Quote Symbol */}
          <span
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "5em", // Opening quote symbol
              color: "#ccc",
              display: "block",
              marginBottom: "-0.2em",
            }}
          >
            “
          </span>
        {/* Element with id="text" displays the quote */}
        <p id="text" style={{ 
          fontFamily: "'Georgia', serif",
          fontSize: "clamp(1.5em, 4vw, 2em)", 
          marginBottom: "20px", 
          textAlign: "center", 
          opacity: fade ? 1 : 0, 
          transition: "opacity 0.5s ease-in-out" 
          }}>
            {currentQuote.text}  
        </p>
      </div>
        {/* Element with id="author" displays the quote's author */}
        <p id="author" style={{ 
          textAlign: "right", 
          fontStyle: "italic", 
          marginBottom: "20px",
          fontSize: "clamp(1em, 3vw, 1.5em)" 
          }}>
            - {currentQuote.author}
        </p>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between" 
          }}>
            
          {/* Clickable element (a button) with id="new-quote" updates the quote */}
            <button
            id="new-quote"
            onClick={handleNewQuote}
            style={{
                backgroundColor: "#333",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px",
            }}
            >
                New Quote
            </button>

            {/* Group of share buttons aligned on the right */}
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: "8px", // Smaller gap for the share buttons
            }}
          >
            {/* Clickable a element with id="tweet-quote" allows tweeting the quote */}
            <button 
                id="tweet-quote"
                onClick={() => window.open(
                  `https://twitter.com/intent/tweet?hashtags=quotes&related=freeCodeCamp&text=${encodeURIComponent(
                    `"${currentQuote.text}" ${currentQuote.author}`
                  )}`,
                  "_blank", "noopener,noreferrer"
                )}
                style={{
                  backgroundColor: "#1DA1F2",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
            >
                <i className="fa-brands fa-twitter"></i>
            </button>
            {/* Facebook Share Button */}
            <button
              id="facebook-quote"
              onClick={() =>
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    window.location.href
                  )}&quote=${encodeURIComponent(
                    `"${currentQuote.text}" - ${currentQuote.author}`
                  )}`,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              style={{
                backgroundColor: "#4267B2",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <i className="fa-brands fa-facebook" style={{ marginRight: "5px" }}></i>
            </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default QuoteMachine;