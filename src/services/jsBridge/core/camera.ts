const triggerNativeGetCameraImage = (
  callback: (base64Image: string) => void,
  callbackError: (errorCode: string, errorDescription: string) => void
) => {
  if (window.JSBridge) {
    // android
    window.bridge.getCameraImageCallbackError = callbackError;
    window.bridge.getCameraImageCallback = callback;
    window.JSBridge.getCameraImage?.();
  } else if (window.webkit) {
    // ios
    window.bridge.getCameraImageCallbackError = callbackError;
    window.bridge.getCameraImageCallback = callback;

    const message = { name: "getCameraImage" };
    window.webkit.messageHandlers.observer.postMessage(message);
  }
};

const triggerNativeGetQrCode = (
  callback: (qrData: string) => void,
  callbackError: (errorCode: string, errorDescription: string) => void
) => {
  if (window.JSBridge) {
    // android
    window.bridge.getQrCodeCallbackError = callbackError;
    window.bridge.getQrCodeCallback = callback;
    window.JSBridge.getQrCode?.();
  } else if (window.webkit) {
    // ios
    window.bridge.getQrCodeCallbackError = callbackError;
    window.bridge.getQrCodeCallback = callback;

    const message = { name: "getQrCode" };
    window.webkit.messageHandlers.observer.postMessage(message);
  }
};

export { triggerNativeGetCameraImage, triggerNativeGetQrCode };
