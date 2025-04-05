import { useState } from 'react';
import { checkPlagiarism } from '../api/plagiarismApi';
import PlagiarizedResults from './PlagiarizedResults';

export default function CheckPlagiarismForm() {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); // 👈 Loader state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 👈 Start loader
    try {
      const res = await checkPlagiarism(inputText);
      setResults(res.data.plagiarized_phrases);
    } catch (err) {
      console.error('Error during plagiarism check:', err);
    } finally {
      setLoading(false); // 👈 End loader
    }
  };

  return (
    <div className="form">
      {loading && (
        <div className="loader-overlay">
          <div className="spinner"></div>
          <p>Checking for plagiarism...</p>
        </div>
      )}

      <h2>Check for Plagiarism</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={4}
          required
        />
        <button type="submit">Check</button>
      </form>

      <PlagiarizedResults results={results} />
    </div>
  );
}