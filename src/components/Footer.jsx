import logo from "../assets/gidy-logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerInner">
        <div className="footerBrand">
          <img className="footerLogo" src={logo} alt="GidyAI" />
          <div>
            <div className="footerTitle">GidyAI</div>
            <div className="footerText">
              A friendly platform to explore jobs, hackathons, projects, and ATS insights.
            </div>
            <div className="footerLinks">
              <a className="footerLink" href="#">Terms</a>
              <a className="footerLink" href="#">Privacy</a>
              <a className="footerLink" href="mailto:help@gidy.ai">help@gidy.ai</a>
            </div>
          </div>
        </div>

        <div className="footerSocial">
          <button className="iconBtn" aria-label="Twitter" type="button">𝕏</button>
          <button className="iconBtn" aria-label="LinkedIn" type="button">in</button>
          <button className="iconBtn" aria-label="GitHub" type="button">⌂</button>
        </div>
      </div>
    </footer>
  );
}