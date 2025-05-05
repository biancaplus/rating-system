import "./index.scss";
import emptyLight from "@/assets/images/empty_light.png";
import emptyDark from "@/assets/images/empty_dark.png";

function NoData({ type = "light", text }) {
  return (
    <div className="no-data-wrap">
      <img
        src={type === "dark" ? emptyDark : emptyLight}
        alt="no-data"
        className="no-data-img"
      />
      <div className={`no-data-text ${type === "dark" ? "dark" : ""}`}>
        {text}
      </div>
    </div>
  );
}

export default NoData;
