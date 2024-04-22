import usePaotangPassStore from "../../../stores/paotangPass";

export const useInitAuthCallback = (authorizationCode: string) => {
  const setAuthorizationCode = usePaotangPassStore(
    (state) => state.setAuthorizationCode
  );

  setAuthorizationCode(authorizationCode);
};
