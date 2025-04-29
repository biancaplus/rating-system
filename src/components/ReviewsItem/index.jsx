import "./index.scss";

export default function ReviewsItem({ Item }) {
  return (
    <div className="review-item">
      <div className="review-header">
        <div className="ratings">
          {Array.from({ length: Item.rating }).map((_, i) => (
            <i className="bi bi-star-fill" key={i}></i>
          ))}
          {Array.from({ length: 5 - Item.rating }).map((_, i) => (
            <i className="bi bi-star" key={i}></i>
          ))}
        </div>
        <div className="review-date">{Item.date.slice(0, 10)}</div>
      </div>
      <div className="review-content">{Item.content}</div>
    </div>
  );
}
