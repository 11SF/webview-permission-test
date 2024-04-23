import Webcam from "react-webcam";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Camera() {
  const navigate = useNavigate();

  return (
    <div className=" flex flex-col gap-[32px]">
      <div className="text-center text-xl font-bold">Image Preview</div>

      <Webcam audio={false} />
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
