import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import logo from "../assets/gidy-logo.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "JobSearch", to: "/jobsearch" },
  { label: "Hackathons", to: "/hackathons" },
  { label: "Projects", to: "/projects" },
  { label: "ATS Score", to: "/ats" },
  { label: "About Us", to: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const wrapRef = useRef(null);
  const navigate = useNavigate();

  // 🔥 SCROLL EFFECT
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 🔥 CLOSE DROPDOWN
  useEffect(() => {
    const onDoc = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // 🔥 FETCH USER (DYNAMIC)
  useEffect(() => {
    const fetchUser = () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        setUser(null);
        return;
      }

      fetch(`http://127.0.0.1:5000/api/user/${userId}`)
        .then(res => res.json())
        .then(data => {
          if (!data.message) setUser(data);
          else setUser(null);
        })
        .catch(() => setUser(null));
    };

    fetchUser();

    // 🔥 listen for login/logout changes
    window.addEventListener("storage", fetchUser);

    return () => window.removeEventListener("storage", fetchUser);
  }, []);

  // 🔥 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("userId");

    // 🔥 trigger navbar update
    window.dispatchEvent(new Event("storage"));

    setUser(null);
    navigate("/signin");
  };

  return (
    <header className={`navWrap ${scrolled ? "navWrap--scrolled" : ""}`}>
      <div className="navInner advancedNav">

        {/* LEFT */}
        <div className="brand" onClick={() => navigate("/")}>
          <img className="brandLogo" src={logo} alt="logo" />
          <span className="brandText">GenAI</span>
        </div>

        {/* CENTER */}
        <nav className="navLinks">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `navLink ${isActive ? "isActive" : ""}`
              }
            >
              {item.label}
              <span className="linkLine" />
            </NavLink>
          ))}
        </nav>

        {/* RIGHT */}
        <div className="navRight" ref={wrapRef}>

          {user ? (
            // ✅ LOGGED IN
            <div className="userMenu">

              <div
                className="userTrigger modernUser"
                onClick={() => setOpen((v) => !v)}
              >
                <div className="avatarCircle">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span>{user.name}</span>
              </div>

              {open && (
                <div className="userDropdown modernDropdown">

                  <div className="userInfo">
                    <div className="avatarBig">
                      {user.name?.charAt(0)}
                    </div>
                    <div>
                      <div className="userName">{user.name}</div>
                      <div className="userEmail">{user.email}</div>
                    </div>
                  </div>

                  <button
                    className="dropdownItem"
                    onClick={() => navigate("/profile")}
                  >
                    👤 Profile
                  </button>

                  <button
                    className="dropdownItem"
                    onClick={() => navigate("/projects")}
                  >
                    📁 My Projects
                  </button>

                  <button
                    className="dropdownItem logout"
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // ❌ NOT LOGGED IN
            <>
              <button
                className="loginModern"
                onClick={() => setOpen((v) => !v)}
              >
                Login
              </button>

              {open && (
                <div className="authWrap">
                  <button
                    className="btnSignInNew"
                    onClick={() => navigate("/signin")}
                  >
                    Sign In
                  </button>

                  <button
                    className="btnSignUpNew"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </header>
  );
}