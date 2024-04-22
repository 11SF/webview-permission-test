import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function ImagePreview() {
  const navigate = useNavigate();

  return (
    <div className=" flex flex-col gap-[32px]">
      <div className="text-center text-xl font-bold">Image Preview</div>
      <img
        className="h-[512px] object-contain"
        src="https://plus.unsplash.com/premium_photo-1680082510819-cace32f84aeb?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
