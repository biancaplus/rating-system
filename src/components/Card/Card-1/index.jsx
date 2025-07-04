import { Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./index.scss";
import StarRating from "@/components/Star/StarRating";
import ReviewsItem from "@/components/ReviewsItem";
import NoData from "@/components/NoData";
import { useTranslation } from "react-i18next";
import base64String from "../avatar.js";

function Card1({ ItemData }) {
  const { t } = useTranslation();
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
    rating_count,
    courses,
    introduction,
    reviews_count,
    recent_ratings,
    avatar,
  } = ItemData;

  return (
    <Col className="col-12 col-md-6 col-xl-4 h-100">
      <div className="card1-item-wrap">
        <div className="flipper">
          <div className="front">
            <div className="avatar-wrap">
              {/* <img src="/assets/images/avatar.png" alt="" className="" /> */}
              {/* src={`data:image/png;base64,${base64String}`} */}

              <img src={avatar ? avatar : base64String} alt="" className="" />
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
                    {courses &&
                      courses.length > 0 &&
                      courses.map((item, index) => {
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
                <span>
                  {rating}
                  {t("rating")}
                </span>
              </div>
              <div className="rating-count">
                <i className="bi bi-person-fill"></i>
                <span>{rating_count}</span>
              </div>
            </div>
          </div>
          <div className="back">
            <div className="reviews-wrap">
              <div className="reviews-item-wrap">
                {recent_ratings.map((item, index) => {
                  return <ReviewsItem Item={item} key={index} />;
                })}
                {recent_ratings.length === 0 && (
                  <NoData text={t("noData")} type="dark" />
                )}
              </div>
            </div>
            <div className="score-wrap">
              <div className="ratings">
                <i className="bi bi-chat-square-text-fill"></i>
                <span>{reviews_count}</span>
                <i className="bi bi-person-fill"></i>
                <span>{rating_count}</span>
              </div>
              <Button
                variant="light"
                size="sm"
                className="btn-score"
                onClick={toRating}
              >
                {t("toRating")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
}

export default Card1;
