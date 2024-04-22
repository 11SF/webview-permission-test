const openPwP = (
  ppoaTnxRefId: string,
  callbackError: (errorCode: string, errorDescription: string) => void
) => {
  if (window.JSBridge) {
    // android
    window.bridge.openPwPCallbackError = callbackError;
    window.JSBridge.openPwP?.(ppoaTnxRefId);
  } else if (window.webkit) {
    // ios
    window.bridge.openPwPCallbackError = callbackError;
    window.webkit.messageHandlers.observer.postMessage({
      name: "openPwP",
      ppoaTnxRefId: ppoaTnxRefId,
    });
  }
};

export { openPwP };
