export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="sectionTitle">
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
}