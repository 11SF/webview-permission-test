import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function ImagePreview() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className=" flex flex-col gap-[32px]">
      <div className="text-center text-xl font-bold">Image Preview</div>
      <img
        className="h-[512px] object-contain"
        src={location.state?.base64Image}
      />

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
