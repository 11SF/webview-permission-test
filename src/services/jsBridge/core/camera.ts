import useLocationStore from "../../../stores/location";

const triggerNativeGetCameraImage = (
  callback: (base64Image: string) => void,
  callbackError: (errorCode: string, errorDescription: string) => void
) => {
  useLocationStore.getState().setTest("triggerNativeGetCameraImage");

  if (window.bridge) {
    window.bridge.getCameraImageCallback = callback;
    window.bridge.getCameraImageCallbackError = callbackError;
  }

  if (window.JSBridge) {
    useLocationStore.getState().setTest("window.JSBridge");
    // android

    window.JSBridge.getCameraImage?.();
  } else if (window.webkit) {
    useLocationStore.getState().setTest("window.webkit");
    // ios
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
    window.webkit.messageHandlers.observer.postMessage({
      name: "getQrCode",
    });
  }
};

export { triggerNativeGetCameraImage, triggerNativeGetQrCode };
