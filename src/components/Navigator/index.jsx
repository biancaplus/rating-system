import { useMemo, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import loginImage from "@/assets/images/login.png";
import logoutImage from "@/assets/images/logout.png";
import Login from "@/components/Login/Login";
import UserInfo from "@/components/Login/UserInfo";
import "./index.scss";
import { useSelector } from "react-redux";

export default function Navigator() {
  const { t, i18n } = useTranslation();
  const isLog = useSelector((state) => state.user.isLog);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const closeUserInfoModal = () => {
    setShowUserInfoModal(false);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const Language = useMemo(() => {
    const language = i18n.language;
    if (language === "zh") {
      return "中文";
    } else if (language === "ja") {
      return "日本語";
    } else {
      return "English";
    }
  }, [i18n.language]);

  return (
    <>
      <Navbar variant="dark" fixed="top" className="custom-navbar shadow">
        <Container>
          <Navbar.Brand className="navbar-brand">{t("navTitle")}</Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link as={Link} to="/home">
              <i className="bi bi-house-door-fill"></i>
            </Nav.Link>

            {isAdmin && (
              <Nav.Link as={Link} to="/management">
                <i className="bi bi-gear-fill"></i>
              </Nav.Link>
            )}

            {isLog ? (
              <img
                src={loginImage}
                alt="login"
                className="custom-icon"
                onClick={() => setShowUserInfoModal(true)}
              />
            ) : (
              <img
                src={logoutImage}
                alt="logout"
                className="custom-icon"
                onClick={() => setShowLoginModal(true)}
              />
            )}

            <div className="line"></div>

            <NavDropdown
              title={Language}
              id="basic-nav-dropdown"
              className="custom-nav-dropdown"
            >
              <NavDropdown.Item href="#" onClick={() => changeLanguage("zh")}>
                中文
              </NavDropdown.Item>
              <NavDropdown.Item href="#" onClick={() => changeLanguage("ja")}>
                日本語
              </NavDropdown.Item>
              <NavDropdown.Item href="#" onClick={() => changeLanguage("en")}>
                English
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
      <Login showModal={showLoginModal} closeModal={() => closeLoginModal()} />
      <UserInfo
        showModal={showUserInfoModal}
        closeModal={() => closeUserInfoModal()}
      />
    </>
  );
}
