import { create } from "zustand";

interface PaotangPassStoreType {
  authorizationCode: null | string;
  setAuthorizationCode: (authorizationCode: string) => void;
}

const usePaotangPassStore = create<PaotangPassStoreType>((set) => ({
  authorizationCode: null,
  setAuthorizationCode: (authorizationCode: string) =>
    set({ authorizationCode }),
}));

export default usePaotangPassStore;
