import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import useLocationStore from "../stores/location";
import { useEffect, useState } from "react";
import { useHandleErrorJSBridge } from "../services/jsBridge/callback/error";
import { triggerNativeGetLocation } from "../services/jsBridge/core/location";

interface locationType {
  latitude: number;
  longitude: number;
}

export default function Location() {
  const navigate = useNavigate();
  const status = useLocationStore((state) => state.status);
  const locationUpdatedAt = useLocationStore((state) => state.lastUpdatedAt);

  const [location, setLocation] = useState<locationType | null>(null);

  useEffect(() => {
    const isContinuous = true;
    triggerNativeGetLocation(
      isContinuous,
      (lat: number, long: number) => {
        const location = { latitude: lat, longitude: long };
        setLocation(location);
      },
      useHandleErrorJSBridge
    );
  }, []);

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
