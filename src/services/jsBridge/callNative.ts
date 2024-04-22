export const callNative = (eventName:string) => {
  if (window.JSBridge) {
    // android
    window.JSBridge[eventName]?.();
  } else if (window.webkit) {
    // ios
    const message = { name: "getCameraImage" };
    window.webkit.messageHandlers.observer.postMessage(message);
  }
};
