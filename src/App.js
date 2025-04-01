import { useState } from 'react';
import './App.css';

function App() {
  const [submitted, setSubmitted] = useState(false);


  if (submitted) {
    return (
      <div className="container">
        <div className="thank-you">
          <h1>🎉 Thanks for your message! 🎉</h1>
          <p>Your anonymous contribution has been recorded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Party Message Board</h1>
      <form
  name="party-messages"
  method="POST"
  data-netlify="true"
  netlify // ← Add this for redundancy
  onSubmit={(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Add URL encoding like a traditional form
    const encodedData = new URLSearchParams(formData).toString();
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }, // ← Critical header
      body: encodedData,
    })
      .then(() => setSubmitted(true))
      .catch(() => alert("Submission failed!"));
  }}
>
  {/* REQUIRED hidden fields */}
  <input type="hidden" name="form-name" value="party-messages" />
  
  {/* Your form field */}
  <textarea 
    name="message" 
    required 
    value={message} // ← Add this if using React state
    onChange={(e) => setMessage(e.target.value)} // ← Add this too
  />
  
  <button type="submit">Submit</button>
</form>
    </div>
  );
}

export default App;