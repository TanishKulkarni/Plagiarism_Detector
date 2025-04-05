import { useState } from 'react';
import { addReferenceText } from '../api/plagiarismApi';

export default function AddReferenceForm() {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addReferenceText(text);
    setText('');
    alert('Reference text added.');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Add Reference Text</h2>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} required />
      <button type="submit">Add</button>
    </form>
  );
}