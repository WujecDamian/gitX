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
  try {
    const updatedCandidate = await prisma.candidateProfile.upsert({
      where: { id: userId },
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
          create: projects,
        },
        experience: {
          deleteMany: {},
          create: experience,
        },
        education: {
          deleteMany: {},
          create: education,
        },
        skills: {
          deleteMany: {},
          create: skills,
        },
        certifications: {
          deleteMany: {},
          create: certifications,
        },
        languages: {
          deleteMany: {},
          create: languages,
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
          create: projects,
        },
        experience: {
          create: experience,
        },
        education: {
          create: education,
        },
        skills: {
          create: skills,
        },
        certifications: {
          create: certifications,
        },
        languages: {
          create: languages,
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
