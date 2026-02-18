import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const token = await getToken({ req });
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // const { id } = req.query;
  // TODO: Forward to MuleSoft GET /api/v1/quote/{id} when backend is ready
  return res.status(501).json({ message: "Backend not connected" });
}
