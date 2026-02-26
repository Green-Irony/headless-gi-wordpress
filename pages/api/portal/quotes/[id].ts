import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getBaseUrl, proxyGet } from "../../../../lib/portal/apiProxy";

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

  const { id } = req.query;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Missing quote ID" });
  }

  try {
    const accessToken = token.idToken as string | undefined;
    // API uses /quote/{id} (singular), not /quotes/{id}
    const result = await proxyGet(`/quote/${encodeURIComponent(id)}`, accessToken);
    if (result.status === 401) {
      return res.status(403).json({ message: "Session expired", code: "TOKEN_EXPIRED" });
    }
    return res.status(result.status).json(result.data);
  } catch (err) {
    console.error("GET /api/portal/quotes/[id] proxy error:", err);
    return res.status(502).json({ message: "Failed to reach backend" });
  }
}
