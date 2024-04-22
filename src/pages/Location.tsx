import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import useLocationStore from "../stores/location";

export default function Location() {
  const navigate = useNavigate();
  const location = useLocationStore((state) => state.location);
  const status = useLocationStore((state) => state.status);
  const locationUpdatedAt = useLocationStore((state) => state.lastUpdatedAt);

  return (
    <div className="flex flex-col gap-[32px]">
      <div className="text-center text-xl font-bold">Location</div>

      <p>
        <b>Lat:</b> {location?.latitude ?? "no data"}
      </p>
      <p>
        <b>Long:</b> {location?.longitude ?? "no data"}
      </p>
      <p>
        <b>Status:</b> {status ?? "no data"}
      </p>
      <p>
        <b>Updated At:</b> {locationUpdatedAt?.toISOString() ?? "no data"}
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
