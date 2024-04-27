import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import {
  triggerNativeGetCameraImage,
  triggerNativeGetQrCode,
} from "../services/jsBridge/core/camera";
import {
  triggerNativeGetGalleryImage,
  triggerNativeSaveImageToGallery,
} from "../services/jsBridge/core/gallery";
import { initAuth } from "../services/jsBridge/core/intiAuth";
import useLocationStore from "../stores/location";
import usePaotangPassStore from "../stores/paotangPass";

export default function Home() {
  const navigate = useNavigate();
  const testMsg = useLocationStore((state) => state.test);
  const inputFile = useRef<HTMLInputElement>(null);
  const setAuthorizationCode = usePaotangPassStore(
    (state) => state.setAuthorizationCode
  );

  const onClickOpenCameraJSBridge = () => {
    triggerNativeGetCameraImage((base64Image: string) => {
      navigate("/image", { state: { base64Image } });
    }, handleErrorJSBridge);
  };

  const onClickOpenCameraJavaScript = (libName: string) => {
    navigate(`/camera?lib=${libName}`);
  };

  const onClickOpenGalleryJSBridge = () => {
    triggerNativeGetGalleryImage((base64Image: string) => {
      navigate("/image", { state: { base64Image } });
    }, handleErrorJSBridge);
  };

  const onClickOpenGalleryJavaScript = () => {
    inputFile.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length) {
      toBase64(files[0])
        .then((base64) => {
          console.log(base64);

          navigate("/image", { state: { base64Image: base64 } });
        })
        .catch(() => {
          navigate("/error", {
            state: { errorCode: "error", errorDescription: "error" },
          });
        });
    }
  };

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const onClickSaveImageJSBridge = (data: string) => {
    triggerNativeSaveImageToGallery(
      data,
      (success: boolean) => {
        if (!success) {
          navigate("/error", {
            state: { errorCode: "error", errorDescription: "error" },
          });
        }
      },
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
    if (errorCode.includes("onCancel")) return;
    navigate("/error", { state: { errorCode, errorDescription } });
  };

  return (
    <div className="flex flex-col gap-[24px]">
      <h1 className="font-bold">เลือกหัวข้อที่ต้องการทดสอบ</h1>
      {testMsg}
      <div className="flex flex-col gap-[16px]">
        <Button
          label="เปิดกล้อง - JSBridge"
          onClick={onClickOpenCameraJSBridge}
        />
        <Button
          label="เปิดกล้อง - JavaScript (react-webcam)"
          onClick={() => {
            onClickOpenCameraJavaScript("react-webcam");
          }}
        />
        <Button
          label="เปิดกล้อง - JavaScript (react-camera-pro)"
          onClick={() => {
            onClickOpenCameraJavaScript("react-camera-pro");
          }}
        />
        <Button
          label="เปิด gallery - JSBridge"
          onClick={onClickOpenGalleryJSBridge}
        />
        <Button
          label="save image - JSBridge"
          onClick={() => {
            onClickSaveImageJSBridge(
              "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII="
            );
          }}
        />

        <div>
          <input
            className="w-full"
            style={{ display: "none" }}
            ref={inputFile}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
          />
          <Button
            className="w-full"
            label="เปิด gallery - JavaScript"
            onClick={onClickOpenGalleryJavaScript}
          ></Button>
        </div>

        <Button label="Scan QR Code" onClick={onClickScanQRCodeJSBridge} />
        <Button
          label="get location One time - JSBridge"
          onClick={() => {
            navigate("/location?mode=jsbridge&continuous=false");
          }}
        />
        <Button
          label="get location Continuous - JSBridge"
          onClick={() => {
            navigate("/location?mode=jsbridge&continuous=true");
          }}
        />

        <Button
          label="get location - JavaScript"
          onClick={() => {
            navigate("/location?mode=js");
          }}
        />
        <Button
          label="initAuth for access PT Pass"
          onClick={onClickInitAuthJSBridge}
        />
      </div>
    </div>
  );
}
