import { Request, Response } from "express";

export const home = (req: Request, res: Response) => {
  try {
    return res.status(200).send("Hello , welcome to the express-typescript");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Unknown error");
  }
};
