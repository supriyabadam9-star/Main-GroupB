import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../config";

const FileNewClaimStep2 = () => {
  const navigate = useNavigate();
  const claimId = localStorage.getItem("claim_id");

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploaded(false);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    if (!claimId) {
      alert("Claim ID not found. Please start again.");
      navigate("/claims/file/step1");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${baseURL}/claims/${claimId}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      setUploaded(true);
      alert("Document uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("Error uploading document");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen
                bg-gradient-to-br
                from-slate-100 via-blue-50 to-indigo-100
                dark:from-gray-950 dark:via-gray-900 dark:to-black">

      {/* HEADER */}
      <div className="max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl font-semibold text-slate-800">
          File New Claim
        </h1>
        <p className="text-slate-500 mt-1">
          Step 2 of 3 · Upload documents
        </p>
      </div>

      {/* CARD */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 space-y-8">
        {/* UPLOAD AREA */}
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-3">
            Upload Supporting Document
          </label>

          <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center bg-slate-50">
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              onChange={handleFileChange}
              className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 cursor-pointer"
            />

            <p className="text-xs text-slate-500 mt-2">
              Accepted formats: PDF, JPG, PNG
            </p>
          </div>
        </div>

        {/* UPLOAD BUTTON */}
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`w-full px-6 py-3 rounded-lg text-white transition ${
            uploading
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {uploading ? "Uploading..." : "Upload Document"}
        </button>

        {/* STATUS */}
        {uploaded && (
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <span className="text-lg">✔</span>
            Document uploaded successfully
          </div>
        )}

        {/* NAVIGATION */}
        <div className="flex justify-between pt-6">
          <button
            onClick={() => navigate("/claims/file/step1")}
            className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 transition"
          >
            ← Back
          </button>

          <button
            onClick={() => navigate("/claims/file/step3")}
            disabled={!uploaded}
            className={`px-6 py-2.5 rounded-lg text-white transition ${
              uploaded
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-slate-400 cursor-not-allowed"
            }`}
          >
            Next: Review →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileNewClaimStep2;
