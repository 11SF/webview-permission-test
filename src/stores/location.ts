import { create } from "zustand";

interface LocationStoreType {
  test: string;
  status: string;
  location: null | locationType;
  lastUpdatedAt: Date | null;
  setStatus: (status: string) => void;
  setLocation: (location: locationType) => void;
  setTest: (test: string) => void;
}

interface locationType {
  latitude: number;
  longitude: number;
}

const useLocationStore = create<LocationStoreType>((set) => ({
  test: "",
  status: "idle",
  location: null,
  lastUpdatedAt: null,
  setStatus: (status: string) => set({ status }),
  setLocation: (location: locationType) =>
    set({ location: location, lastUpdatedAt: new Date() }),
  setTest: (test: string) => set({ test }),
}));

export default useLocationStore;
