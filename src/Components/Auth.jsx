import { useEffect } from "react";
import { usePuterStore } from "../lib/puter.js";
import { useLocation, useNavigate } from "react-router-dom";

const Auth = () => {
  const isLoading = usePuterStore((s) => s.isLoading);
  const isAuthenticated = usePuterStore((s) => s.auth.isAuthenticated);
  const signIn = usePuterStore((s) => s.auth.signIn);
  const signOut = usePuterStore((s) => s.auth.signOut);

  const location = useLocation();
  const navigate = useNavigate();
  const next = location.search.split("next=")[1] || "/";

  useEffect(() => {
    if (isAuthenticated) navigate(next);
  }, [isAuthenticated, next, navigate]);

  return (
    <main className="bg-[url('./assets/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center px-4">
      <div className="gradient-border shadow-lg w-full max-w-xl mx-auto">
        <section className="flex flex-col gap-6 bg-white rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-xl font-semibold text-gray-800">Welcome</h1>
            <h2 className="!text-xl text-gray-500 max-w-[550px] leading-relaxed">
              Log in to continue your job journey
            </h2>
          </div>

          <div>
            {isLoading ? (
              <button className="w-full py-3 rounded-full bg-gray-800 text-white animate-pulse">
                Signing you in...
              </button>
            ) : (
              <>
                {isAuthenticated ? (
                  <button
                    className="w-full py-3 rounded-full bg-gray-800 text-white hover:bg-gray-900 transition"
                    onClick={signOut}
                  >
                    Log Out
                  </button>
                ) : (
                  <button
                    className="w-full py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                    onClick={signIn}
                  >
                    Log In
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;
