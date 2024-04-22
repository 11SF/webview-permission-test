import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Location from "./pages/Location";
import ErrorPage from "./pages/Error";
import ImagePreview from "./pages/ImagePreview";
import QrCode from "./pages/QrCode";
import InitAuthCallback from "./pages/InitAuthCallback";

function App() {
  return (
    <div className="pt-[16px] px-[8px]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/location" element={<Location />} />
        <Route path="/image" element={<ImagePreview />} />
        <Route path="/qr-code" element={<QrCode />} />
        <Route path="/callback" element={<InitAuthCallback />} />
        <Route path="/error" element={<ErrorPage />} />

        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
