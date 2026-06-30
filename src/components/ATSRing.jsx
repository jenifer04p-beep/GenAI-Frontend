export default function ATSRing({ value = 78 }) {
  const v = Math.max(0, Math.min(100, value));
  const deg = `${(v / 100) * 360}deg`;

  return (
    <div className="atsRing" style={{ "--deg": deg }}>
      <div className="atsRingInner">
        <div className="atsRingValue">{v}%</div>
        <div className="atsRingLabel">ATS Score</div>
      </div>
    </div>
  );
}