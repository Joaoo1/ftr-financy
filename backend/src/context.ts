import { type Request } from "express";
import jwt from "jsonwebtoken";

export interface AppContext {
  userId: string | null;
}

export function buildContext({ req }: { req: Request }): AppContext {
  const auth = req.headers.authorization ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

  if (!token) return { userId: null };

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    return { userId: payload.userId };
  } catch {
    return { userId: null };
  }
}
