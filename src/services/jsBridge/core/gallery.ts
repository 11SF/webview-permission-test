const triggerNativeGetGalleryImage = (
  callback: (base64Image: string) => void,
  callbackError: (errorCode: string, errorDescription: string) => void
) => {
  if (window.JSBridge) {
    // android
    window.bridge.getGalleryImageCallbackError = callbackError;
    window.bridge.getGalleryImageCallback = callback;
    window.JSBridge.getGalleryImage?.();
  } else if (window.webkit) {
    // ios
    window.bridge.getGalleryImageCallbackError = callbackError;
    window.bridge.getGalleryImageCallback = callback;
    window.webkit.messageHandlers.observer.postMessage({
      name: "getGalleryImage",
    });
  }
};

const triggerNativeSaveImageToGallery = (
  data: string,
  callback: (success: boolean) => void,
  callbackError: (errorCode: string, errorDescription: string) => void
) => {
  if (window.JSBridge) {
    // android
    window.bridge.saveImageToGalleryCallbackError = callbackError;
    window.bridge.saveImageToGalleryCallback = callback;
    window.JSBridge.saveImageToGallery?.(data);
  } else if (window.webkit) {
    // ios
    window.bridge.saveImageToGalleryCallbackError = callbackError;
    window.bridge.saveImageToGalleryCallback = callback;
    window.webkit.messageHandlers.observer.postMessage({
      name: "saveImageToGallery",
      base64Str: data,
    });
  }
};

export { triggerNativeGetGalleryImage, triggerNativeSaveImageToGallery };
