import { Request, Response, Router } from "express";
import { query } from "./db";

const router = Router();

router.get("/api/characters", async (req: Request, res: Response) => {
  const characters = await query("SELECT * FROM Characters");
  res.status(200).json(characters);
});

router.get("/api/characters/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const character = await query(
    `SELECT * FROM Characters WHERE id = "${id}" LIMIT 1`,
    1
  );
  res.json(character);
});

export default router;
