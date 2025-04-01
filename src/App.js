import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="container">
      <h1>Party Message Board</h1>
      
      {submitted ? (
        <div className="thank-you">
          <h1>🎉 Thanks for your message gato!  🎉</h1>
          <p>Your anonymous contribution has been recorded.</p>
        </div>
      ) : (
        <form
          name="party-messages"
          method="POST"
          data-netlify="true"
          netlify
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const encodedData = new URLSearchParams(formData).toString();
            
            fetch("/", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: encodedData,
            })
              .then(() => setSubmitted(true))
              .catch(() => alert("Submission failed!"));
          }}
        >
          <input type="hidden" name="form-name" value="party-messages" />
          <textarea 
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default App;