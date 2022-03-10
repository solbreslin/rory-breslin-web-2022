export const filterDraftProjects = data => {
  return data.filter(item => !item.frontmatter.draft);
};

export const sortAlphabetically = data => {
  return data.sort((a, b) =>
    a.frontmatter.title.localeCompare(b.frontmatter.title)
  );
};

const formatPath = str => {
  // Converting `title` property in project markdown file
  // e.g. 'Samuel Beckett' -> samuel-beckett
  const path = str.replace(/\s+/g, "-").toLowerCase();
  return path;
};

export const addPaths = data => {
  return data.map(d => {
    return {
      ...d,
      path: formatPath(d.frontmatter.title),
    };
  });
};

export const mapLocationData = (data, buildCloudinaryPath = () => {}) => {
  const CLOUDINARY_QUERY = "c_fill,g_face,w_280,h_160,q_80,f_auto";

  return data
    .filter(d => d.frontmatter.location)
    .map(d => {
      const { location, category, title, images } = d.frontmatter;
      const locationObject = JSON.parse(location);

      return {
        category: category,
        title: title,
        coords: locationObject.coordinates.reverse(),
        image: buildCloudinaryPath(images[0], CLOUDINARY_QUERY),
        path: formatPath(title),
      };
    });
};

export const titleCase = str =>
  str.replace(/(^\w|\s\w)/g, m => m.toUpperCase());

export const addToStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {}
};
