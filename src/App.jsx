import { Suspense } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { RenderRoutes } from "./router/index.jsx";
import ScrollToTop from "./components/Scroll/ScrollToTop.jsx";
import BackToTop from "./components/Scroll/BackToTop.jsx";
import "./utils/language/i18n";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <ScrollToTop />
        <Routes>{RenderRoutes({})}</Routes>
        <BackToTop />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
