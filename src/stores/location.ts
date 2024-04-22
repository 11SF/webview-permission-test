import { create } from "zustand";

interface LocationStoreType {
  status: string;
  location: null | locationType;
  lastUpdatedAt: Date | null;
  setStatus: (status: string) => void;
  setLocation: (location: locationType) => void;
}

interface locationType {
  latitude: number;
  longitude: number;
}

const useLocationStore = create<LocationStoreType>((set) => ({
  status: "idle",
  location: null,
  lastUpdatedAt: null,
  setStatus: (status: string) => set({ status }),
  setLocation: (location: locationType) =>
    set({ location: location, lastUpdatedAt: new Date() }),
}));

export default useLocationStore;
