import { type Request, type Response } from "express";
import { prisma } from "../lib/prisma";

const getCandidate = async (req: Request, res: Response) => {
  const userId = req.user.id;

  if (typeof userId !== "string") {
    return res.status(400).json({ error: "Invalid or missing User ID" });
  }

  try {
    const candidateProfile = await prisma.candidateProfile.findUnique({
      where: { id: userId },
      include: {
        projects: true,
        experience: true,
        education: true,
        skills: true,
        certifications: true,
        languages: true,
      },
    });

    return res
      .status(200)
      .json({ message: "Successfully queried candidate!", candidateProfile });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to query / create candidate" });
  }
};

const updateCandidate = async (req: Request, res: Response) => {
  console.log("Update candidate called", req.body);
  const userId = req.user.id;
  const {
    name,
    surname,
    email,
    phone,
    bio,
    expected_salary,
    wants_remote,
    wants_onsite,
    wants_hybrid,
    wants_part_time,
    wants_full_time,
    wants_employment_contract,
    wants_mandate_contract,
    wants_b2b_contract,
    role,
    socials,
    photo_url,
    projects,
    experience,
    education,
    skills,
    certifications,
    languages,
  } = req.body;

  // Empty or broken date strings become null. new Date("") is an Invalid Date and Prisma rejects the save.
  const toDateOrNull = (value: string | undefined) => {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return date;
  };

  //mapping what projects etc needs to own variables
  const projectsArray = (projects ?? []).map((project: any) => ({
    name: project.projectName,
    description: project.description,
    live_url: project.liveUrl,
    github_url: project.githubUrl,
    project_picture_url: project.projectPictureUrl,
    tags: project.tags ?? [],
  }));
  const experienceArray = (experience ?? []).map((experience: any) => ({
    company: experience.companyName,
    description: experience.description,
    position: experience.position,
    start_date: toDateOrNull(experience.startDate),
    end_date: toDateOrNull(experience.endDate),
  }));
  const educationArray = (education ?? []).map((education: any) => ({
    school: education.schoolName,
    degree: education.degree,
    field_of_study: education.fieldOfStudy,
    start_date: toDateOrNull(education.startDate),
    end_date: toDateOrNull(education.endDate),
  }));
  const skillsArray = (skills ?? []).map((skill: any) => ({
    name: skill.skillName,
  }));
  const certificationsArray = (certifications ?? []).map(
    (certification: any) => ({
      name: certification.certificationName,
      description: certification.description,
      start_date: toDateOrNull(certification.startDate),
      end_date: toDateOrNull(certification.endDate),
    }),
  );
  const languagesArray = (languages ?? []).map((language: any) => ({
    name: language.languageName,
    level: language.level,
  }));
  try {
    const updatedCandidate = await prisma.candidateProfile.upsert({
      where: { user_id: userId },
      update: {
        name,
        surname,
        email,
        phone,
        bio,
        expected_salary,
        wants_remote,
        wants_onsite,
        wants_hybrid,
        wants_part_time,
        wants_full_time,
        wants_employment_contract,
        wants_mandate_contract,
        wants_b2b_contract,
        role,
        socials,
        photo_url,
        projects: {
          deleteMany: {},
          create: projectsArray,
        },
        experience: {
          deleteMany: {},
          create: experienceArray,
        },
        education: {
          deleteMany: {},
          create: educationArray,
        },
        skills: {
          deleteMany: {},
          create: skillsArray,
        },
        certifications: {
          deleteMany: {},
          create: certificationsArray,
        },
        languages: {
          deleteMany: {},
          create: languagesArray,
        },
      },
      create: {
        id: userId,
        name,
        surname,
        email,
        phone,
        bio,
        expected_salary,
        wants_remote,
        wants_onsite,
        wants_hybrid,
        wants_part_time,
        wants_full_time,
        wants_employment_contract,
        wants_mandate_contract,
        wants_b2b_contract,
        role,
        socials,
        photo_url,
        projects: {
          create: projectsArray,
        },
        experience: {
          create: experienceArray,
        },
        education: {
          create: educationArray,
        },
        skills: {
          create: skillsArray,
        },
        certifications: {
          create: certificationsArray,
        },
        languages: {
          create: languagesArray,
        },
        user_id: userId,
      },
    });
    console.log("updatedCandidate", updatedCandidate);
    return res
      .status(200)
      .json({ message: "Successfully updated candidate!", updatedCandidate });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Failed to update candidate" });
    }
  }
};
export { getCandidate, updateCandidate };
