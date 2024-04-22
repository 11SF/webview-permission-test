import { useNavigate } from "react-router-dom";
import useLocationStore from "../../../stores/location";

export function useOpenCameraCallback(base64Image: string) {
  const navigate = useNavigate();

  useLocationStore.getState().setTest("useOpenCameraCallback");

  navigate("/image", { state: { base64Image } });
}

export function useGetQrCodeCallback(qrCode: string) {
  const navigate = useNavigate();

  navigate("/qr-code", { state: { qrCode } });
}
