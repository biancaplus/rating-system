import { Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./index.scss";

function Card2({ ItemData }) {
  const navigate = useNavigate();
  const toRating = () => {
    navigate(`/rating/${id}`);
  };
  const { id, name, faculty, title, rating, nums, courses, introduction } =
    ItemData;
  return (
    <Col className="col-12">
      <div className="card2-item-wrap">
        <div className="avatar-wrap">
          <img src="/assets/images/avatar.png" alt="" className="" />
        </div>
        <div className="info-score-wrap">
          <div className="info-wrap">
            <div className="faculty-wrap">
              <div className="faculty">{faculty}</div>
              <div className="name-wrap">
                <div className="name">{name}</div>
                <div className="job-title">{title}</div>
              </div>
            </div>
            <div className="introduction">{introduction}</div>
            <div className="other-wrap">
              <div className="i-box">
                {/* <div className="label">主要课程：</div> */}
                <div className="value">
                  {courses.map((item, index) => {
                    return (
                      <div className="item" key={index}>
                        {item}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="score-wrap">
            <div className="ratings">
              <div className="ratings-item">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <span>{rating}分</span>
              </div>
              <div className="ratings-item">
                <i className="bi bi-chat-square-text c-primary"></i>
                <span>26</span>
                <i className="bi bi-person  c-primary"></i>
                <span>{nums}</span>
              </div>
            </div>

            <Button variant="primary" size="sm" onClick={toRating}>
              去评分
            </Button>
          </div>
          <img src="/assets/images/line.jpg" alt="" className="line-img" />
        </div>
      </div>
    </Col>
  );
}

export default Card2;
