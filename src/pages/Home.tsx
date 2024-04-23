import Button from "../components/Button";
import {
  triggerNativeGetCameraImage,
  triggerNativeGetQrCode,
} from "../services/jsBridge/core/camera";
import {
  triggerNativeGetGalleryImage,
  triggerNativeSaveImageToGallery,
} from "../services/jsBridge/core/gallery";
import { useSaveImageToGalleryCallback } from "../services/jsBridge/callback/gallery";
import useLocationStore from "../stores/location";
import { useNavigate } from "react-router-dom";
import { initAuth } from "../services/jsBridge/core/intiAuth";
import usePaotangPassStore from "../stores/paotangPass";

export default function Home() {
  const navigate = useNavigate();
  const testMsg = useLocationStore((state) => state.test);
  const setAuthorizationCode = usePaotangPassStore(
    (state) => state.setAuthorizationCode
  );

  const onClickOpenCameraJSBridge = () => {
    triggerNativeGetCameraImage((base64Image: string) => {
      navigate("/image", { state: { base64Image } });
    }, handleErrorJSBridge);
  };

  const onClickOpenCameraJavaScript = () => {
    navigate("/camera");
  };

  const onClickOpenGalleryJSBridge = () => {
    triggerNativeGetGalleryImage((base64Image: string) => {
      navigate("/image", { state: { base64Image } });
    }, handleErrorJSBridge);
  };

  const onClickSaveImageJSBridge = (data: string) => {
    triggerNativeSaveImageToGallery(
      data,
      useSaveImageToGalleryCallback,
      handleErrorJSBridge
    );
  };

  const onClickScanQRCodeJSBridge = () => {
    triggerNativeGetQrCode((qrData: string) => {
      navigate("/qr-code", { state: { qrData } });
    }, handleErrorJSBridge);
  };

  const onClickInitAuthJSBridge = () => {
    initAuth((authorizationCode: string) => {
      setAuthorizationCode(authorizationCode);
      navigate("/callback");
    }, handleErrorJSBridge);
  };

  const handleErrorJSBridge = (errorCode: string, errorDescription: string) => {
    navigate("/error", { state: { errorCode, errorDescription } });
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <h1 className="font-bold">เลือกหัวข้อที่ต้องการทดสอบ</h1>
      {testMsg}
      <div className="flex flex-col gap-[8px]">
        <Button
          label="เปิดกล้อง - JSBridge"
          onClick={onClickOpenCameraJSBridge}
        />
        <Button
          label="เปิดกล้อง - JavaScript"
          onClick={onClickOpenCameraJavaScript}
        />
        <Button
          label="เปิด gallery - JSBridge"
          onClick={onClickOpenGalleryJSBridge}
        />
        <Button
          label="save image - JSBridge"
          onClick={() => {
            onClickSaveImageJSBridge("sdfsf");
          }}
        />
        <Button label="เปิด gallery - JavaScript" />
        <Button label="Scan QR Code" onClick={onClickScanQRCodeJSBridge} />
        <Button
          label="get location - JSBridge"
          onClick={() => {
            navigate("/location");
          }}
        />
        <Button label="get location - JavaScript" />
        <Button
          label="initAuth for access PT Pass"
          onClick={onClickInitAuthJSBridge}
        />
      </div>
    </div>
  );
}
