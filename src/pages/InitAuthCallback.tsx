import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import usePaotangPassStore from "../stores/paotangPass";

export default function InitAuthCallback() {
  const navigate = useNavigate();
  const authorizationCode = usePaotangPassStore(
    (state) => state.authorizationCode
  );
  return (
    <div className="flex flex-col gap-[32px]">
      <div className="text-center text-xl font-bold">Init Auth Callback</div>

      <p>
        <b>Authorization Code:</b> {authorizationCode ?? "no data"}
      </p>

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
