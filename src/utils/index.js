const CLOUDINARY_PLACEHOLDER_QUERY = "w_10,q_auto,f_auto";

export const isBrowser = () => typeof window !== "undefined";

export const buildCloudinaryPath = (path, query) => {
  const parts = path.split("upload/");

  return `${parts[0]}upload/${query}/${parts[1]}`;
};

export const getPath = (path, query) => {
  return buildCloudinaryPath(path, query);
};

export const getPlaceholderPath = path => {
  return buildCloudinaryPath(path, CLOUDINARY_PLACEHOLDER_QUERY);
};
