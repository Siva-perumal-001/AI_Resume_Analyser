import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="
        flex items-center justify-between 
        px-4 py-4 
        max-w-6xl mx-auto 
        w-full
      "
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src="/logo.png" alt="logo" width={42} height={42} />
        <p className="text-2xl font-bold text-gradient whitespace-nowrap">
          REVALYZE
        </p>
      </Link>

      {/* Upload Button */}
      <Link
        to="/upload"
        className="
          primary-button
          text-sm 
          px-4 py-2 
          whitespace-nowrap
          max-sm:text-xs max-sm:px-3 max-sm:py-2
        "
      >
        Upload Resume
      </Link>
    </nav>
  );
};

export default Navbar;
