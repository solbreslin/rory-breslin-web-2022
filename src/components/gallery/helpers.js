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

export const mapLocationData = (data, filter) => {
  const locationData = data
    .filter(d => d.frontmatter.location)
    .map(d => {
      let locationObject = JSON.parse(d.frontmatter.location);

      return {
        category: d.frontmatter.category,
        title: d.frontmatter.title,
        coords: locationObject.coordinates.reverse(),
        image: d.frontmatter.images[0],
      };
    })
    .filter(d => {
      return d.category === filter || filter === "all" || !filter;
    });

  return locationData;
};

export const titleCase = str =>
  str.replace(/(^\w|\s\w)/g, m => m.toUpperCase());

export const addToStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {}
};
