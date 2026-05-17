export interface ProjectLike {
  name: string;
  stack: string[];
  company?: string;
}

export function matchesSearch(project: ProjectLike, query: string): boolean {
  if (!query) return true;
  return project.name.toLowerCase().includes(query.toLowerCase());
}

export function matchesStack(project: ProjectLike, selectedSlugs: string[]): boolean {
  if (!selectedSlugs.length) return true;
  return selectedSlugs.some(slug => project.stack.includes(slug));
}

export function matchesCompany(project: ProjectLike, selectedSlugs: string[]): boolean {
  if (!selectedSlugs.length) return true;
  return selectedSlugs.includes(project.company ?? '');
}
