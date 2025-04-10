import { Container } from "react-bootstrap";
import Card3 from "@/components/card/Card-3";

export default function RatingTeacher({ teacher }) {
  return (
    <section className="rating-teacther-section">
      <Container>
        <div className="card3-wrap">
          <Card3 ItemData={teacher}></Card3>
        </div>
      </Container>
    </section>
  );
}
