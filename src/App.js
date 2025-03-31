import { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // We'll implement the server part next
      const response = await fetch('http://localhost:5001/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit. Are you connected to the party WiFi?');
    } finally {
      setIsSubmitting(false);
    }
  };

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