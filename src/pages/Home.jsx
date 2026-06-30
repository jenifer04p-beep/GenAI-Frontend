import { useEffect, useState } from "react";
import mascot from "../assets/gidy-mascot.png";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import { useNavigate } from "react-router-dom";

const offers = [
  {
    title: "Job Portal",
    desc: "Discover curated roles, build confidence, and apply faster with clarity.",
    icon: "💼",
  },
  {
    title: "Hackathons",
    desc: "Compete, learn, and gain proof-of-skill with real challenges.",
    icon: "🏆",
    highlight: true,
  },
  {
    title: "Projects",
    desc: "Showcase your work with portfolio-ready projects and progress tracking.",
    icon: "🧩",
  },
];

export default function Home() {
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
      
      {/* SECTION 1: HERO */}
      <section className="hero hero--home">
        <div className="container heroGrid">
          <div className="heroLeft">

            {/* 🔥 DYNAMIC WELCOME */}
            {user ? (
              <div className="badge">
                <span className="dot" /> Welcome back, {user.name} 👋
              </div>
            ) : (
              <div className="badge">
                <span className="dot" /> Welcome to GenAI
              </div>
            )}

            <h1 className="heroTitle">
              Find Jobs. Compete in Hackathons.
            </h1>

            <p className="heroSub">
              Discover jobs, prove your skills through projects, and stand out in hackathons —
              all in one platform built for developers.
            </p>

            <div className="heroBtns">
              <Button onClick={() => navigate("/jobsearch")}>
                Get Started
              </Button>

              <Button variant="ghost" onClick={() => navigate("/ats")}>
                Explore ATS
              </Button>
            </div>

            {/* 🔥 CONDITIONAL CTA */}
            {!user && (
              <div className="heroMiniCta">
                <Button
                  className="btn--resume"
                  onClick={() => navigate("/signup")}
                >
                  Create Account
                </Button>
                <div className="miniCopy">
                  Join GenAI and start your journey today.
                </div>
              </div>
            )}
          </div>

          <div className="heroRight">
            <div className="mascotStage">
              <div className="lightRays" />
              <div className="glowBlob" />
              <img className="mascotImg" src={mascot} alt="GidyAI mascot" />
              <div className="mascotShadow" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: OFFERS */}
      <section className="section">
        <div className="container">
          <SectionTitle
            title="Explore What Gidy Offers"
            subtitle="Everything you need to plan, build, and get hired."
          />

          <div className="grid3">
            {offers.map((o) => (
              <Card
                key={o.title}
                className={`offerCard ${
                  o.highlight ? "offerCard--highlight" : ""
                }`}
              >
                <div className="offerIcon">{o.icon}</div>
                <div className="offerTitle">{o.title}</div>
                <div className="offerDesc">{o.desc}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: CTA */}
      <section className="ctaBand">
        <div className="container ctaBandInner">
          <div>
            <div className="ctaTitle">
              Ready to Level Up Your Career?
            </div>
            <div className="ctaSub">
              Start building proof and finding the right roles.
            </div>
          </div>

          <Button onClick={() => navigate("/jobsearch")}>
            Start Your Journey →
          </Button>
        </div>
      </section>
    </div>
  );
}