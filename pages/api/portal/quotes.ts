import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getBaseUrl, proxyGet } from "../../../lib/portal/apiProxy";

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

  const baseUrl = getBaseUrl();
  if (!baseUrl) {
    return res.status(501).json({ message: "Backend not connected" });
  }

  try {
    const accessToken = token.idToken as string | undefined;
    const result = await proxyGet("/quotes", accessToken);
    return res.status(result.status).json(result.data);
  } catch (err) {
    console.error("GET /api/portal/quotes proxy error:", err);
    return res.status(502).json({ message: "Failed to reach backend" });
  }
}
