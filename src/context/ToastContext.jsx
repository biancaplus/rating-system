import { createContext, useContext, useState, useCallback } from "react";
import { ToastContainer, Toast } from "react-bootstrap";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    type: null, // 'success' or 'error'
    text1: "",
    text2: "",
    visible: false,
  });

  const showToast = useCallback((type, text1 = "", text2 = "") => {
    setToast({ type, text1, text2, visible: true });
  }, []);

  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, closeToast }}>
      {children}
      {toast.visible && (
        <ToastContainer className="p-3 custom-toast" style={{ zIndex: 3000 }}>
          <Toast
            onClose={closeToast}
            show={toast.visible}
            autohide
            delay={3000}
          >
            <Toast.Body>
              <div className="toast-box">
                <i
                  className={`bi ${
                    toast.type === "success"
                      ? "bi-check-all"
                      : "bi-exclamation-triangle-fill"
                  } fs-1`}
                ></i>
                <div style={{ fontSize: "1.2rem" }}>{toast.text1}</div>
                <div>{toast.text2}</div>
              </div>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
