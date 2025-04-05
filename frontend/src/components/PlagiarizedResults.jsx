export default function PlagiarizedResults({ results }) {
    return (
      <div className="results">
        <h3>Plagiarized Phrases</h3>
        {results.length === 0 ? (
          <p>No plagiarism detected.</p>
        ) : (
          <ul>
            {results.map((phrase, index) => (
              <li key={index}>{phrase}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }