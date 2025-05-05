import { Spinner } from "react-bootstrap";
import "./index.scss";

function Loading() {
  return (
    <div className="spinner-wrap">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}

export default Loading;
