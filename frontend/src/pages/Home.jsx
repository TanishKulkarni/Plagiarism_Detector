import AddReferenceForm from '../components/AddReferenceForm';
import CheckPlagiarismForm from '../components/CheckPlagiarismForm';
import ClearReferencesButton from '../components/ClearReferencesButton';
import FileUploadForm from '../components/FileUploadForm';
import '../styles/App.css';

export default function Home() {
  return (
    <div className="container">
      <h1>🧠 Plagiarism Checker</h1>

      {/* Upload File and Extract Text */}
      <section className="section">
        <h2>📁 Upload File for Text Extraction</h2>
        <FileUploadForm />
      </section>

      {/* Add Reference Text
      <section className="section">
        <h2>➕ Add Reference Text</h2>
        <AddReferenceForm />
      </section> */}

      {/* Check Plagiarism */}
      <section className="section">
        <h2>🔍 Check Plagiarism</h2>
        <CheckPlagiarismForm />
      </section>

      {/* Clear All References */}
      <section className="section">
        <h2>🧹 Clear References</h2>
        <ClearReferencesButton />
      </section>
    </div>
  );
}
