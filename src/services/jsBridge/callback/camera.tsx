import { useNavigate } from "react-router-dom";

export function useOpenCameraCallback(base64Image: string) {
  const navigate = useNavigate();

  navigate("/camera", { state: { base64Image } });
}

export function useGetQrCodeCallback(qrCode: string) {
  const navigate = useNavigate();

  navigate("/qr-code", { state: { qrCode } });
}
