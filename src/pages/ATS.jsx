import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import mascot from "../assets/gidy-mascot.png";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import ATSRing from "../components/ATSRing.jsx";

export default function ATS() {
  const uploadRef = useRef(null);
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);
  const [hasFile, setHasFile] = useState(false);

  // 🔥 USER STATE
  const [user, setUser] = useState(null);

  // 🔥 FETCH USER
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

  const tips = useMemo(
    () => [
      "Add more role keywords: “Spring Boot”, “REST”, “Jira”",
      "Keep bullet points outcome-focused (numbers help)",
      "Ensure sections: Summary, Skills, Projects, Education",
    ],
    []
  );

  useEffect(() => {
    if (!hasFile) return;

    setProgress(0);

    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          return 100;
        }
        return p + 8;
      });
    }, 120);

    return () => clearInterval(id);
  }, [hasFile]);

  return (
    <div className="page">

      {/* HERO */}
      <section className="hero hero--ats">
        <div className="container heroGrid">
          <div className="heroLeft">

            {/* 🔥 DYNAMIC TITLE */}
            <div className="badge">
              <span className="dot" />
              {user ? `Welcome, ${user.name}` : "ATS Score"}
            </div>

            <h1 className="heroTitle">ATS Score & AI Resume Insights</h1>

            <p className="heroSub">
              Upload your resume to get an instant ATS score and AI-powered insights.
            </p>

            <div className="heroBtns">
              <Button
                onClick={() => {
                  if (!user) {
                    alert("Please login first ⚠️");
                    navigate("/signin");
                    return;
                  }
                  uploadRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Upload Your Resume
              </Button>

              <Button variant="ghost">See Sample Report</Button>
            </div>
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

      {/* CONTENT */}
      <section className="section" ref={uploadRef}>
        <div className="container">
          <div className="grid3 atsGrid">

            {/* UPLOAD */}
            <Card className="atsCard">
              <div className="panelTitle">Upload Resume</div>

              {!user ? (
                // 🔥 NOT LOGGED IN
                <div className="muted">
                  Please login to upload your resume.
                  <br />
                  <Button onClick={() => navigate("/signin")}>
                    Go to Login
                  </Button>
                </div>
              ) : (
                // 🔥 LOGGED IN
                <div className="dropzone">
                  <div className="dropTitle">Drag & drop your resume</div>
                  <div className="dropSub">PDF or DOCX (UI only)</div>

                  <div className="dropActions">
                    <Button onClick={() => setHasFile(true)}>
                      Browse
                    </Button>
                    <Button variant="ghost" onClick={() => setHasFile(false)}>
                      Reset
                    </Button>
                  </div>

                  <div className="progressArea">
                    <div className="progressBar">
                      <div
                        className="progressFill"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <div className="progressMeta">
                      <span>
                        {hasFile ? `${progress}%` : "No file selected"}
                      </span>
                      <span className="muted">
                        {hasFile ? "Analyzing…" : "Upload to start"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* SCORE */}
            <Card className="atsCard">
              <div className="panelTitle">ATS Match Score</div>
              <div className="ringWrap">
                <ATSRing value={user ? 78 : 0} />
                <div className="ringNote">
                  {user
                    ? "Strong match — improve keywords & formatting to reach 85%+"
                    : "Login to see your score"}
                </div>
              </div>
            </Card>

            {/* INSIGHTS */}
            <Card className="atsCard">
              <div className="panelTitle">AI Resume Insights</div>

              {user ? (
                <>
                  <div className="tagRow">
                    {["Java", "React", "SQL", "OOP", "REST APIs", "Git"].map(
                      (t) => (
                        <span className="tag" key={t}>
                          {t}
                        </span>
                      )
                    )}
                  </div>

                  <ul className="tips">
                    {tips.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>

                  <div className="jobActions">
                    <Button>Improve Resume</Button>
                    <Button variant="ghost">Download Report</Button>
                  </div>
                </>
              ) : (
                <div className="muted">
                  Login to view personalized insights.
                </div>
              )}
            </Card>

          </div>
        </div>
      </section>
    </div>
  );
}