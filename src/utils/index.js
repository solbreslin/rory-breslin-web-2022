const CLOUDINARY_PLACEHOLDER_QUERY = "w_10,q_auto,f_auto";

export const isBrowser = () => typeof window !== "undefined";

const buildCloudinaryQuery = (path, query) => {
  const parts = path.split("upload/");

  return `${parts[0]}upload/${query}/${parts[1]}`;
};

export const getPath = (path, query) => {
  return buildCloudinaryQuery(path, query);
};

export const getPlaceholderPath = path => {
  return buildCloudinaryQuery(path, CLOUDINARY_PLACEHOLDER_QUERY);
};
