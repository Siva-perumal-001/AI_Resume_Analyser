import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePuterStore } from "../lib/puter.js";

const Wipe = () => {
  const { auth, isLoading, error, fs, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  const loadFiles = async () => {
    const list = await fs.readDir("./"); // returns array of FS items
    setFiles(list || []);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/wipe");
    }
  }, [isLoading, auth.isAuthenticated, navigate]);

  const handleDelete = async () => {
    for (const file of files) {
      await fs.delete(file.path);
    }
    await kv.flush(); // clears all KV data
    loadFiles();
  };

  if (isLoading) {
    return <div className="p-4 text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {String(error)}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="font-bold text-xl mb-4">
        Authenticated as: {auth.user?.username}
      </h2>

      <h3 className="font-semibold mb-2">Existing Files:</h3>

      <div className="flex flex-col gap-2 mb-6">
        {files.length === 0 && <p>No files found.</p>}

        {files.map((file) => (
          <div
            key={file.id || file.path}
            className="flex items-center gap-4 p-2 border-b border-gray-200"
          >
            <p className="text-gray-700">{file.name}</p>
          </div>
        ))}
      </div>

      <button
        className="bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-700"
        onClick={handleDelete}
      >
        Wipe App Data
      </button>
    </div>
  );
};

export default Wipe;
