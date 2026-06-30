import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";

const events = [
  { month: "2026 Mar", title: "BuildSprint", desc: "Ship a mini SaaS feature in 48 hours with mentor support." },
  { month: "2026 Apr", title: "AI Agents Jam", desc: "Create a helpful agent workflow and demo it with confidence." },
  { month: "2026 May", title: "Frontend Glow-Up", desc: "High-fidelity UI challenge: polish, micro-interactions, and motion." },
  { month: "2026 Jun", title: "Full Stack Weekend", desc: "Design + build a portfolio project with clean UI and structure." },
];

export default function Hackathons() {

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

  // 🔥 JOIN HANDLER
  const handleJoin = (eventTitle) => {
    if (!user) {
      alert("Please login to join hackathons ⚠️");
      navigate("/signin");
      return;
    }

    alert(`Successfully joined ${eventTitle} 🚀`);
  };

  return (
    <div className="page">
      <section className="section">
        <div className="container">

          <div className="pageHeader">

            {/* 🔥 DYNAMIC HEADER */}
            <div className="badge">
              <span className="dot" />
              {user ? `Welcome, ${user.name}` : "Hackathons"}
            </div>

            <h1 className="pageTitle">
              Compete. Learn. Showcase proof-of-skill.
            </h1>

            <p className="pageSub">
              Join curated hackathons built for developers — timelines, teams, and confidence.
            </p>
          </div>

          <div className="timeline">
            <div className="timelineLine" />

            {events.map((e, idx) => (
              <div
                key={e.month}
                className={`timelineRow ${idx % 2 === 0 ? "left" : "right"}`}
              >
                <div className="timelineNode" />

                <Card className="timelineCard">
                  <div className="timelineMonth">{e.month}</div>
                  <div className="timelineTitle">{e.title}</div>
                  <div className="timelineDesc">{e.desc}</div>

                  <Button
                    className="timelineBtn"
                    onClick={() => handleJoin(e.title)}
                  >
                    {user ? "Join Now" : "Login to Join"}
                  </Button>

                </Card>
              </div>
            ))}

          </div>
        </div>
      </section>
    </div>
  );
}