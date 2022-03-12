export const calculateMapHeight = mapContainer => {
  const galleryContainer = document.querySelector("#js-gallery-container");
  const footer = document.querySelector("#js-footer");

  const top = mapContainer.offsetTop;
  let galleryPaddingBottom = 18; //fallback
  let footerHeight = 48; //fallback

  if (galleryContainer) {
    galleryPaddingBottom =
      window.getComputedStyle(galleryContainer).paddingBottom;
    galleryPaddingBottom = parseInt(galleryPaddingBottom, 10);
  }

  if (footer) {
    footerHeight = footer.offsetHeight;
  }

  return window.innerHeight - top - galleryPaddingBottom - footerHeight;
};
