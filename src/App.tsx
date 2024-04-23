import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Location from "./pages/Location";
import ErrorPage from "./pages/Error";
import ImagePreview from "./pages/ImagePreview";
import QrCode from "./pages/QrCode";
import InitAuthCallback from "./pages/InitAuthCallback";
import { useEffect } from "react";
import Camera from "./pages/Camera";

function App() {
  useEffect(() => {
    window.bridge = {
      getLocationCallbackError: null,
      getLocationCallback: null,
      stopLocationUpdatesCallback: null,
      stopLocationUpdatesCallbackError: null,
      getGalleryImageCallbackError: null,
      getGalleryImageCallback: null,
      saveImageToGalleryCallbackError: null,
      saveImageToGalleryCallback: null,
      getCameraImageCallback: null,
      getCameraImageCallbackError: null,
      getQrCodeCallbackError: null,
      getQrCodeCallback: null,
      openPwPCallbackError: null,
      initAuthCallback: null,
      initAuthCallbackError: null,
    };
  }, []);

  return (
    <div className="pt-[16px] px-[8px] bg-[#f4f4f4] h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/location" element={<Location />} />
        <Route path="/image" element={<ImagePreview />} />
        <Route path="/qr-code" element={<QrCode />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/callback" element={<InitAuthCallback />} />
        <Route path="/error" element={<ErrorPage />} />

        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
