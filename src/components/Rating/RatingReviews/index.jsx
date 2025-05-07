import { Form, Container, ProgressBar, Modal, Button } from "react-bootstrap";
import { useState, useEffect, useCallback, useRef } from "react";
import Title from "@/components/Title";
import StarRating from "@/components/Star/StarRating";
import ReviewsItem from "@/components/ReviewsItem";
import DynamicPagination from "@/components/DynamicPagination";
import NoData from "@/components/NoData";
import Loading from "../../Loading";
import { useToast } from "@/context/ToastContext";
import { useTranslation } from "react-i18next";
import { getCommentList, addRating, getRatingDistribution } from "@/api/index";
import { useScrollToElement } from "@/hooks/useScrollToElement";
import "./index.scss";
import { useSelector } from "react-redux";

export default function RatingReviews({ id }) {
  const { t } = useTranslation();
  const isLog = useSelector((state) => state.user.isLog);
  const { showToast } = useToast();
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
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const reviewsRef = useRef(null);

  const onRating = async (isComment = false, rating = makeRating) => {
    setIsLoading3(true);
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
          showToast("success", t("submitted"), t("thankYouFeedback"));
        } else {
          showToast("error", t("submittedError"), res.message);
        }
      })
      .catch((err) => {
        showToast("error", err);
      })
      .finally(() => {
        setIsLoading3(false);
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
    setIsLoading1(true);
    const res = await getRatingDistribution(id);
    let obj = res.data;
    setStarList(obj.starList);
    setRating(obj.rating);
    setRatingCount(obj.rating_count);
    setIsLoading1(false);
  }, [id]);

  const getReviews = useCallback(async () => {
    setIsLoading2(true);
    const res = await getCommentList(id, currentPage, pageSize, order);
    let list = res.data.list || [];
    setReviews(list);
    setTotalPages(res.data.totalPage);
    setIsLoading2(false);
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
              {isLoading1 && <Loading />}
            </div>
            <div className="reviews-wrap" ref={reviewsRef}>
              {isLog ? (
                <div className="to-score">
                  <div className="label">{t("lightRating")}：</div>
                  <div className="score">
                    <StarRating
                      score={makeRating}
                      onRate={(v) => {
                        onMakeRating(v);
                      }}
                      isLoading={isLoading3}
                    />
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              <div className="write-select-wrap">
                {isLog ? (
                  <div className="write-box" onClick={handleShowModal}>
                    <i className="bi bi-pencil-square"></i>
                    <div>{t("writeComment")}</div>
                  </div>
                ) : (
                  <div></div>
                )}
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
              {reviews.length > 0 && (
                <DynamicPagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  maxVisiblePages={3}
                  showFirstLast={false}
                  onPageChange={(page) => setCurrentPage(page)}
                  isLoading={isLoading2}
                />
              )}
              {isLoading2 && <Loading />}
              {reviews.length === 0 && <NoData text={t("noData")} />}
            </div>
          </div>
        </Container>

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
              {isLoading3 && <Loading />}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleCloseModal}
              disabled={isLoading3}
            >
              {t("cancel")}
            </Button>
            <Button
              variant="primary"
              onClick={onRatingAndComment}
              disabled={isLoading3}
            >
              {t("send")}
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    </>
  );
}
