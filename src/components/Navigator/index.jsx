import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Navigator() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <Navbar variant="dark" fixed="top" className="custom-navbar shadow">
      <Container>
        <Navbar.Brand className="navbar-brand">{t("navTitle")}</Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link as={Link} to="/home">
            <i className="bi bi-house-door-fill"></i>
          </Nav.Link>
          <div className="line"></div>
          <i
            className="bi bi-translate custom-icon"
            onClick={() => changeLanguage(i18n.language === "zh" ? "en" : "zh")}
            title={t("changeLanguage")}
          ></i>

          {/* <Nav.Link as={Link} to="/rating">
            评分
          </Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
  );
}
