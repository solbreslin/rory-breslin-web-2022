const CLOUDINARY_BASE_URL =
  "https://res.cloudinary.com/r-breslin/image/upload/";
const CLOUDINARY_OPTIONS = "q_100,f_auto";

export const buildImageURL = (url, options) => {
  if (!url) return;

  return (
    CLOUDINARY_BASE_URL +
    (options || CLOUDINARY_OPTIONS) +
    "/r-breslin-cloudinary" +
    url.split("r-breslin-cloudinary")[1]
  );
};

export const buildSlug = (slug) => {
  return slug.includes("/projects") ? slug.split("/projects")[1] : slug;
};

export const buildMapData = (data) => {
  if (!Array.isArray(data)) {
    return {
      location: data.location,
    };
  }

  return data
    .filter((d) => d.node.frontmatter.location)
    .map((d) => {
      const {
        fields: { slug },
        frontmatter: { title, images, location },
      } = d.node;

      return {
        slug: buildSlug(slug),
        title,
        image: images.length ? images[0] : null,
        location,
      };
    });
};

export const Size = {
  MOBILE_L: 480,
  TABLET: 768,
};

export const Breakpoint = Object.keys(Size).reduce((acc, cur) => {
  acc[cur] = `(min-width: ${Size[cur]}px)`;
  return acc;
}, {});

export const isBrowser = () => typeof window !== "undefined";
