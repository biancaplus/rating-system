import { Container } from "react-bootstrap";
import { ReactComponent as Bg } from "@/assets/images/bg.svg";

export default function HomeBanner() {
  return (
    <section className="home-banner bg-primary bg-gradient text-light text-center">
      <Container>
        <div className="d-flex justify-content-around">
          <div className="banner-text fs-3 d-flex align-items-center">
            <div className="">
              <p className="mb-2 mb-lg-4">以评促教，教学相长</p>
              <p className="mb-2 mb-lg-4">每一份评价都是教育进步的阶梯</p>
              <p className="mb-2 mb-lg-4">共建教学反馈生态</p>
              <p className="mb-2 mb-lg-4">提升整体教育质量</p>
            </div>
          </div>
          <div className="w-35 d-none d-md-block">
            <Bg />
          </div>
        </div>
      </Container>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#F7F6FA"
          fillOpacity="1"
          d="M0,288L14.1,261.3C28.2,235,56,181,85,144C112.9,107,141,85,169,85.3C197.6,85,226,107,254,122.7C282.4,139,311,149,339,128C367.1,107,395,53,424,48C451.8,43,480,85,508,101.3C536.5,117,565,107,593,133.3C621.2,160,649,224,678,245.3C705.9,267,734,245,762,224C790.6,203,819,181,847,181.3C875.3,181,904,203,932,208C960,213,988,203,1016,176C1044.7,149,1073,107,1101,74.7C1129.4,43,1158,21,1186,37.3C1214.1,53,1242,107,1271,144C1298.8,181,1327,203,1355,224C1383.5,245,1412,267,1426,277.3L1440,288L1440,320L1425.9,320C1411.8,320,1384,320,1355,320C1327.1,320,1299,320,1271,320C1242.4,320,1214,320,1186,320C1157.6,320,1129,320,1101,320C1072.9,320,1045,320,1016,320C988.2,320,960,320,932,320C903.5,320,875,320,847,320C818.8,320,791,320,762,320C734.1,320,706,320,678,320C649.4,320,621,320,593,320C564.7,320,536,320,508,320C480,320,452,320,424,320C395.3,320,367,320,339,320C310.6,320,282,320,254,320C225.9,320,198,320,169,320C141.2,320,113,320,85,320C56.5,320,28,320,14,320L0,320Z"
        ></path>
      </svg>
    </section>
  );
}
