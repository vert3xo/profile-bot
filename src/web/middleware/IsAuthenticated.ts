require("dotenv").config();
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ExpressMiddlewareInterface } from "routing-controllers";
import { Service } from "typedi";
import { ResponseType } from "../types/ResponseType";

@Service()
export class IsAuthenticated implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction): any {
    if (!process.env.JWT_SECRET) {
      return next();
    }

    if (
      !req.headers.authorization ||
      req.headers.authorization.split(" ")[0] !== "Bearer" ||
      !req.headers.authorization.split(" ")[1]
    ) {
      return res.json({
        success: false,
        message: "Missing or invalid authorization header",
      });
    }
    try {
      jwt.verify(
        req.headers.authorization.split(" ")[1],
        process.env.JWT_SECRET!
      );
    } catch (e) {
      return res.json({
        success: false,
        message: "Unuathorized",
      });
    }

    return next();
  }
}
