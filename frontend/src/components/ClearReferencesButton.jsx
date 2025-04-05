import { clearReferences } from '../api/plagiarismApi';

export default function ClearReferencesButton() {
  const handleClick = async () => {
    await clearReferences();
    alert('All reference texts cleared.');
  };

  return <button onClick={handleClick}>Clear All References</button>;
}
