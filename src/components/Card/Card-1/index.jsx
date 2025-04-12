import { Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./index.scss";
import StarRating from "@/utils/star/StarRating";
import ReviewsItem from "@/components/ReviewsItem";

function Card1({ ItemData }) {
  const navigate = useNavigate();
  const toRating = () => {
    navigate(`/rating/${id}`);
  };
  const {
    id,
    name,
    faculty,
    title,
    rating,
    nums,
    courses,
    introduction,
    reviewsNum,
    reviews,
  } = ItemData;

  return (
    <Col className="col-12 col-md-6 col-xl-4 h-100">
      <div className="card1-item-wrap">
        <div className="flipper">
          <div className="front">
            <div className="avatar-wrap">
              <img src="/assets/images/avatar.png" alt="" className="" />
            </div>
            <div className="info-wrap">
              <div className="faculty">{faculty}</div>
              <div className="name-wrap">
                <div className="name">{name}</div>
                <div className="job-title">{title}</div>
              </div>
              <div className="introduction">{introduction}</div>

              <div className="other-wrap">
                <div className="i-box">
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
                <div className="star-rating-wrap">
                  <StarRating score={rating} readonly />
                </div>
                <span>{rating}分</span>
              </div>
              <div className="nums">
                <i className="bi bi-person-fill"></i>
                <span>{nums}</span>
              </div>
            </div>
          </div>
          <div className="back">
            <div className="reviews-wrap">
              <div className="reviews-item-wrap">
                {reviews.map((item, index) => {
                  return <ReviewsItem Item={item} key={index} />;
                })}
              </div>
            </div>
            <div className="score-wrap">
              <div className="ratings">
                <i className="bi bi-chat-square-text-fill"></i>
                <span>{reviewsNum}</span>
                <i className="bi bi-person-fill"></i>
                <span>{nums}</span>
              </div>
              <Button
                variant="light"
                size="sm"
                className="btn-score"
                onClick={toRating}
              >
                去评分
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
}

export default Card1;
