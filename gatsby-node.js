const path = require("path");

const formatPath = str => {
  // Converting `title` property in project markdown file
  // e.g. 'Samuel Beckett' -> samuel-beckett
  const path = str.replace(/\s+/g, "-").toLowerCase();
  return path;
};

const sortAlphabetically = data => {
  return data.sort((a, b) => a.path.localeCompare(b.path));
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(
    `
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              id
              frontmatter {
                title
                category
              }
            }
          }
        }
      }
    `
  );

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const projectPageTemplate = path.resolve(`src/templates/project-page.js`);

  // Map the data needed to generate the pages
  // Could pass all the data to the context but gatsby recommends not doing that
  // Instead just pass minimum info needed for page and next path and do a query in the project page template
  let paths = result.data.allMarkdownRemark.edges.map(edge => {
    return {
      id: edge.node.id,
      path: formatPath(edge.node.frontmatter.title),
      category: edge.node.frontmatter.category,
    };
  });

  paths = sortAlphabetically(paths);

  paths.forEach((path, index) => {
    if (paths[index + 1]) {
      path.nextPath = paths[index + 1].path;
    }

    // Find the next path that matches the current category
    // If user has selected a category, then the 'next' project link will get the next project for that category.
    for (let i = index + 1; i < paths.length; i++) {
      const next = paths[i];

      if (next) {
        if (next.category === path.category) {
          path.nextPathInCategory = next.path;
          break;
        }
      }
    }
  });

  paths.forEach(p => {
    const { id, path, nextPath, nextPathInCategory } = p;

    createPage({
      path: "work/" + path,
      component: projectPageTemplate,
      context: {
        id,
        nextPath,
        nextPathInCategory,
      },
    });
  });
};
