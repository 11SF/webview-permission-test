import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function ImagePreview() {
  const navigate = useNavigate();
  const location = useLocation();

  const getBase64Image = (base64: string) => {
    if (base64.includes("data:image")) {
      return base64;
    }
    return `data:image/png;base64,${base64}`;
  };

  return (
    <div className=" flex flex-col gap-[32px]">
      <div className="text-center text-xl font-bold">Image Preview</div>
      <img
        className="h-[512px] object-contain"
        src={getBase64Image(location.state.base64Image)}
      />

      <Button
        className="w-full"
        label="Back"
        onClick={() => {
          navigate("/");
        }}
      />

      {location.state.base64Image}
    </div>
  );
}
