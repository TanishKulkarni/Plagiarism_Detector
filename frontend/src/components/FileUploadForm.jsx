import React, { useState } from "react";
import uploadFile from "../api/uploadApi";

const FileUploadForm = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file!");

    try {
      setLoading(true);
      const result = await uploadFile(file);
      setText(result.text || "No text extracted.");
    } catch (err) {
      console.error("❌ Error uploading file:", err);
      setText("❌ Error uploading file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload a Document</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">{loading ? "Uploading..." : "Upload"}</button>
      </form>
      {text && (
        <div className="upload-result">
          <h3>Extracted Text</h3>
          <pre>{text}</pre>
        </div>
      )}
    </div>
  );
};

export default FileUploadForm;
