import { Request, Response, NextFunction } from "express";
export type TRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any> | any;
export const asyncHandler = (requestHanler: TRequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHanler(req, res, next)).catch((error) =>
      next(error)
    );
  };
};
