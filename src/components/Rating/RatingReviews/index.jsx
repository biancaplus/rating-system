import {
  Form,
  Container,
  ProgressBar,
  Toast,
  ToastContainer,
  Modal,
  Button,
} from "react-bootstrap";
import { useState, useEffect, useCallback, useRef } from "react";

import Title from "@/components/Title";
import StarRating from "@/components/Star/StarRating";
import ReviewsItem from "@/components/ReviewsItem";
import DynamicPagination from "@/components/DynamicPagination";
import { useTranslation } from "react-i18next";
import { getCommentList, addRating, getRatingDistribution } from "@/api/index";
import { useScrollToElement } from "@/hooks/useScrollToElement";
import "./index.scss";

export default function RatingReviews({ id }) {
  const { t } = useTranslation();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [makeRating, setMakeRating] = useState(0);
  const [makeComment, setMakeComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [starList, setStarList] = useState([]);
  const [rating, setRating] = useState(0);
  const [rating_count, setRatingCount] = useState(0);
  const [order, setOrder] = useState(1);
  const reviewsRef = useRef(null);

  const onRating = async (isComment = false, rating = makeRating) => {
    const data = {
      teacher_id: id,
      rating: rating,
      content: makeComment && makeComment.length > 0 ? makeComment : null,
    };
    await addRating(data)
      .then((res) => {
        if (res.status === 0) {
          getDistribution();
          if (isComment) {
            setMakeComment("");
            setShowModal(false);
            getReviews();
          }
          setShowSuccessToast(true);
        } else {
          console.log(res);
          setShowErrorToast(true);
        }
      })
      .catch(() => {
        setShowErrorToast(true);
      });
  };
  const onMakeRating = (v) => {
    setMakeRating(v);
    onRating(false, v);
  };
  const onRatingAndComment = () => {
    onRating(true);
  };
  const handleCloseModal = () => {
    setMakeRating(0);
    setMakeComment("");
    setShowModal(false);
  };
  const handleShowModal = () => {
    setMakeRating(0);
    setMakeComment("");
    setShowModal(true);
  };

  const getDistribution = useCallback(async () => {
    const res = await getRatingDistribution(id);
    console.log(res);
    let obj = res.data;
    setStarList(obj.starList);
    setRating(obj.rating);
    setRatingCount(obj.rating_count);
  }, [id]);

  const getReviews = useCallback(async () => {
    const res = await getCommentList(id, currentPage, pageSize, order);
    console.log(res);
    let list = res.data.list || [];
    setReviews(list);
    setTotalPages(res.data.totalPage);
  }, [id, currentPage, pageSize, order]);

  useEffect(() => {
    getDistribution();
  }, [getDistribution]);

  useEffect(() => {
    getReviews();
  }, [getReviews]);

  useScrollToElement(reviewsRef, 64, currentPage);

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
                    {starList &&
                      starList.map((item, index) => {
                        return (
                          <div className="star-item" key={index}>
                            <div className="star-box">
                              {Array.from({ length: item.rating }).map(
                                (_, i) => (
                                  <i className="bi bi-star-fill" key={i}></i>
                                )
                              )}
                            </div>
                            <div className="star-progress">
                              <ProgressBar
                                animated
                                now={(item.count / rating_count) * 100}
                                style={{ height: "8px" }}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <div className="star-num">
                    {rating_count}
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
                      onMakeRating(v);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="reviews-wrap" ref={reviewsRef}>
              <div className="write-select-wrap">
                <div className="write-box" onClick={handleShowModal}>
                  <i className="bi bi-pencil-square"></i>
                  <div>{t("writeComment")}</div>
                </div>
                <div className="select-box">
                  <Form.Select
                    aria-label="Default select example"
                    className="reviews-select"
                    onChange={(e) => setOrder(e.target.value)}
                  >
                    <option value={1}>{t("latestRating")}</option>
                    <option value={2}>{t("highestRating")}</option>
                    <option value={3}>{t("lowestRating")}</option>
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
                totalPages={totalPages}
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
            onClose={() => setShowSuccessToast(false)}
            show={showSuccessToast}
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

        <ToastContainer className="p-3 custom-toast" style={{ zIndex: 2000 }}>
          <Toast
            onClose={() => setShowErrorToast(false)}
            show={showErrorToast}
            autohide
            delay={2000}
          >
            <Toast.Body>
              <div className="toast-box">
                <i className="bi bi-exclamation-triangle-fill fs-1"></i>
                <div style={{ fontSize: "1.2rem" }}>{t("submittedError")}</div>
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
          style={{ zIndex: 1999 }}
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
