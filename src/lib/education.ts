import { site } from "@/lib/site";

type EducationEntry = (typeof site.education)[number];

function requireEducation(index: number): EducationEntry {
  const entry = site.education[index];
  if (!entry) {
    throw new Error(`Missing site.education[${index}] source entry`);
  }
  return entry;
}

function institutionShortName(entry: EducationEntry): string {
  return entry.institution === "University of the People"
    ? "UoPeople"
    : entry.institution;
}

function studyLabel(entry: EducationEntry): string {
  return entry.degree
    .replace("Computer Science", "CS")
    .replace(" (in progress)", "");
}

export const currentEducation = requireEducation(0);
export const priorEducation = requireEducation(1);

export const educationNarrative = {
  currentStudyLabel: `${studyLabel(currentEducation)} · ${institutionShortName(
    currentEducation,
  )}`,
  path: `${priorEducation.institution} (${priorEducation.range}) to self-taught web practice from ${site.yearStarted} to ${currentEducation.degree} at ${currentEducation.institution}.`,
  about: `${site.name} (also known as Delowar) is a self-taught creative developer, UI/UX designer, and aspiring software engineer based in ${site.base}. His education path runs from ${priorEducation.institution} (${priorEducation.range}) through independent web practice from ${site.yearStarted}, and now ${currentEducation.degree} at ${currentEducation.institution} (online). He works independently under the studio name ${site.studio}.`,
  aboutEducation:
    "Formal Computer Science studies now sit on top of independent web practice and a Political Science background - systems, people, communication, and software treated as one connected field.",
  resume: `Education path: ${priorEducation.institution} (${priorEducation.range}), self-taught web practice from ${site.yearStarted}, then ${currentEducation.degree} at ${currentEducation.institution} while keeping the systems-thinking background visible.`,
  aiBackground: `Self-taught creative developer and aspiring software engineer. Education path: ${priorEducation.institution} (${priorEducation.range}), active web practice since ${site.yearStarted}, and ${currentEducation.degree} at ${currentEducation.institution} (online). Works under the studio "${site.studio}".`,
  manifesto: `self-taught creative developer from ${site.location}, with a path from ${priorEducation.institution} into independent web practice and current ${currentEducation.degree} at ${currentEducation.institution}`,
};

