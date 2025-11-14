import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Components/Navbar";
import ResumeCard from "./Components/ResumeCard";
import { usePuterStore } from "./lib/puter.js";

const Home = () => {
  const init = usePuterStore((s) => s.init);
  const isLoading = usePuterStore((s) => s.isLoading);
  const auth = usePuterStore((s) => s.auth);
  const kv = usePuterStore((s) => s.kv);

  const navigate = useNavigate();

  // Store resumes
  const [resumes, setResumes] = useState([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  // Initialize puter.js
  useEffect(() => {
    init();
  }, [init]);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [isLoading, auth.isAuthenticated, navigate]);

  // Load stored resumes from KV
  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const list = await kv.list("resume:*", true); // returns key + value

      const parsed = list?.map((item) => JSON.parse(item.value)) || [];
      setResumes(parsed);

      setLoadingResumes(false);
    };

    loadResumes();
  }, []);

  return (
    <main className="bg-[url('src/assets/images/bg-main.svg')] bg-cover min-h-screen">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Applications & Resume Ratings</h1>

          {!loadingResumes && resumes.length === 0 ? (
            <h2>No resumes found. Upload your first resume to get feedback.</h2>
          ) : (
            <h2>Review your submissions and check AI-powered feedback.</h2>
          )}
        </div>

        {/* Loading Animation */}
        {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img
              src="/src/assets/images/resume-scan-2.gif"
              className="w-[200px]"
              alt="loading"
            />
          </div>
        )}

        {/* Resume Cards */}
        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {/* No resumes found */}
        {!loadingResumes && resumes.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
              Upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
