import Button from "../components/Button";
import { useGetLocationSuccessCallback } from "../services/jsBridge/callback/location";
import { triggerNativeGetLocation } from "../services/jsBridge/core/location";
import { triggerNativeGetCameraImage } from "../services/jsBridge/core/camera";
import { useOpenCameraCallback } from "../services/jsBridge/callback/camera";
import { useHandleErrorJSBridge } from "../services/jsBridge/callback/error";
import {
  triggerNativeGetGalleryImage,
  triggerNativeSaveImageToGallery,
} from "../services/jsBridge/core/gallery";
import { useSaveImageToGalleryCallback } from "../services/jsBridge/callback/gallery";
import useLocationStore from "../stores/location";

export default function Home() {
  const testMsg = useLocationStore((state) => state.test);
  const setTest = useLocationStore((state) => state.setTest);

  const onClickOpenCameraJSBridge = () => {
    triggerNativeGetCameraImage((base64Image: string) => {
      setTest("useOpenCameraCallback");
      console.log("base64Image", base64Image);
    }, useHandleErrorJSBridge);
  };

  const onClickOpenGalleryJSBridge = () => {
    triggerNativeGetGalleryImage(useOpenCameraCallback, useHandleErrorJSBridge);
  };

  const onClickSaveImageJSBridge = (data: string) => {
    triggerNativeSaveImageToGallery(
      data,
      useSaveImageToGalleryCallback,
      useHandleErrorJSBridge
    );
  };

  const onClickGetLocationJSBridge = () => {
    const isContinuous = true;

    triggerNativeGetLocation(
      isContinuous,
      useGetLocationSuccessCallback,
      useHandleErrorJSBridge
    );
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
        <Button label="เปิดกล้อง - JavaScript" />
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
        <Button label="Scan QR Code" />
        <Button
          label="get location - JSBridge"
          onClick={onClickGetLocationJSBridge}
        />
        <Button label="get location - JavaScript" />
        <Button label="initAuth for access PT Pass" />
      </div>
    </div>
  );
}
