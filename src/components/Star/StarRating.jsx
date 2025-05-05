import React, { useState } from "react";

const Star = ({
  filled = 1,
  size = 24,
  onClick,
  onMouseEnter,
  onMouseLeave,
  readonly = false,
}) => {
  const width = size;

  return (
    <div
      style={{
        position: "relative",
        width,
        height: size,
        display: "inline-block",
        cursor: readonly ? "default" : "pointer",
        marginRight: 0,
      }}
      onClick={readonly ? undefined : onClick}
      onMouseEnter={readonly ? undefined : onMouseEnter}
      onMouseLeave={readonly ? undefined : onMouseLeave}
    >
      {/* 灰色背景星 */}
      <svg
        width={width}
        height={size}
        viewBox="0 0 24 24"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <path
          d="M12 2l2.9 6.9L22 9.2l-5 5 1.2 7.8L12 18l-6.2 4 1.2-7.8-5-5 7.1-0.3z"
          fill="#e0e0e0"
        />
      </svg>

      {/* 填充的前景星，根据 filled 比例裁剪宽度 */}
      <div
        style={{
          width: `${filled * 100}%`,
          overflow: "hidden",
          position: "absolute",
          top: "-1px",
          left: 0,
        }}
      >
        <svg width={width} height={size} viewBox="0 0 24 24">
          <path
            d="M12 2l2.9 6.9L22 9.2l-5 5 1.2 7.8L12 18l-6.2 4 1.2-7.8-5-5 7.1-0.3z"
            fill="#ffc107"
          />
        </svg>
      </div>
    </div>
  );
};

const StarRating = ({
  score = 0,
  max = 5,
  size = 24,
  onRate,
  readonly = false,
  isLoading = false,
  justify = "center",
}) => {
  const [hoverScore, setHoverScore] = useState(null);
  const displayScore = hoverScore !== null ? hoverScore : score;

  const handleClick = (value) => {
    if (!readonly) onRate && onRate(value);
  };

  const handleHover = (value) => {
    if (!readonly) setHoverScore(value);
  };
  const handleLeave = () => {
    if (!readonly) setHoverScore(null);
  };

  return (
    <div
      style={{ position: "relative", display: "flex", justifyContent: justify }}
    >
      {[...Array(max)].map((_, i) => {
        const filled = Math.min(Math.max(displayScore - i, 0), 1);
        return (
          <Star
            key={i}
            size={size}
            filled={filled}
            onClick={() => handleClick(i + 1)}
            onMouseEnter={() => handleHover(i + 1)}
            onMouseLeave={handleLeave}
            readonly={readonly}
          />
        );
      })}

      {isLoading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255, 255, 255, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "24px",
              height: "24px",
              border: "4px solid #ccc",
              borderTop: "4px solid #999",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
        </div>
      )}

      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default StarRating;
