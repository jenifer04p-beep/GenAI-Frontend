import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";

const ongoingData = [
  {
    title: "Portfolio Builder",
    desc: "Create a clean developer portfolio with projects, tags, and sections.",
    tags: ["React", "CSS", "Routing"],
    progress: 62,
    updated: "2 days ago",
  },
  {
    title: "ATS Resume Enhancer UI",
    desc: "Premium ATS score UI with upload, score ring, and insights panels.",
    tags: ["UI", "UX", "SaaS"],
    progress: 45,
    updated: "yesterday",
  },
];

const completedData = [
  {
    title: "Landing Page Replica",
    desc: "High fidelity hero + cards + CTA with clean spacing.",
    tags: ["HTML", "CSS", "Design"],
  },
  {
    title: "Job Cards UI System",
    desc: "Reusable card components + filters + match badges.",
    tags: ["React", "Components"],
  },
];

export default function Projects() {

  const navigate = useNavigate();

  // 🔥 USER STATE
  const [user, setUser] = useState(null);

  // 🔥 TAB STATE
  const [tab, setTab] = useState("ongoing");

  // 🔥 PROJECT STATE (can be saved)
  const [ongoing, setOngoing] = useState(ongoingData);

  const list = useMemo(
    () => (tab === "ongoing" ? ongoing : completedData),
    [tab, ongoing]
  );

  // 🔥 FETCH USER
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    fetch(`http://127.0.0.1:5000/api/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (!data.message) setUser(data);
      })
      .catch(err => console.error(err));
  }, []);

  // 🔥 CONTINUE PROJECT
  const handleContinue = (project) => {
    if (!user) {
      alert("Please login to continue ⚠️");
      navigate("/signin");
      return;
    }

    alert(`Continuing ${project.title} 🚀`);
  };

  // 🔥 SAVE PROGRESS (LOCAL)
  const saveProgress = (project) => {
    let saved = JSON.parse(localStorage.getItem("projects")) || [];
    saved.push(project);
    localStorage.setItem("projects", JSON.stringify(saved));
    alert("Progress saved ✅");
  };

  return (
    <div className="page">
      <section className="section">
        <div className="container">

          {/* 🔥 HEADER */}
          <div className="pageHeader">
            <div className="badge">
              <span className="dot" />
              {user ? `Welcome, ${user.name}` : "Projects"}
            </div>

            <h1 className="pageTitle">
              Build your portfolio with real proof.
            </h1>

            <p className="pageSub">
              Track ongoing work and showcase completed projects.
            </p>
          </div>

          {/* TABS */}
          <div className="segmented">
            <button
              className={`segBtn ${tab === "ongoing" ? "active" : ""}`}
              onClick={() => setTab("ongoing")}
            >
              Ongoing
            </button>

            <button
              className={`segBtn ${tab === "completed" ? "active" : ""}`}
              onClick={() => setTab("completed")}
            >
              Completed
            </button>
          </div>

          {/* PROJECT GRID */}
          <div className="grid3">
            {list.map((p) => (
              <Card key={p.title} className="projectCard">

                <div className="projectTop">
                  <div className="projectTitle">{p.title}</div>
                  {tab === "completed" && (
                    <span className="statusPill">Completed</span>
                  )}
                </div>

                <div className="projectDesc">{p.desc}</div>

                <div className="tagRow">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>

                {tab === "ongoing" ? (
                  <>
                    <div className="progressWrap">
                      <div className="progressBar">
                        <div
                          className="progressFill"
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>

                      <div className="progressMeta">
                        <span>{p.progress}%</span>
                        <span className="muted">
                          Updated {p.updated}
                        </span>
                      </div>
                    </div>

                    <div className="jobActions">
                      <Button onClick={() => handleContinue(p)}>
                        {user ? "Continue" : "Login to Continue"}
                      </Button>

                      <Button
                        variant="ghost"
                        onClick={() => saveProgress(p)}
                      >
                        Save
                      </Button>
                    </div>
                  </>
                ) : (
                  <Button onClick={() => alert("Opening project...")}>
                    View Details
                  </Button>
                )}

              </Card>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}