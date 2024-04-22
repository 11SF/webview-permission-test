const triggerNativeGetLocation = (
  isContinuous: boolean,
  callback: (lat: number, long: number) => void,
  callbackError: (errorCode: string, errorDescription: string) => void
) => {
  if (window.JSBridge) {
    // Android
    window.bridge.getLocationCallbackError = callbackError;
    window.bridge.getLocationCallback = callback;
    window.JSBridge.getLocation?.(isContinuous);
  } else if (window.webkit) {
    // iOS
    window.bridge.getLocationCallbackError = callbackError;
    window.bridge.getLocationCallback = callback;
    window.webkit.messageHandlers.observer.postMessage({
      name: "getLocation",
      isContinuous: isContinuous,
    });
  }
};

const stopNativeLocationUpdates = (
  callback: (successMessage: string) => void,
  callbackError: (errorCode: string, errorDescription: string) => void
) => {
  if (window.JSBridge) {
    // Android
    window.bridge.stopLocationUpdatesCallback = callback;
    window.bridge.stopLocationUpdatesCallbackError = callbackError;
    window.JSBridge.stopLocationUpdates?.();
  } else if (window.webkit) {
    // iOS
    window.bridge.stopLocationUpdatesCallback = callback;
    window.bridge.stopLocationUpdatesCallbackError = callbackError;
    window.webkit.messageHandlers.observer.postMessage({
      name: "stopLocationUpdates",
    });
  }
};

export { triggerNativeGetLocation, stopNativeLocationUpdates };
