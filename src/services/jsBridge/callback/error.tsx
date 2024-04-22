import { useNavigate } from "react-router-dom";

export const useHandleErrorJSBridge = (
  errorCode: string,
  errorDescription: string
) => {
  const navigate = useNavigate();

  navigate("/error", { state: { errorCode, errorDescription } });
};
