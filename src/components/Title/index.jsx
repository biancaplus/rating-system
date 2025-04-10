import "./index.scss";

export default function Title({ title }) {
  return (
    <div className="custom-title">
      <div className="line"> </div>
      <div className="t">{title}</div>
    </div>
  );
}
