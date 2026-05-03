export const getProjects = async () => {
  const projects = await import('./projects.json');
  return projects.default;
};