import {
  Form,
  Container,
  ProgressBar,
  Toast,
  ToastContainer,
  Modal,
  Button,
} from "react-bootstrap";
import { useState } from "react";

import Title from "@/components/Title";
import StarRating from "@/utils/star/StarRating";
import ReviewsItem from "@/components/ReviewsItem";
import DynamicPagination from "@/components/DynamicPagination";
import { useTranslation } from "react-i18next";

import "./index.scss";

export default function RatingReviews({ teacher }) {
  const { t } = useTranslation();
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [makeRating, setMakeRating] = useState(0);
  const [makeComment, setMakeComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const {
    // id,
    rating,
    nums,
    numsList,
    reviews,
  } = teacher;
  const onRating = (v) => {
    setMakeRating(v);
    console.log(makeRating);
    setShowToast(true);
  };
  const onRatingAndComment = () => {
    console.log(makeRating, makeComment);
    setMakeRating(0);
    setMakeComment("");

    setShowModal(false);
    setShowToast(true);
  };
  const handleCloseModal = () => {
    setMakeRating(0);
    setMakeComment("");
    setShowModal(false);
  };
  const handleShowModal = () => {
    setMakeRating(0);
    setShowModal(true);
  };

  return (
    <>
      <section className="rating-reviews-section">
        <Container>
          <div className="rating-reviews-wrap">
            <Title title={t("ratingAndComment")} />
            <div className="rating-wrap">
              <div className="score-box">
                <div className="total-score">
                  <div className="t-1">{rating}</div>
                  <div className="t-2">{t("totalScore")}</div>
                </div>
                <div className="star-info">
                  <div className="star-distribut">
                    {numsList.map((item, index) => {
                      return (
                        <div className="star-item" key={index}>
                          <div className="star-box">
                            {Array.from({ length: item.starNum }).map(
                              (_, i) => (
                                <i className="bi bi-star-fill" key={i}></i>
                              )
                            )}
                          </div>
                          <div className="star-progress">
                            <ProgressBar
                              animated
                              now={(item.value / nums) * 100}
                              style={{ height: "8px" }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="star-num">
                    {nums}
                    {t("ratingNum")}
                  </div>
                </div>
              </div>
              <div className="to-score">
                <div className="label">{t("lightRating")}：</div>
                <div className="score">
                  <StarRating
                    score={makeRating}
                    onRate={(v) => {
                      onRating(v);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="reviews-wrap">
              <div className="write-select-wrap">
                <div className="write-box" onClick={handleShowModal}>
                  <i className="bi bi-pencil-square"></i>
                  <div>{t("writeComment")}</div>
                </div>
                <div className="select-box">
                  <Form.Select
                    aria-label="Default select example"
                    className="reviews-select"
                  >
                    <option value="1">{t("highestRating")}</option>
                    <option value="2">{t("lowestRating")}</option>
                    <option value="2">{t("latestRating")}</option>
                  </Form.Select>
                </div>
              </div>
              <div className="reviews-list-wrap">
                {reviews.map((item, index) => {
                  return (
                    <div className="reviews-item-wrap" key={index}>
                      <ReviewsItem Item={item} />
                    </div>
                  );
                })}
              </div>
              <DynamicPagination
                totalPages={20}
                currentPage={currentPage}
                maxVisiblePages={3}
                showFirstLast={false}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </Container>

        <ToastContainer className="p-3 custom-toast">
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            autohide
            delay={1500}
          >
            <Toast.Body>
              <div className="toast-box">
                <i className="bi bi-star-fill fs-1"></i>
                <div style={{ fontSize: "1.2rem" }}>{t("submitted")}</div>
                <div>{t("thankYouFeedback")}</div>
              </div>
            </Toast.Body>
          </Toast>
        </ToastContainer>

        <Modal
          show={showModal}
          backdrop="static"
          keyboard={false}
          className="custom-modal"
          size="lg"
          centered
        >
          <Modal.Header>
            <div className="modal-header-wrap">
              <Title title={t("writeComment")} />
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-body-wrap">
              <div className="modal-rating">
                <StarRating
                  score={makeRating}
                  onRate={(v) => setMakeRating(v)}
                />
                <div className="text">{t("lightRatingPlaceholder")}</div>
              </div>
              <div className="modal-comment">
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder={t("commentPlaceholder")}
                  value={makeComment}
                  onChange={(e) => setMakeComment(e.target.value)}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              {t("cancel")}
            </Button>
            <Button variant="primary" onClick={onRatingAndComment}>
              {t("send")}
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    </>
  );
}
