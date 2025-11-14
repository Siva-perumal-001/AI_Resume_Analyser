import Navbar from "./Components/Navbar";
import ResumeCard from "./Components/ResumeCard";
import { resumes } from "./constants";
import { useEffect } from "react";
import { usePuterStore } from "./lib/puter.js";
import { useNavigate } from "react-router-dom";

const App = () => {
  const init = usePuterStore((s) => s.init);
  const isLoading = usePuterStore((s) => s.isLoading);
  const isAuthenticated = usePuterStore((s) => s.auth.isAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [isLoading, isAuthenticated, navigate]);

  return (
    <main className="bg-[url('./assets/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Applications & Resume Ratings</h1>
          <h2>Review your submissions and check AI-powered feedback</h2>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default App;
