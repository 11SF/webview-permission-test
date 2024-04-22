/* eslint-disable @typescript-eslint/no-explicit-any */
interface Window {
  JSBridge: any;
  webkit: any;
  bridge: any;
}

window.bridge = {
  getLocationCallbackError: null,
  getLocationCallback: null,
  stopLocationUpdatesCallback: null,
  stopLocationUpdatesCallbackError: null,
  getGalleryImageCallbackError: null,
  getGalleryImageCallback: null,
  saveImageToGalleryCallbackError: null,
  saveImageToGalleryCallback: null,
  getCameraImageCallback: null,
  getCameraImageCallbackError: null,
  getGalleryImageCallback: null,
  getGalleryImageCallbackError: null,
  getQrCodeCallbackError: null,
  getQrCodeCallback: null,
  openPwPCallbackError: null,
  initAuthCallback: null,
  initAuthCallbackError: null
};