import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getBaseUrl, proxyPostFormData } from "../../../lib/portal/apiProxy";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function readRawBody(req: NextApiRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
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
    const contentType = req.headers["content-type"] || "";
    const body = await readRawBody(req);
    const accessToken = token.idToken as string | undefined;
    const result = await proxyPostFormData("/quote", body, contentType, accessToken);
    if (result.status === 401) {
      return res.status(403).json({ message: "Session expired", code: "TOKEN_EXPIRED" });
    }
    return res.status(result.status).json(result.data);
  } catch (err) {
    console.error("POST /api/portal/quote proxy error:", err);
    return res.status(502).json({ message: "Failed to reach backend" });
  }
}
