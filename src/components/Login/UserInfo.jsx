import { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Title from "@/components/Title";
import Loading from "@/components/Loading";
import { useToast } from "@/context/ToastContext";
import { editPassword } from "@/api";
import dataInit from "@/config.js";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "@/store/userSlice";
import { useNavigate, useLocation } from "react-router-dom";

const UserInfo = ({ showModal, closeModal }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const [isEditPassword, setIsEditPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const userInfo = useSelector((state) => state.user.user);
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitEditPassword = async () => {
    // 获取加密值
    let Data = dataInit.encrypt({
      oldPwd: formData.oldPassword,
      newPwd: formData.newPassword,
    });

    await editPassword({ data: Data })
      .then((res) => {
        if (res.status === 0) {
          clearLog(false);
        } else {
          showToast("error", t("failed"), res.message);
        }
      })
      .catch((err) => {
        showToast("error", t("failed"), err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    const isDifferent = formData.newPassword !== formData.oldPassword;

    if (!form.checkValidity() || !isDifferent) {
      if (!isDifferent) {
        showToast("error", t("password_not_same"));
      }
      setValidated(true);
      return;
    }

    setIsLoading(true);
    await submitEditPassword();
  };

  const clearLog = (isLogout = true) => {
    localStorage.removeItem(dataInit.cookieID);
    dispatch(clearUser());
    handleClose();
    if (isLogout) {
      showToast("success", t("success"));
    } else {
      showToast("success", t("success"), t("loginAgain"));
    }
    if (location.pathname.includes("/management")) {
      navigate("/");
    }
  };

  const handleClose = () => {
    setFormData({
      oldPassword: "",
      newPassword: "",
    });
    setIsEditPassword(false);
    closeModal();
  };

  return (
    <Modal
      show={showModal}
      backdrop="static"
      onHide={handleClose}
      className="custom-modal"
      centered
      style={{ zIndex: 1999 }}
    >
      <Modal.Header closeButton>
        <div className="modal-header-wrap">
          <Title title={isEditPassword ? t("editPassword") : t("userInfo")} />
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-body-wrap pt-3">
          <div className="form-content">
            {!isEditPassword && (
              <>
                <div className="avatar-wrap text-center mb-3">
                  <img
                    src="/assets/images/avatar.png"
                    alt=""
                    style={{ width: "100px" }}
                  />
                </div>
                <div className="info-wrap text-center">
                  <div className="name">
                    {userInfo ? userInfo.username : "未登录"}
                  </div>
                </div>

                <div className="d-flex justify-content-end mt-3 mb-4">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setIsEditPassword(true)}
                    className="me-2"
                  >
                    {t("editPassword")}
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    className="me-0"
                    onClick={clearLog}
                  >
                    {t("logout")}
                  </Button>
                </div>
              </>
            )}
            {isEditPassword && (
              <Form noValidate validated={validated} onSubmit={onSubmit}>
                <Form.Group
                  className="mb-3 d-flex align-items-start"
                  controlId="oldPassword"
                >
                  <Form.Label
                    className="me-2 mb-0 mt-2 text-nowrap text-end"
                    style={{ flexShrink: 0, width: "64px" }}
                  >
                    {t("oldPassword")}
                  </Form.Label>
                  <div className="flex-grow-1">
                    <Form.Control
                      required
                      type="password"
                      name="oldPassword"
                      placeholder={t("password_placeholder")}
                      pattern="^\S{6,12}$"
                      value={formData.oldPassword}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {t("password_required")}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>

                <Form.Group
                  className="mb-3 d-flex align-items-start"
                  controlId="newPassword"
                >
                  <Form.Label
                    className="me-2 mb-0 mt-2 text-nowrap text-end"
                    style={{ flexShrink: 0, width: "64px" }}
                  >
                    {t("newPassword")}
                  </Form.Label>
                  <div className="flex-grow-1">
                    <Form.Control
                      required
                      type="password"
                      name="newPassword"
                      placeholder={t("password_placeholder")}
                      pattern="^\S{6,12}$"
                      value={formData.newPassword}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {t("newPassword_required")}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>

                <div className="d-flex justify-content-end mt-3 mb-4">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setIsEditPassword(false)}
                    className="me-2"
                  >
                    {t("cancel")}
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    type="submit"
                    disabled={isLoading}
                    className="me-0"
                  >
                    {t("confirm")}
                  </Button>
                </div>
              </Form>
            )}
          </div>

          {isLoading && <Loading />}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UserInfo;
