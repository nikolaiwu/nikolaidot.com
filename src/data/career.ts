// August 2009; months are zero-based.
export const careerStart = new Date(2009, 7);

/** Whole years since `careerStart`, counted at build time. */
export function yearsOfExperience(now = new Date()) {
  const years = now.getFullYear() - careerStart.getFullYear();
  return now.getMonth() < careerStart.getMonth() ? years - 1 : years;
}
