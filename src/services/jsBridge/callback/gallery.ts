export const useSaveImageToGalleryCallback = (success: boolean) => {
  if (success) {
    alert("Save image to gallery success");
  } else {
    alert("Save image to gallery failed");
  }
};
