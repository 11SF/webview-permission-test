import useLocationStore from "../../../stores/location";
import locationStore from "../../../stores/location";

export const useGetLocationSuccessCallback = (lat: number, long: number) => {
  const location = { latitude: lat, longitude: long };
  locationStore.setState({ location });
};

export const useStopLocationUpdatesCallback = (successMessage: string) => {
  const setLocationStatus = useLocationStore((state) => state.setStatus);

  setLocationStatus(successMessage);
};
