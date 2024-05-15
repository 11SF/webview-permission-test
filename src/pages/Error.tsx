import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function ErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="text-center flex flex-col gap-[16px]">
        <p className="font-bold text-[18px]">ไม่สามารถทำรายการได้ในขณะนี้</p>
        <p>กรุณาลองใหม่อีกครั้งในภายหลัง</p>
        <p>Error code: {location.state?.errorCode}</p>
        <p>Error desc: {location.state?.errorDescription}</p>
        <Button
          className="w-full"
          label="Back"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
    </div>
  );
}
