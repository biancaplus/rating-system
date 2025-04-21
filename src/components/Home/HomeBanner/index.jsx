import { Container } from "react-bootstrap";
import { ReactComponent as Bg } from "@/assets/images/bg.svg";
import { useTranslation } from "react-i18next";

export default function HomeBanner() {
  const { t } = useTranslation();

  return (
    <section className="home-banner bg-primary bg-gradient text-light text-center">
      <Container>
        <div className="d-flex justify-content-around">
          <div className="banner-text fs-3 d-flex align-items-center">
            <div className="">
              <p className="mb-2 mb-lg-4">{t("homeBanner.title")}</p>
              <p className="mb-2 mb-lg-4">{t("homeBanner.subtitle")}</p>
              <p className="mb-2 mb-lg-4">{t("homeBanner.subtitle2")}</p>
              <p className="mb-2 mb-lg-4">{t("homeBanner.subtitle3")}</p>
            </div>
          </div>
          <div className="w-35 d-none d-md-block">
            <Bg />
          </div>
        </div>
      </Container>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 160" // 改小高度了！
        style={{ display: "block", width: "100%", height: "auto" }}
      >
        <path
          fill="#F7F6FA"
          fillOpacity="1"
          d="M0,144L14.1,130.7C28.2,117,56,91,85,72C112.9,53,141,42,169,42.7C197.6,42,226,53,254,61.3C282.4,69,311,74,339,64C367.1,53,395,26,424,24C451.8,22,480,42,508,50.7C536.5,59,565,53,593,66.7C621.2,80,649,112,678,122.7C705.9,134,734,122,762,112C790.6,101,819,91,847,90.7C875.3,91,904,101,932,104C960,107,988,101,1016,88C1044.7,74,1073,53,1101,37.3C1129.4,22,1158,10.5,1186,18.7C1214.1,26,1242,53,1271,72C1298.8,91,1327,101,1355,112C1383.5,122,1412,134,1426,138.7L1440,144L1440,160L0,160Z"
        />
      </svg>
    </section>
  );
}
