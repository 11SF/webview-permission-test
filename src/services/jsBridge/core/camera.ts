import useLocationStore from "../../../stores/location";

const triggerNativeGetCameraImage = (
  callback: (base64Image: string) => void,
  callbackError: (errorCode: string, errorDescription: string) => void
) => {
  useLocationStore.getState().setTest("triggerNativeGetCameraImage");
  if (window.JSBridge) {
    useLocationStore.getState().setTest("window.JSBridge");
    // android
    window.bridge.getCameraImageCallbackError = callbackError;
    window.bridge.getCameraImageCallback = callback;
    window.JSBridge.getCameraImage?.();
  } else if (window.webkit) {
    useLocationStore.getState().setTest("window.webkit");
    // ios
    window.bridge.getCameraImageCallbackError = callbackError;
    window.bridge.getCameraImageCallback = callback;
    window.webkit.messageHandlers.observer.postMessage({
      name: "getCameraImage",
    });
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
