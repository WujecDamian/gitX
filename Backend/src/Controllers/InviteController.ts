import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import passport from "passport";
import "../Authentication/passport-config";
import { prisma } from "../lib/prisma";
import { type User } from "../generated/prisma/client";

//deleting / creating Post

const sendInvite = async (req: Request, res: Response) => {
  const { inviteeId, groupId } = req.body;
  const userId = req.user.id;

  if (typeof inviteeId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Invitee ID" });
  }

  try {
    await prisma.groupInvite.create({
      data: {
        invitedById: userId,
        inviteeId,
        groupId,
      },
    });

    return res.status(201).json({ message: "Successfully invited user!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to invited user" });
  }
};

const cancelInvite = async (req: Request, res: Response) => {
  const { invitationId } = req.body;

  if (typeof invitationId !== "string") {
    return res.status(400).json({ error: "Invalid or missing Invitee ID" });
  }

  try {
    await prisma.groupInvite.delete({
      where: {
        id: invitationId,
      },
    });

    return res
      .status(201)
      .json({ message: "Successfully cancelled invitation!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to cancel invitation" });
  }
};

//Post get functions
const getReceivedInvites = async (req: Request, res: Response) => {
  const userId = req.user.id;

  try {
    const invitations = await prisma.groupInvite.findMany({
      where: {
        inviteeId: userId,
      },
    });

    return res.status(200).json({ invitations });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch invitations" });
  }
};
const getSentInvites = async (req: Request, res: Response) => {
  const userId = req.user.id;

  try {
    const invitations = await prisma.groupInvite.findMany({
      where: {
        invitedById: userId,
      },
    });

    return res.status(200).json({ invitations });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch invitations" });
  }
};

export { sendInvite, cancelInvite, getReceivedInvites, getSentInvites };
