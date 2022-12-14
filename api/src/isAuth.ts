/*middleware*/
import { RequestHandler, Request } from "express";
import jwt from "jsonwebtoken";


/*types*/
export type ReqWithUserId = Request<{}, any, any, {}> & { userId: number };

export const isAuth: RequestHandler<{}, any, any, {}> = (req, _, next) => {
  const authHeader = req.headers.authorization;

  console.log(authHeader);
  if (!authHeader) {
    throw new Error("not authenticated");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new Error("not authenticated");
  }
  let userId: unknown = null;
  try {
    const payload: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    (req as any).userId = payload.userId;
    next();
    return;
  } catch {}

  throw new Error("not authenticated");
};
