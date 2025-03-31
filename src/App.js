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
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              fetch("/", {
                method: "POST",
                body: formData,
              })
                .then(() => setSubmitted(true))
                .catch(() => alert("Submission failed!"));
            }}
          >
  <input type="hidden" name="form-name" value="party-messages" />
  <textarea name="message" required />
  <button type="submit">Submit</button>
</form>
    </div>
  );
}

export default App;