import { ToastContainer, Toast } from "react-bootstrap";

export function SuccessToast({
  closeSuccessToast,
  showSuccessToast,
  text1 = "",
  text2 = "",
}) {
  return (
    <>
      <ToastContainer className="p-3 custom-toast" style={{ zIndex: 2000 }}>
        <Toast
          onClose={() => closeSuccessToast()}
          show={showSuccessToast}
          autohide
          delay={1500}
        >
          <Toast.Body>
            <div className="toast-box">
              <i className="bi bi-star-fill fs-1"></i>
              <div style={{ fontSize: "1.2rem" }}>{text1}</div>
              <div>{text2}</div>
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export function ErrorToast({
  closeErrorToast,
  showErrorToast,
  text1 = "",
  text2 = "",
}) {
  return (
    <>
      <ToastContainer className="p-3 custom-toast" style={{ zIndex: 2000 }}>
        <Toast
          onClose={() => closeErrorToast()}
          show={showErrorToast}
          autohide
          delay={3000}
        >
          <Toast.Body>
            <div className="toast-box">
              <i className="bi bi-exclamation-triangle-fill fs-1"></i>
              <div style={{ fontSize: "1.2rem" }}>{text1}</div>
              <div>{text2}</div>
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
