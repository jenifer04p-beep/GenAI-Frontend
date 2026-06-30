export default function Button({ variant = "primary", className = "", ...props }) {
  const cls =
    variant === "primary"
      ? "btn btn--pill btn--primary"
      : variant === "ghost"
      ? "btn btn--pill btn--ghost"
      : "btn btn--pill";
  return <button className={`${cls} ${className}`} {...props} />;
}