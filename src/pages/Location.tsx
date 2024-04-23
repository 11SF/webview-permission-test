import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import { useHandleErrorJSBridge } from "../services/jsBridge/callback/error";
import {
  stopNativeLocationUpdates,
  triggerNativeGetLocation,
} from "../services/jsBridge/core/location";

interface locationType {
  latitude: number;
  longitude: number;
}

export default function Location() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [location, setLocation] = useState<locationType | null>(null);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  useEffect(() => {
    if (searchParams.get("mode") == "js") {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(location);
          setUpdatedAt(new Date());
        },
        (error) => {
          navigate("/error", { state: { errorCode: error.code } });
        }
      );
    } else {
      const isContinuous = true;
      triggerNativeGetLocation(
        isContinuous,
        (lat: number, long: number) => {
          const location = { latitude: lat, longitude: long };
          setLocation(location);
          setUpdatedAt(new Date());
        },
        useHandleErrorJSBridge
      );
    }
  }, [searchParams]);

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
        <b>Updated At:</b> {updatedAt?.toISOString() ?? "no data"}
      </p>

      <Button
        label="Stop Location"
        onClick={() => {
          stopNativeLocationUpdates((successMessage: string) => {
            alert(successMessage);
          }, useHandleErrorJSBridge);
        }}
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
