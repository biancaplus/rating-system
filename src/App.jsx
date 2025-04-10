import { Suspense } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { RenderRoutes } from "./router/index.jsx";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>{RenderRoutes({})}</Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
