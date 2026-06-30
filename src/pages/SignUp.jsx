import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";

export default function SignUp() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {

    setError("");

    // ✅ Validation
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter valid email");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (res.status === 201) {
        alert("Signup successful ✅");
        navigate("/signin");
      } else {
        setError(data.message || "Signup failed");
      }

    } catch (error) {
      console.error(error);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page authPage">
      <section className="section">
        <div className="container authWrap">

          <Card className="authCard">

            <div className="panelTitle">Create Account 🚀</div>
            <p className="muted">Start your GidyAI journey</p>

            {/* ERROR MESSAGE */}
            {error && <div className="errorBox">{error}</div>}

            {/* NAME */}
            <label className="field">
              <span>Name</span>
              <input 
                className="input"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            {/* EMAIL */}
            <label className="field">
              <span>Email</span>
              <input 
                className="input"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            {/* PASSWORD */}
            <label className="field">
              <span>Password</span>
              <input 
                className="input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {/* CONFIRM PASSWORD */}
            <label className="field">
              <span>Confirm Password</span>
              <input 
                className="input"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>

            {/* BUTTON */}
            <Button 
              className="authBtn"
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>

            {/* FOOTER */}
            <div className="authFooter">
              <span>Already have an account?</span>
              <button
                className="linkBtn"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </button>
            </div>

          </Card>

        </div>
      </section>
    </div>
  );
}