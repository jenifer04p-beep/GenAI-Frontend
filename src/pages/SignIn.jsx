import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";

export default function SignIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.status === 200) {

        // ✅ Save user
        localStorage.setItem("userId", data.user.id);

        // 🔥 IMPORTANT: update navbar instantly
        window.dispatchEvent(new Event("storage"));

        // ✅ Navigate
        navigate("/");

      } else {
        setError(data.message || "Login failed");
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

            <div className="panelTitle">Welcome Back 👋</div>
            <p className="muted">Login to continue your journey</p>

            {/* ERROR */}
            {error && <div className="errorBox">{error}</div>}

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
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {/* BUTTON */}
            <Button 
              className="authBtn"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            {/* FOOTER */}
            <div className="authFooter">
              <span>Don’t have an account?</span>
              <button
                className="linkBtn"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>

          </Card>

        </div>
      </section>
    </div>
  );
}