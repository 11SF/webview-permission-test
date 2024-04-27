import { useRef } from "react";
import { Camera } from "react-camera-pro";
import { useNavigate, useSearchParams } from "react-router-dom";
import Webcam from "react-webcam";
import Button from "../components/Button";

export default function CameraPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const camera = useRef(null);
  // const [image, setImage] = useState(null);

  const getCamera = (libName: string) => {
    switch (libName) {
      case "react-camera-pro":
        return (
          <Camera
            ref={camera}
            errorMessages={{
              noCameraAccessible:
                "No camera device accessible. Please connect your camera or try a different browser.",
              permissionDenied:
                "Permission denied. Please refresh and give camera permission.",
              switchCamera:
                "It is not possible to switch camera to different one because there is only one video device accessible.",
              canvas: "Canvas is not supported.",
            }}
            facingMode="environment"
          />
        );

      case "react-webcam":
        return (
          <Webcam
            audio={false}
            onUserMediaError={() => {
              navigate("/error", {
                state: { errorCode: "error", errorDescription: "error" },
              });
            }}
            videoConstraints={{
              facingMode: "environment",
            }}
          />
        );

      default:
        return <p>Unavailable camera library</p>;
    }
  };

  return (
    <div className=" flex flex-col gap-[32px]">
      <div className="text-center text-xl font-bold">Image Preview</div>

      <div className="max-h-[65vh] min-h-[40vh] relative">
        {getCamera(searchParams.get("lib") ?? "")}
      </div>
      <Button
        className="w-full z-[50]"
        label="Back"
        onClick={() => {
          navigate("/");
        }}
      />
    </div>
  );
}
