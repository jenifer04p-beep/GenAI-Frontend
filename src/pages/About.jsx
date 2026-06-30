import { useEffect, useState } from "react";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import mascot from "../assets/gidy-mascot.png";
import { useNavigate } from "react-router-dom";

const highlights = [
  { title: "Mission", icon: "🎯", desc: "Help developers build proof-of-skill and get hired with confidence." },
  { title: "Vision", icon: "🌤️", desc: "A friendly builder platform to plan, solve, and build it right." },
  { title: "What Makes Us Different", icon: "✨", desc: "Clean UI, curated opportunities, and premium ATS insights — all in one." },
];

const values = ["Clarity First", "Developer Focused", "Proof Over Claims", "Friendly AI"];

export default function About() {

  const navigate = useNavigate();

  // 🔥 USER STATE
  const [user, setUser] = useState(null);

  // 🔥 FETCH USER FROM BACKEND
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    fetch(`http://127.0.0.1:5000/api/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (!data.message) {
          setUser(data);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="page">

      {/* HERO */}
      <section className="aboutHero">
        <div className="container aboutHeroInner">
          <div>

            {/* 🔥 DYNAMIC BADGE */}
            <div className="badge">
              <span className="dot" />
              {user ? `Welcome, ${user.name}` : "About Us"}
            </div>

            <h1 className="pageTitle">
              We’re building a calmer way to grow your career.
            </h1>

            <p className="pageSub">
              GidyAI helps you explore jobs, compete in hackathons, ship projects, and improve your ATS readiness —
              without confusing flows.
            </p>

            {/* 🔥 CONDITIONAL BUTTON */}
            {!user && (
              <Button onClick={() => navigate("/signup")}>
                Join GidyAI
              </Button>
            )}
          </div>

          <div className="aboutMascot">
            <div className="glowBlob" />
            <img className="mascotImg" src={mascot} alt="GidyAI mascot" />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section">
        <div className="container">

          {/* HIGHLIGHTS */}
          <div className="grid3">
            {highlights.map((h) => (
              <Card key={h.title} className="aboutCard">
                <div className="offerIcon">{h.icon}</div>
                <div className="offerTitle">{h.title}</div>
                <div className="offerDesc">{h.desc}</div>
              </Card>
            ))}
          </div>

          {/* VALUES */}
          <div className="valuesBlock">
            <div className="panelTitle">Our Values</div>
            <div className="valueChips">
              {values.map((v) => (
                <span className="chip chip--light" key={v}>{v}</span>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <Card className="contactCard">
            <div>
              <div className="panelTitle">Contact</div>
              <div className="muted">Email: help@gidy.ai</div>

              {/* 🔥 PERSONAL TOUCH */}
              {user && (
                <div className="muted">
                  Happy to have you here, {user.name} 😊
                </div>
              )}
            </div>

            <Button onClick={() => navigate("/")}>
              Say Hello
            </Button>
          </Card>

        </div>
      </section>
    </div>
  );
}