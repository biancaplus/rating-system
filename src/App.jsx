import { Suspense } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { RenderRoutes } from "./router/index.jsx";
import ScrollToTop from "./utils/scroll/ScrollToTop.jsx";
import BackToTop from "./utils/scroll/BackToTop.jsx";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <ScrollToTop />
        <Routes>{RenderRoutes({})}</Routes>
        <BackToTop />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
