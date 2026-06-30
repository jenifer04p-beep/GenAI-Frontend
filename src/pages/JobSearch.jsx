import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";

const jobs = [
  {
    company: "Nimbus Labs",
    role: "Frontend Developer (React)",
    location: "Chennai • Hybrid",
    tags: ["React", "CSS", "Vite"],
    match: 86,
  },
  {
    company: "BlueStack AI",
    role: "Java Backend Engineer",
    location: "Remote",
    tags: ["Java", "Spring", "SQL"],
    match: 82,
  },
  {
    company: "PixelWorks",
    role: "Full Stack Developer",
    location: "Bangalore • On-site",
    tags: ["React", "Node", "Postgres"],
    match: 79,
  },
];

export default function JobSearch() {
  return (
    <div className="page">
      <section className="section">
        <div className="container">
          {/* TOP SEARCH PANEL */}
          <Card className="searchPanel">
            <div className="searchRow">
              <input
                className="input"
                placeholder="Search: React, Java, SQL…"
                aria-label="Search jobs"
              />
              <Button>Search</Button>
            </div>
          </Card>

          {/* BELOW: 2 columns */}
          <div className="twoCol">
            {/* LEFT FILTERS */}
            <Card className="filtersPanel">
              <div className="panelTitle">Filters</div>

              <label className="field">
                <span>Location</span>
                <select className="select">
                  <option>Any</option>
                  <option>Chennai</option>
                  <option>Bangalore</option>
                  <option>Remote</option>
                </select>
              </label>

              <label className="field">
                <span>Experience</span>
                <select className="select">
                  <option>Fresher</option>
                  <option>0–2 years</option>
                  <option>2–5 years</option>
                </select>
              </label>

              <label className="field">
                <span>Salary</span>
                <select className="select">
                  <option>Any</option>
                  <option>2–4 LPA</option>
                  <option>4–8 LPA</option>
                  <option>8+ LPA</option>
                </select>
              </label>

              <label className="field">
                <span>Job Type</span>
                <select className="select">
                  <option>Any</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                  <option>On-site</option>
                </select>
              </label>
            </Card>

            {/* RIGHT JOB LIST */}
            <div className="rightCol">
              <div className="panelTitle">Recommended for you</div>

              <div className="jobList">
                {jobs.map((j) => (
                  <Card key={j.company + j.role} className="jobCard">
                    <div className="jobTop">
                      <div>
                        <div className="jobCompany">{j.company}</div>
                        <div className="jobRole">{j.role}</div>
                        <div className="jobLoc">{j.location}</div>
                      </div>

                      <div className="matchBadge" title="AI Match Score">
                        {j.match}%
                      </div>
                    </div>

                    <div className="tagRow">
                      {j.tags.map((t) => (
                        <span className="tag" key={t}>{t}</span>
                      ))}
                    </div>

                    <div className="jobActions">
                      <Button>Apply</Button>
                      <Button variant="ghost">Save</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}