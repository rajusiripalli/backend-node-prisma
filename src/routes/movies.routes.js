import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Movies list" });
});

export default router;