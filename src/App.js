import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

function App() {
  const [job, setJob] = useState("");
  const [url, setUrl] = useState("");
  const [jobs, setJobs] = useState([]);

  const saveJob = async () => {
    if (!job || !url) return;
    await addDoc(collection(db, "jobs"), {
      job,
      url,
      status: "Applied",
    });
    setJob("");
    setUrl("");
    fetchJobs();
  };

  const fetchJobs = async () => {
    const querySnapshot = await getDocs(collection(db, "jobs"));
    const data = querySnapshot.docs.map(doc => doc.data());
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Visa Job Tracker</h1>
      <input className="border p-2 mb-2 w-full" placeholder="Job Title" value={job} onChange={(e) => setJob(e.target.value)} />
      <input className="border p-2 mb-2 w-full" placeholder="Job URL" value={url} onChange={(e) => setUrl(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={saveJob}>Save Job</button>

      <h2 className="mt-6 text-lg font-semibold">My Applications</h2>
      {jobs.map((j, idx) => (
        <div key={idx} className="border p-2 mt-2">
          <p>{j.job}</p>
          <a href={j.url} className="text-blue-500 underline" target="_blank" rel="noreferrer">View</a>
          <p>Status: {j.status}</p>
        </div>
      ))}
    </div>
  );
}

export default App;