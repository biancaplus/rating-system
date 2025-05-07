import { useState, useEffect, useCallback } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Title from "@/components/Title";
import Loading from "@/components/Loading";
import { useToast } from "@/context/ToastContext";
import { register, login } from "@/api";
import dataInit from "@/config.js";
import { useDispatch } from "react-redux";
import { getMyInfo, setIsLog } from "@/store/userSlice";

const Login = ({ showModal, closeModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const [isRegister, setIsRegister] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [validated, setValidated] = useState(false);
  const [loginRemember, setLoginRemember] = useState(true);

  const switchContent = () => {
    if (isRegister) {
      setIsRegister(false);
    } else {
      if (isForgot) {
        setIsForgot(false);
      } else {
        setIsRegister(true);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitLogin = async () => {
    // 获取加密值
    let Data = dataInit.encrypt({
      username: formData.username,
      password: formData.password,
    });

    await login({ data: Data })
      .then((res) => {
        if (res.status === 0) {
          showToast("success", t("loginSuccess"));

          if (loginRemember) {
            localStorage.setItem(dataInit.cookieID, res.token);
          }

          dispatch(getMyInfo());
          dispatch(setIsLog(true));

          handleClose();
        } else {
          showToast("error", t("loginFailed"), res.message);
        }
      })
      .catch((err) => {
        showToast("error", t("loginFailed"), err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const submitRegister = async () => {
    // 获取加密值
    let Data = dataInit.encrypt({
      username: formData.username,
      password: formData.password,
    });

    await register({ data: Data })
      .then((res) => {
        if (res.status === 0) {
          showToast("success", t("success"));
          submitLogin();
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

  const submitForgotPassword = async () => {
    console.log("忘记密码");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    const isDifferent = formData.confirmPassword !== formData.password;

    if (!form.checkValidity() || (isRegister && isDifferent)) {
      if (isRegister && isDifferent) {
        showToast("error", t("confirmPassword_not_match"));
      }

      setValidated(true);
      return;
    }

    setIsLoading(true);

    if (isRegister) {
      await submitRegister();
    } else {
      if (isForgot) {
        await submitForgotPassword();
      } else {
        await submitLogin();
      }
    }

    setValidated(false);
  };

  const handleClose = () => {
    setIsRegister(false);
    setIsForgot(false);
    closeModal();
  };

  const checkLogin = useCallback(() => {
    const token = localStorage.getItem(dataInit.cookieID);
    if (token) {
      dispatch(getMyInfo());
      dispatch(setIsLog(true));
    }
  }, [dispatch]);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  useEffect(() => {
    setFormData({
      username: "",
      password: "",
      confirmPassword: "",
    });
  }, [isRegister, isForgot]);

  return (
    <Modal
      show={showModal}
      backdrop="static"
      keyboard={false}
      className="custom-modal"
      centered
      style={{ zIndex: 1999 }}
    >
      <Modal.Header>
        <div className="modal-header-wrap">
          <Title
            title={
              isRegister
                ? t("register")
                : isForgot
                ? t("editPassword")
                : t("login")
            }
          />
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-body-wrap pt-3">
          <div className="form-content">
            <Form noValidate validated={validated} onSubmit={onSubmit}>
              {!isForgot && (
                <>
                  <Form.Group
                    className="mb-3 d-flex align-items-start"
                    controlId="username"
                  >
                    <Form.Label
                      className="me-2 mb-0 mt-2 text-nowrap text-end"
                      style={{ flexShrink: 0, width: "64px" }}
                    >
                      {t("userName")}
                    </Form.Label>
                    <div className="flex-grow-1">
                      <Form.Control
                        required
                        name="username"
                        type="text"
                        pattern="^[a-zA-Z0-9]{3,10}$"
                        placeholder={t("name_placeholder")}
                        value={formData.username}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t("name_required")}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <Form.Group
                    className="mb-3 d-flex align-items-start"
                    controlId="password"
                  >
                    <Form.Label
                      className="me-2 mb-0 mt-2 text-nowrap text-end"
                      style={{ flexShrink: 0, width: "64px" }}
                    >
                      {isForgot ? t("oldPassword") : t("password")}
                    </Form.Label>
                    <div className="flex-grow-1">
                      <Form.Control
                        required
                        type="password"
                        name="password"
                        placeholder={t("password_placeholder")}
                        pattern="^\S{6,12}$"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t("password_required")}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>
                </>
              )}

              {isRegister && (
                <Form.Group
                  controlId="confirmPassword"
                  className="mb-3 d-flex align-items-start"
                >
                  <Form.Label
                    className="me-2 mb-0 mt-2 text-nowrap text-end"
                    style={{ flexShrink: 0, width: "64px" }}
                  >
                    {t("confirmPassword")}
                  </Form.Label>
                  <div className="flex-grow-1">
                    <Form.Control
                      required
                      type="password"
                      name="confirmPassword"
                      placeholder={t("confirmPassword_placeholder")}
                      value={formData.confirmPassword}
                      pattern="^\S{6,12}$"
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {t("password_required")}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
              )}

              {/* {isForgot && (
                <>忘记密码的表单内容</>
              )} */}

              <div
                className="form-footer d-flex justify-content-between align-items-start"
                style={{
                  paddingLeft: "72px",
                  fontSize: "0.85rem",
                  color: "#86868c",
                }}
              >
                <div className="remember-me ">
                  {!isRegister && !isForgot && (
                    <Form.Check
                      type="checkbox"
                      label={t("rememberMe")}
                      checked={loginRemember}
                      onChange={() => setLoginRemember(!loginRemember)}
                      size="sm"
                    />
                  )}
                </div>

                <div className="text-end">
                  {/* {!isRegister && !isForgot && (
                    <>
                      <div
                        className="forget-text text click-text cursor-pointer mb-1"
                        onClick={() => setIsForgot(true)}
                      >
                        {t("forgotPassword")}
                      </div>
                    </>
                  )} */}
                  <div
                    className="account-text text click-text cursor-pointer"
                    onClick={() => switchContent()}
                  >
                    {isRegister
                      ? t("haveAccount")
                      : isForgot
                      ? t("back")
                      : t("noAccount")}
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end mt-3 mb-4">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleClose}
                  disabled={isLoading}
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
          </div>

          {isLoading && <Loading />}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
