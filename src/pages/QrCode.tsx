import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";

export default function QrCode() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className=" flex flex-col gap-[32px] items-center">
      <div className="text-center text-xl font-bold">QR Code data</div>

      <p>{location.state?.qrData ?? "no data"}</p>

      <Button
        className="w-full"
        label="Back"
        onClick={() => {
          navigate("/");
        }}
      />
    </div>
  );
}
