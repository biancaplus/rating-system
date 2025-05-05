import { Container } from "react-bootstrap";
import Card3 from "@/components/card/Card-3";
import Loading from "@/components/Loading";
export default function RatingTeacher({ teacher, isLoading }) {
  return (
    <section className="rating-teacther-section">
      <Container>
        <div className="card3-wrap position-relative">
          <Card3 ItemData={teacher}></Card3>
          {isLoading && <Loading />}
        </div>
      </Container>
    </section>
  );
}
