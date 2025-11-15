import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between px-3 py-2 bg-white/70 backdrop-blur-md rounded-full max-w-[95%] mx-auto mt-3 shadow-sm">
      
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src="/logo.png" alt="logo" className="w-9 h-9" />
        <p className="text-xl font-bold text-gradient">REVALYZE</p>
      </Link>

      {/* Upload Button */}
      <Link
        to="/upload"
        className="
          primary-button 
          px-3 py-2 
          text-sm 
          font-semibold
          whitespace-nowrap
          w-auto
          min-w-fit
        "
      >
        Upload Resume
      </Link>
    </nav>
  );
};

export default Navbar;
