import { Col, Button } from "react-bootstrap";

import "./index.scss";

function Card3({ ItemData }) {
  const { name, faculty, title, courses, introduction } = ItemData;
  return (
    <Col className="col-12">
      <div className="card3-item-wrap">
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
          <img src="/assets/images/line.jpg" alt="" className="line-img" />
        </div>
      </div>
    </Col>
  );
}

export default Card3;
